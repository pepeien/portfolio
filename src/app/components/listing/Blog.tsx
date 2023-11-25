import React from 'react';
import { v4 } from 'uuid';

// Types
import { Dictionary, Blog } from '@utils/interfaces';

// Services
import { InternalServices } from '@utils/services';

// Components
import { BlogCard } from '@components';

export interface Props {
    dictionary: Dictionary;
}

const MAX_SHOWCASE_COUNT = 3;

export default async function Component({ dictionary }: Props) {
    const data = await fetch(`${InternalServices.getBLOB()}/blog/metadata.json`, {
        next: { revalidate: InternalServices.getFetchInterval() },
    })
        .then((_res) => _res.json())
        .then((_blog: Blog[]) => _blog.slice(0, MAX_SHOWCASE_COUNT))
        .catch(() => [] as Blog[]);

    const getLatestPost = (blog: Blog[]): Blog => {
        return blog
            .sort((a, b) => {
                if (!a.date || !b.date) {
                    return -1;
                }

                return new Date(a.date).getTime() > new Date(b.date).getTime() ? 1 : 0;
            })
            .filter((post) => post.status === 'UPCOMING')[0];
    };

    const latestPost = getLatestPost(data);

    return (
        <div className='blogs'>
            <BlogCard {...latestPost} dictionary={dictionary} type='showcase' />
            <ul>
                {data
                    .filter((post) => post.id !== latestPost.id)
                    .map((_item) => (
                        <li key={v4()}>
                            <BlogCard {..._item} dictionary={dictionary} />
                        </li>
                    ))}
            </ul>
        </div>
    );
}
