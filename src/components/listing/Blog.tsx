import React from 'react';
import { v4 } from 'uuid';

// Types
import { Dictionary, Blog } from '@utils/interfaces';

// Services
import { InternalServices } from '@utils/services';

// Components
import { BlogCard } from '@components';

export interface Props {
    isShowcasing: boolean;
    dictionary: Dictionary;
}

const MAX_SHOWCASE_COUNT = 4;

export default async function Component({ isShowcasing, dictionary }: Props) {
    const getData = async () => {
        const list = await fetch(`${InternalServices.getBLOB()}/blog/metadata.json`, {
            next: { revalidate: InternalServices.getFetchInterval() },
        })
            .then((_res) => _res.json())
            .then((_blog: Blog[]) => (isShowcasing ? _blog.slice(0, MAX_SHOWCASE_COUNT) : _blog))
            .catch(() => [] as Blog[]);

        if (list.length <= 0) {
            return {
                showcase: undefined,
                list: [],
            };
        }

        return {
            showcase: isShowcasing ? list[0] : undefined,
            list: isShowcasing ? list.slice(1, MAX_SHOWCASE_COUNT - 1) : list,
        };
    };

    const data = await getData();

    return (
        <div className='blogs' data-is-showcasing={isShowcasing}>
            {data.showcase ? <BlogCard {...data.showcase} dictionary={dictionary} /> : undefined}
            <ul className='blogs__list'>
                {data.list.map((_item) => (
                    <li key={v4()}>
                        <BlogCard {..._item} dictionary={dictionary} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
