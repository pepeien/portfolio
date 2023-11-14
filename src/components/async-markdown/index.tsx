'use client';

import React from 'react';
import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

// Components
import AsyncMarkdownLoader from './loader';

interface AsyncMarkdownProps {
    src: string;
}

export default function AsyncMarkdown({ src }: AsyncMarkdownProps) {
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [data, setData] = React.useState<undefined | string>();

    React.useEffect(() => {
        if (!src) {
            setIsLoading(false);

            return;
        }

        setIsLoading(true);

        fetch(src)
            .then((res) => res.text())
            .then((data) => {
                setData(data === '404: Not Found' ? undefined : data);
            })
            .catch(() => {
                setData(undefined);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <AsyncMarkdownLoader />;
    }

    return (
        <Markdown className='async-markdown' rehypePlugins={[rehypeRaw]}>
            {data}
        </Markdown>
    );
}
