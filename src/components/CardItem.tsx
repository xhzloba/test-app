import {sx} from "../utils/sx.ts";
import {DataItem} from "../types.ts";
import React from "react";
import {Wrapper} from "../App.tsx";

interface OptionsListProps {
    options: string[];
    renderOption: (option: string) => React.ReactNode;
}

export const CardItem = ({header, options, text}: DataItem) => {
    return (
        //  Написал небольшую утилитку функцию
        // на скорую руку.
        <Wrapper {...sx({
            display: 'grid',
            'align-content': 'start',
            gap: 10,
        }, '', 'card')}
        >
            <h2>{header}</h2>
            <OptionsList
                options={options}
                renderOption={(option) => option}
            />
            <p>{text}</p>
        </Wrapper>
    );
};

// Делаю все в одном компоненте, но, конечно же, лучшей практикой является
// выносить отдельно

// Если OptionList к примеру рендерил много элементов можно было бы
// обернуть в React.memo
const OptionsList: React.FC<OptionsListProps> = ({ options, renderOption }) => {
    return (
        <ul>
            {options.map((option, idx) => (
                // использовать индекс плохая практика.
                // в случае изменения списка опций, индекс будет некорректным
                // но примерчик простой поэтому закинул idx
                <li key={idx}>{renderOption(option)}</li>
            ))}
        </ul>
    );
};

