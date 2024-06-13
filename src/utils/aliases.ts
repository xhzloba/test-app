/**
 * Алиасы для CSS свойств.
 */
export const aliases = {
    /** Сокращение для `margin-left` и `margin-right`. */
    mx: ['margin-left', 'margin-right'],
    /** Сокращение для `margin-bottom`. */
    mb: 'margin-bottom',
    /** Сокращение для `margin-top`. */
    mt: 'margin-top',
    /** Сокращение для `margin-right`. **/
    mr: 'margin-right',
    /** Сокращение для `margin-left`. */
    ml: 'margin-left',
    /** Сокращение для `padding-top`. */
    pt: 'padding-top',
    /** Сокращение для `padding-bottom`. */
    pb: 'padding-bottom',
    /** Сокращение для `padding-right`. */
    pr: 'padding-right',
    /** Сокращение для `padding-left`. */
    pl: 'padding-left',
    /** Сокращение для `background-color`. */
    bg: 'background-color',
    /** Сокращение для `margin`. */
    m: 'margin',
    /** Сокращение для `padding`. */
    p: 'padding',
    /** Сокращение для `width`. */
    w: 'width',
    /** Сокращение для `height`. */
    h: 'height',
    /** Сокращение для `font-size`. */
    fs: 'font-size',
    /** Сокращение для `line-height`. */
    lh: 'line-height',
    /** Сокращение для `color`. */
    c: 'color',
    /** Сокращение для `display`. */
    d: 'display',
    /** Сокращение для `justify-content`. */
    jc: 'justify-content',
    /** Сокращение для `align-items`. */
    ai: 'align-items',
    /** Сокращение для `flex-direction`. */
    fd: 'flex-direction',
    /** Сокращение для `flex-wrap`. */
    fw: 'flex-wrap',
    /** Сокращение для `grid-template-columns`. */
    gtc: 'grid-template-columns',
} as const;

/**
 * Алиасы для медиазапросов.
 */
export const mediaAliases = {
    /** Медиазапрос для экранов с максимальной шириной 600px. */
    sm: '@media (max-width: 600px)',
    /** Медиазапрос для экранов с шириной от 601px до 960px. */
    md: '@media (min-width: 601px) and (max-width: 960px)',
    /** Медиазапрос для экранов с минимальной шириной 961px. */
    lg: '@media (min-width: 961px)',
    /** Медиазапрос для экранов с минимальной шириной 1201px. */
    xl: '@media (min-width: 1201px)',
    /** Медиазапрос для экранов с минимальной шириной 1601px. */
    xxl: '@media (min-width: 1601px)',
} as const;