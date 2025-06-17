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
import { TagListing } from '@components';

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
            url: InternalServices.getDeploymentURL(
                `${dictionary['LANGUAGE_LOCALE_URL']}/blog/${id}`,
            ),
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
            viewBox='0 0 612 612'
            aria-hidden='true'
        >
            <g transform='translate(42.666667, 42.666667)'>
                <path
                    d='M458.159,404.216c-18.93-33.65-49.934-71.764-100.409-93.431c-28.868,20.196-63.938,32.087-101.745,32.087
		c-37.828,0-72.898-11.89-101.767-32.087c-50.474,21.667-81.479,59.782-100.398,93.431C28.731,448.848,48.417,512,91.842,512
		c43.426,0,164.164,0,164.164,0s120.726,0,164.153,0C463.583,512,483.269,448.848,458.159,404.216z'
                />
                <path
                    d='M256.005,300.641c74.144,0,134.231-60.108,134.231-134.242v-32.158C390.236,60.108,330.149,0,256.005,0
		c-74.155,0-134.252,60.108-134.252,134.242V166.4C121.753,240.533,181.851,300.641,256.005,300.641z'
                />
            </g>
        </svg>
    );
};

const getElapsedTimeIcon = () => {
    return (
        <svg
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
            xmlnsXlink='http://www.w3.org/1999/xlink'
            aria-hidden='true'
        >
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

const getThemeIcon = () => {
    return (
        <svg
            viewBox='0 0 524 524'
            version='1.1'
            xmlns='http://www.w3.org/2000/svg'
            xmlnsXlink='http://www.w3.org/1999/xlink'
            aria-hidden='true'
        >
            <path
                transform='translate(42.666667, 42.666667)'
                d='M213.333333,3.55271368e-14 C95.51296,3.55271368e-14 3.55271368e-14,95.51168 3.55271368e-14,213.333333 C3.55271368e-14,331.153707 95.51296,426.666667 213.333333,426.666667 C331.154987,426.666667 426.666667,331.153707 426.666667,213.333333 C426.666667,95.51168 331.154987,3.55271368e-14 213.333333,3.55271368e-14 Z M213.333333,384 C119.227947,384 42.6666667,307.43872 42.6666667,213.333333 C42.6666667,119.227947 119.227947,42.6666667 213.333333,42.6666667 C307.44,42.6666667 384,119.227947 384,213.333333 C384,307.43872 307.44,384 213.333333,384 Z M240.04672,128 C240.04672,143.46752 228.785067,154.666667 213.55008,154.666667 C197.698773,154.666667 186.713387,143.46752 186.713387,127.704107 C186.713387,112.5536 197.99616,101.333333 213.55008,101.333333 C228.785067,101.333333 240.04672,112.5536 240.04672,128 Z M192.04672,192 L234.713387,192 L234.713387,320 L192.04672,320 L192.04672,192 Z'
            ></path>
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
        <main className='blog --hidden-overflow-all --fade-in'>
            <section className='blog__banner --flex-center'>
                <Image
                    className='blog__banner__image'
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
            <section className='blog__content'>
                <div className='markdown'>
                    <Markdown rehypePlugins={[rehypeRaw]}>{markdownData}</Markdown>
                </div>
            </section>
        </main>
    );
}

export type { Props };
export { generateMetadata, generatePage, getAuthorIcon, getElapsedTimeIcon, getThemeIcon };
