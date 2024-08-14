import React from 'react';
import { v4 } from 'uuid';

// Types
import { Dictionary, Blog } from '@utils/interfaces';

// Services
import { BlogServices, InternalServices } from '@utils/services';

// Components
import { BlogCard } from '@components';

export interface Props {
    dictionary: Dictionary;
}

const MAX_SHOWCASE_COUNT = 4;

export default async function Component({ dictionary }: Props) {
    const data = await fetch(`${InternalServices.getBLOB()}/blog/metadata.json`, {
        next: { revalidate: InternalServices.getFetchInterval() },
    })
        .then((_res) => _res.json())
        .then((_blog: Blog[]) => _blog.slice(0, MAX_SHOWCASE_COUNT))
        .catch(() => [] as Blog[]);

    const latestPost = BlogServices.getLatestPost(data);

    return (
        <ul className='blogs'>
            {data.map((_item) => (
                <li key={v4()}>
                    <BlogCard {..._item} dictionary={dictionary} />
                </li>
            ))}
        </ul>
    );
}
