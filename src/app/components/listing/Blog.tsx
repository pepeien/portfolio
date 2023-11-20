import React from 'react';
import { v4 } from 'uuid';

// Types
import { Dictionary, Blog, BlogDictionary } from '@utils/interfaces';

// Services
import { InternalServices } from '@utils/services';

// Components
import { BlogCard } from '@components';

export interface Props {
    dictionary: Dictionary;
    personalDictionary: { [key: string]: BlogDictionary };
}

const MAX_SHOWCASE_COUNT = 3;

export default async function Component({ dictionary, personalDictionary }: Props) {
    const data = await fetch(`${InternalServices.getBLOB()}/blog/metadata.json`, {
        next: { revalidate: InternalServices.getFetchInterval() },
    })
        .then((_res) => _res.json())
        .then((_blog: Blog[]) => _blog.slice(0, MAX_SHOWCASE_COUNT))
        .catch(() => [] as Blog[]);

    return (
        <ul>
            {data.map((_item) => (
                <li key={v4()}>
                    <BlogCard
                        {..._item}
                        dictionary={dictionary}
                        personalDictionary={personalDictionary[_item.id]}
                    />
                </li>
            ))}
        </ul>
    );
}
