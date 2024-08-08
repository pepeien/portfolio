import React from 'react';
import Link from 'next/link';
import { v4 } from 'uuid';

// Types
import { Dictionary } from '@utils/interfaces';

export interface Props {
    dictionary: Dictionary;
}

enum ESector {
    PROJECTS,
    JOBS,
    BLOG,
    CONTACT,
}

interface Sector {
    id: string;
    type: ESector;
}

export default function Component({ dictionary }: Props) {
    const sectors: Sector[] = [
        {
            id: 'PROJECTS_TITLE',
            type: ESector.PROJECTS,
        },
        {
            id: 'JOB_HISTORY_TITLE',
            type: ESector.JOBS,
        },
        {
            id: 'BLOG_TITLE',
            type: ESector.BLOG,
        },
        {
            id: 'CONTACT_TITLE',
            type: ESector.CONTACT,
        },
    ];

    return (
        <ul className='menu --flex-column'>
            {sectors.map((sector) => (
                <li key={v4()}>
                    <Link href={`/#${sector.id}`} className='--flex-row'>
                        <span className='--bg-color-ease-in'>{dictionary[sector.id]}</span>
                        <div />
                    </Link>
                </li>
            ))}
        </ul>
    );
}
