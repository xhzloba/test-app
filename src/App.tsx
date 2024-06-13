import React from "react";
import {CardList} from "./components/CardList.tsx";
import {wrapper} from "./App.style.ts";
import {CardItem} from "./components/CardItem.tsx";
import { DataItem } from "./types.ts";
import { useFetch } from "./hooks/useFetch.ts";
import {DataService} from "./service/service.ts";

export const Wrapper = ({children}: React.PropsWithChildren<NonNullable<unknown>>) => <div>{children}</div>

const App: React.FC = () => {
    const {data} = useFetch<DataItem[]>(DataService.fetchData);


    return (
        <Wrapper {...wrapper}>
            <CardList items={data ?? []}>
                {({ items }) => (
                    <>
                        {items.map(item => (
                            <CardItem key={item.id} {...item} />
                        ))}
                    </>
                )}

            </CardList>
        </Wrapper>
    );
}

export {App};