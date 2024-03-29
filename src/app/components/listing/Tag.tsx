import React from 'react';
import { v4 } from 'uuid';

// Types
import { Tag } from '@utils/interfaces';

export interface Props {
    data: Tag[];
}
export default async function Component({ data }: Props) {
    return (
        <ul className='tags --flex-row'>
            {data.map(({ icon, accentColor, backgroundColor, text }) => (
                <li
                    key={v4()}
                    className='--flex-row'
                    style={{ color: accentColor, backgroundColor: backgroundColor }}
                >
                    {icon}
                    <span>{text}</span>
                </li>
            ))}
        </ul>
    );
}
