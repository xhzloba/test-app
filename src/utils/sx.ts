import {
    Aliases,
    MediaAliases,
    StyleWithAliases,
    TValue,
    StyleObject
} from "./types.ts";
import { aliases, mediaAliases } from "./aliases.ts";

// Написал мини утилитку. Конечно же она не совсем продумана просто как демонстрация примера
// Давно писал что-то подобное, но никак не доходили руки. Хотелось реализовать что-то подобное с styled-components
// Не успел типизировать нормально. Решение быстрое.

class Sx {
    private cache = new Map<string, string>();
    // Здесь я преобразую к примеру backgroundColor --->  в background-color;
    private camelToKebab(str: string): string {
        return str.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
    }
    // тут соотвествпенно форматирую значение css-свойства.
    // Если значение - число, то преобразую в пиксели.
    private formatValue(value: TValue): string {
        return typeof value === 'number' ? `${value}px` : String(value);
    }
    // тут преобразую алиасы в стили
    private resolveAlias(key: keyof Aliases, value: TValue): string {
        const cssProperty = aliases[key];
        if (Array.isArray(cssProperty)) {
            return cssProperty.map(prop => `${prop}: ${this.formatValue(value)};`).join(' ');
        }
        return `${cssProperty}: ${this.formatValue(value)}; `;
    }

    // тут преобразую алиасы в стили с медиазапросами
    private resolveMediaQuery<Props>(key: keyof MediaAliases, nestedStyles: StyleWithAliases, props: Props): string {
        const mediaQuery = mediaAliases[key];
        const nestedCss = this.resolveAliases(nestedStyles, props);
        return `${mediaQuery} { ${nestedCss} } `;
    }
    private resolvePseudoClass<Props>(pseudoClass: string, nestedStyles: StyleWithAliases, props: Props): string {
        const nestedCss = this.resolveAliases(nestedStyles, props);
        return `&${pseudoClass} { ${nestedCss} } `;
    }
    private resolveStandardStyle(key: string, value: TValue): string {
        const cssProperty = this.camelToKebab(key);
        return `${cssProperty}: ${this.formatValue(value)}; `;
    }
    private createResolvers<Props>(props: Props) {
        return {
            ...Object.keys(aliases).reduce((acc, key) => {
                acc[key] = (key, value) => this.resolveAlias(key as keyof Aliases, value);
                return acc;
            }, {} as { [key: string]: (key: string, value: TValue) => string }),
            ...Object.keys(mediaAliases).reduce((acc, key) => {
                acc[key] = (key, value) => this.resolveMediaQuery(key as keyof MediaAliases, value, props);
                return acc;
            }, {} as { [key: string]: (key: string, value: StyleWithAliases) => string }),
        };
    }

    // Обрабатываю псевдоклассы в стилях.
    private handlePseudoClasses<Props>(styles: StyleWithAliases, props: Props): string {
        return Object.entries(styles)
            .filter(([key, value]) => key.startsWith(':') && typeof value === 'object' && value !== null && !Array.isArray(value))
            .map(([key, value]) => this.resolvePseudoClass(key, value as StyleWithAliases, props))
            .join('');
    }
    private handleStandardStyles(styles: StyleWithAliases, resolvers: { [key: string]: (key: string, value: any) => string }): string {
        // TODO: make type change
        let cssString = '';
        for (const key in styles) {
            if (Object.prototype.hasOwnProperty.call(styles, key)) {
                const value = styles[key as keyof typeof styles];
                if (!(typeof value === 'object' && !Array.isArray(value) && value !== null && key.startsWith(':'))) {
                    const resolver = resolvers[key] || ((key, value) => this.resolveStandardStyle(key, value));
                    cssString += resolver(key, value);
                }
            }
        }
        return cssString;
    }
    private resolveAliases<Props>(styles: StyleWithAliases, props: Props): string {
        const resolvers = this.createResolvers(props);
        const cssString = this.handleStandardStyles(styles, resolvers);
        const pseudoClassesString = this.handlePseudoClasses(styles, props);
        return cssString + pseudoClassesString;
    }
    private createStyleTag(css: string): HTMLStyleElement {
        const style = document.createElement('style');
        style.type = 'text/css';
        style.appendChild(document.createTextNode(css));
        return style;
    }
    private applyStyles<Props>(className: string, styles: StyleWithAliases, props: Props): void {
        const cssString = `.${className} { ${this.resolveAliases(styles, props)} }`;
        const styleTag = this.createStyleTag(cssString);
        document.head.appendChild(styleTag);
    }

	// тут я генерирую уникальный класс для стилей с использованием криптографического генератора
    // насчет производительности - просядет. Если использовать в крупных проектах просто демонстрация.
    private generateUniqueClassName(variableName?: string): string {
        const array = new Uint32Array(1);
        crypto.getRandomValues(array);
        return `${variableName || 'sx'}-${array[0].toString(36)}`;
    }

    // соотвественно тут создается мемоизированная функция для генерации стилей.
    // итог: возвращает объект с именем класса.
    public createMemoizedSx() {
        return <Props = NonNullable<unknown>>(styles: StyleObject<Props>, props: Props = {} as Props, variableName?: string): { className: string } => {
            const resolvedStyles = typeof styles === 'function' ? styles(props) : styles;
            const cssString = this.resolveAliases(resolvedStyles, props);
            const key = JSON.stringify({ styles: cssString, props });

            if (this.cache.has(key)) {
                return { className: this.cache.get(key) as string };
            }

            const className = this.generateUniqueClassName(variableName);
            this.applyStyles(className, resolvedStyles, props);
            this.cache.set(key, className);

            if (this.cache.size > 1000) {
                this.cache.clear();
            }

            return { className };
        };
    }
}
const sx = new Sx().createMemoizedSx();

export { sx };