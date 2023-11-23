import React from 'react';
import { v4 } from 'uuid';

// Types
import { Dictionary, Project, ProjectDictionary } from '@utils/interfaces';

// Services
import { InternalServices } from '@utils/services';

// Components
import { ProjectCard } from '@components';

export interface Props {
    dictionary: Dictionary;
    personalDictionary: { [key: string]: ProjectDictionary };
}

const MAX_SHOWCASE_COUNT = 4;

export default async function Component({ dictionary, personalDictionary }: Props) {
    const data = await fetch(`${InternalServices.getBLOB()}/projects/metadata.json`, {
        next: { revalidate: InternalServices.getFetchInterval() },
    })
        .then((_res) => _res.json())
        .then((_projects: Project[]) => _projects.slice(0, MAX_SHOWCASE_COUNT))
        .catch(() => [] as Project[]);

    return (
        <ul className='projects'>
            {data.map((_item) => (
                <li key={v4()}>
                    <ProjectCard {..._item} personalDictionary={personalDictionary[_item.repo]} />
                </li>
            ))}
        </ul>
    );
}
