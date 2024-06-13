import React from "react";

// type NoN<T> = T extends null | undefined ? never : T;
//
// export type ReactFCWithChildren = FC<PropsWithChildren<NoN<unknown>>>;


export interface DataItem {
    id: React.Key;
    header: string;
    options: string[];
    text: string;
}