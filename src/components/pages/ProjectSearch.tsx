import { Metadata } from 'next';
import { headers } from 'next/headers';
import React from 'react';

// Dictionary
import { getAlternates, getDictionary, LOCALE_HEADER_KEY } from '@dictionary';

// Services
import { InternalServices } from '@utils/services';

// Components
import { ProjectListing } from '@components';

interface Props {
    params: { lang: string };
}

async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = params;

    const dictionary = await getDictionary(lang);

    const title = `${dictionary['HOME_PAGE_TITLE']} - ${dictionary['PROJECTS_TITLE']}`;
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
            canonical: `${headers().get(LOCALE_HEADER_KEY)}/project`,
            languages: getAlternates('project'),
        },
        title: title,
        openGraph: {
            title: title,
            type: 'website',
            images: banner,
            url: InternalServices.getDeploymentURL(`${dictionary['LANGUAGE_LOCALE_URL']}/project`),
        },
        twitter: {
            card: 'summary_large_image',
            title: title,
            images: banner,
            site: process.env.TWITTER_HANDLE ?? undefined,
        },
    };
}

async function generatePage({ params }: Props) {
    const { lang } = params;

    const dictionary = await getDictionary(lang);

    return (
        <main className='project-search --hidden-overflow-all --fade-in'>
            <section className='project-search__content --flex-center'>
                <h1>{dictionary['PROJECTS_TITLE']}</h1>
                <ProjectListing dictionary={dictionary}></ProjectListing>
            </section>
        </main>
    );
}

export type { Props };
export { generateMetadata, generatePage };
