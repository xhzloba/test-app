import React from 'react';
import { aliases, mediaAliases } from "./aliases.ts";

export type TValue = string | number | boolean;

export type Aliases = typeof aliases;
export type MediaAliases = typeof mediaAliases;

export type AliasStyles = {
    [K in keyof Aliases]?: string | number | boolean;
};

export type MediaQueryStyles = {
    [K in keyof MediaAliases]?: StyleWithAliases;
};

export type StyleWithAliases = AliasStyles & MediaQueryStyles & React.CSSProperties & {
    [pseudoClass: string]: StyleWithAliases | TValue;
};

export type StyleObject<Props = {}> = StyleWithAliases | ((props: Props) => StyleWithAliases);