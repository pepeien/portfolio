import React from 'react';
import { v4 } from 'uuid';

// Types
import { Dictionary, Project } from '@utils/interfaces';

// Services
import { InternalServices } from '@utils/services';

// Components
import { ProjectCard } from '@components';

export interface Props {
    dictionary: Dictionary;
    maxListing?: number;
}

export default async function Component({ dictionary, maxListing }: Props) {
    const data = await fetch(`${InternalServices.getBLOB()}/projects/metadata.json`, {
        next: { revalidate: InternalServices.getFetchInterval() },
    })
        .then((_res) => _res.json())
        .then((_projects: Project[]) => (maxListing ? _projects.slice(0, maxListing) : _projects))
        .catch(() => [] as Project[]);

    return (
        <ul className='projects'>
            {data.map((_item) => (
                <li key={v4()}>
                    <ProjectCard {..._item} dictionary={dictionary} />
                </li>
            ))}
        </ul>
    );
}
