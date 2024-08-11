import React from 'react';
import { v4 } from 'uuid';

// Types
import { Tag } from '@utils/interfaces';

export interface Props {
    data: Tag[];
    className?: string;
}

export default function Component({ data, className = '' }: Props) {
    return (
        <ul className={`tags --flex-row ${className ?? ''}`}>
            {data.map(({ icon, accentColor, backgroundColor, text }) => (
                <li
                    key={v4()}
                    className='--flex-row --bg-color-ease-in'
                    style={{ color: accentColor, backgroundColor: backgroundColor }}
                >
                    {icon}
                    <span className='--color-ease-in'>{text}</span>
                </li>
            ))}
        </ul>
    );
}
