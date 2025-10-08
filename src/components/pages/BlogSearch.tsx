import { Metadata } from 'next';
import { headers } from 'next/headers';
import React from 'react';

// Dictionary
import { getAlternates, getClientLocales, getDictionary, LOCALE_HEADER_KEY } from '@dictionary';

// Services
import { InternalServices } from '@utils/services';

// Components
import { Actions, BlogListing } from '@components';

interface Props {
    params: { lang: string };
}

async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = params;

    const dictionary = await getDictionary(lang);

    const title = `${dictionary['HOME_PAGE_TITLE']} - ${dictionary['BLOG_PAGE_TITLE']}`;
    const description = dictionary['BLOG_PAGE_DESCRIPTION'];
    const bannerURL = new URL(`${InternalServices.getBLOB()}/images/thumbnail.png`);
    const banner = {
        url: bannerURL,
        secureUrl: bannerURL,
        alt: `${title} banner`,
        width: 1920,
        height: 1080,
    };

    return {
        alternates: {
            canonical: `${headers().get(LOCALE_HEADER_KEY)}/blog`,
            languages: getAlternates('blog'),
        },
        title: title,
        description: description,
        openGraph: {
            title: title,
            description: description,
            type: 'website',
            images: banner,
            url: InternalServices.getDeploymentURL(`${dictionary['LANGUAGE_LOCALE_URL']}/blog`),
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

async function generatePage({ params }: Props) {
    const { lang } = params;

    const dictionary = await getDictionary(lang);

    return (
        <article className='blog-search --fade-in'>
            <section className='blog-search__content --flex-center'>
                <h1>{dictionary['BLOG_TITLE']}</h1>
                <BlogListing isShowcasing={false} dictionary={dictionary}></BlogListing>
            </section>
            <Actions dictionary={dictionary} locales={getClientLocales()} />
        </article>
    );
}

export type { Props };
export { generateMetadata, generatePage };
