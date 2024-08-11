import { Metadata } from 'next';
import { headers } from 'next/headers';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import React from 'react';
import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

// Types
import { Blog } from '@utils/interfaces';

// Dictionary
import { getAlternates, getDictionary, LOCALE_HEADER_KEY } from '@dictionary';

// Services
import { InternalServices, StringServices } from '@utils/services';

// Components
import { HomeButton, TagListing } from '@components';

interface Props {
    params: { lang: string; id: string };
}

async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang, id } = params;

    const blobURL = InternalServices.getBLOB();

    const blog: Blog[] = await fetch(`${blobURL}/blog/metadata.json`).then((res) => res.json());

    const post = blog.find((_) => _.id === id);

    if (!post || post.status === 'UPCOMING') {
        return {
            alternates: {
                canonical: `${headers().get(LOCALE_HEADER_KEY)}/blog/${id}`,
                languages: getAlternates(`blog/${id}`),
            },
        };
    }

    const dictionary = await getDictionary(lang);

    const title = post.title[dictionary['LANGUAGE_LOCALE_URL']];
    const description = post.description[dictionary['LANGUAGE_LOCALE_URL']];
    const bannerURL = new URL(`${blobURL}/blog/${post.id.trim()}/images/thumbnail.png`);
    const banner = {
        url: bannerURL,
        secureUrl: bannerURL,
        alt: `${title} banner`,
        width: 1920,
        height: 1080,
    };

    return {
        alternates: {
            canonical: `${headers().get(LOCALE_HEADER_KEY)}/blog/${id}`,
            languages: getAlternates(`blog/${id}`),
        },
        title: title,
        description: description,
        openGraph: {
            title: title,
            description: description,
            type: 'article',
            authors: [dictionary.HOME_PAGE_TITLE],
            publishedTime: post.date,
            images: banner,
        },
        twitter: {
            card: 'summary_large_image',
            title: title,
            description: description,
            images: banner,
            site: process.env.TWITTER_HANDLE ?? undefined,
        },
    };
}

const getAuthorIcon = () => {
    return (
        <svg
            version='1.1'
            xmlns='http://www.w3.org/2000/svg'
            xmlnsXlink='http://www.w3.org/1999/xlink'
            viewBox='0 0 550 550'
            xmlSpace='preserve'
            fill='#e2e8f0'
        >
            <path
                d='M421.578,190.264l-99.847-99.847c-2.439-2.439-6.391-2.439-8.829,0L82.824,320.495c-2.439,2.439-2.439,6.392,0,8.829
l99.847,99.847c2.439,2.439,6.391,2.439,8.829,0l230.078-230.078C424.017,196.655,424.017,192.703,421.578,190.264z'
            />
            <path
                d='M506.511,87.672L424.323,5.484c-7.308-7.31-19.175-7.315-26.488,0l-49.616,49.616c-2.439,2.439-2.439,6.391,0,8.829
l99.847,99.847c2.439,2.437,6.391,2.437,8.829,0l49.616-49.616C513.826,106.847,513.826,94.987,506.511,87.672z'
            />
            <path
                d='M508.133,491.11c-1.054-9.556-9.489-16.599-19.104-16.599H111.633l36.058-15.163c4.088-1.719,5.131-7.034,1.994-10.17
l-86.854-86.854c-3.137-3.135-8.451-2.094-10.17,1.994C52.224,365.359,2.052,484.66,1.627,485.707
c-5.815,13.208,4.855,27.01,18.107,26.263H489.52C500.566,511.97,509.379,502.408,508.133,491.11z'
            />
        </svg>
    );
};

const getThemeIcon = () => {
    return (
        <svg fill='#e2e8f0' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
            <path d='M3,8h18c0.6,0,1-0.4,1-1s-0.4-1-1-1H3C2.4,6,2,6.4,2,7S2.4,8,3,8z M13,16H3c-0.6,0-1,0.4-1,1s0.4,1,1,1h10c0.6,0,1-0.4,1-1S13.6,16,13,16z M21,11H3c-0.6,0-1,0.4-1,1s0.4,1,1,1h18c0.6,0,1-0.4,1-1S21.6,11,21,11z' />
        </svg>
    );
};

const getElapsedTimeIcon = () => {
    return (
        <svg viewBox='0 0 24 24' fill='none' stroke='#e2e8f0' xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path d='M12 6V12' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
            <path
                d='M16.24 16.24L12 12'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    );
};

async function generatePage({ params }: Props) {
    const { id, lang } = params;

    const blobURL = InternalServices.getBLOB();
    const data = await fetch(`${blobURL}/blog/metadata.json`, {
        next: { revalidate: InternalServices.getFetchInterval() },
    })
        .then((_res) => _res.json())
        .then((_data: Blog[]) => _data.find((_post) => _post.id === id))
        .catch(() => undefined);

    if (!data || data.status !== 'RELEASED') {
        notFound();
    }

    const markdownData = await fetch(`${blobURL}/blog/${id.trim()}/${lang}.md`, {
        next: { revalidate: InternalServices.getFetchInterval() },
    })
        .then((_res) => _res.text())
        .catch(() => undefined);

    if (!markdownData) {
        notFound();
    }

    const dictionary = await getDictionary(lang);

    return (
        <>
            <main className='blog --hidden-overflow-all'>
                <HomeButton dictionary={dictionary} />
                <section className='blog__banner --flex-center'>
                    <Image
                        className='blog__banner__image --fade-in'
                        src={`${blobURL}/blog/${id.trim()}/images/thumbnail.png`}
                        width={1920}
                        height={1080}
                        quality={100}
                        alt='Blog banner'
                        priority={true}
                    />
                    <div className='blog__banner__content --flex-center'>
                        <h1 className='blog__banner__content__title --descend-in'>
                            {data.title[dictionary['LANGUAGE_LOCALE_URL']]}
                        </h1>
                        <h2 className='blog__banner__content__description --descend-in'>
                            {data.description[dictionary['LANGUAGE_LOCALE_URL']]}
                        </h2>
                        <TagListing
                            className='--descend-in'
                            data={[
                                {
                                    icon: getAuthorIcon(),
                                    text: data.author,
                                },
                                {
                                    icon: getElapsedTimeIcon(),
                                    text: StringServices.getLocalizedElapsedDate(
                                        dictionary,
                                        new Date(data.date),
                                    ),
                                },
                                {
                                    icon: getThemeIcon(),
                                    text: dictionary[data.theme],
                                },
                            ]}
                        />
                    </div>
                </section>
                <section className='blog__content --fade-in'>
                    <div className='markdown'>
                        <Markdown rehypePlugins={[rehypeRaw]}>{markdownData}</Markdown>
                    </div>
                </section>
            </main>
        </>
    );
}

export type { Props };
export { generateMetadata, generatePage };
