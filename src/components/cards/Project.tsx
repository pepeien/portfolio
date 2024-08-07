'use client';

import React, { useEffect, useState } from 'react';

// Types
import { Dictionary, Project, ProjectIdentity, Tag } from '@utils/interfaces';

// Components
import { TagListing } from '@components';

export interface Props extends Project {
    dictionary: Dictionary;
}

export default function Component({
    name,
    repo,
    link,
    technologies,
    description,
    dictionary,
}: Props) {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [identity, setIdentity] = useState<ProjectIdentity>();

    useEffect(() => {
        fetch(`${repo}/master/.github/metadata.json?raw=true`)
            .then((_res) => _res.json())
            .then((_result) => setIdentity(_result))
            .catch(() => {});
    }, [repo]);

    if (!identity) {
        return <></>;
    }

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
