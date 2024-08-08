import React from 'react';
import Link from 'next/link';

// Types
import { Dictionary, Project } from '@utils/interfaces';

export interface Props extends Project {
    dictionary: Dictionary;
}

export default function Component({ name, link, description, dictionary }: Props) {
    return (
        <Link
            className='project-card --flex-column --hidden-overflow-all --color-ease-in'
            href={link}
            target='_blank'
            rel='noreferrer'
        >
            <h4 className='project-card__title'>{name}</h4>
            <span className='project-card__description'>
                {description[dictionary['LANGUAGE_LOCALE_URL']]}
            </span>
            <div className='--skewd-background' />
        </Link>
    );
}
