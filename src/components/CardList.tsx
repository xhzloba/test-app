import React from "react";
import { sx } from "../utils/sx.ts";
import {DataItem} from "../types.ts";

interface IPropsChildren {
	children: (props: { items: DataItem[] }) => React.ReactNode;
	items: DataItem[];
}

const gridTemplate = {
	gtc: 'repeat(auto-fill, minmax(160px, 1fr))'
};

const cardListStyles = sx({
	display: 'grid',
	gtc: gridTemplate['gtc'],
	gap: 24
});

export const CardList: React.FC< IPropsChildren> = ({ children, items }) => {
	return (
		<div {...cardListStyles}>
			{children({ items })}
		</div>
	);
};