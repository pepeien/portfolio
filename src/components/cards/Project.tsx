'use client';

import React, { useEffect, useState } from 'react';

// Types
import { Dictionary, Project, ProjectIdentity } from '@utils/interfaces';

export interface Props extends Project {
    dictionary: Dictionary;
}

export default function Component({ name, link, description, dictionary }: Props) {
    return (
        <div className='project-card --flex-column'>
            <a
                className='project-card__header --flex-column'
                href={link}
                target='_blank'
                rel='noreferrer'
            >
                <h5>{name}</h5>
                <span>{description[dictionary['LANGUAGE_LOCALE_URL']]}</span>
            </a>
            <div />
        </div>
    );
}
