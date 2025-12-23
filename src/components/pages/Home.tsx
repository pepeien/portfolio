import { Metadata } from 'next';
import React from 'react';

// Components
import {
    ContactForm,
    ProjectListing,
    JobListing,
    BlogListing,
    MenuListing,
    SocialListing,
    Actions,
} from '@components';

// Dictionary
import { getClientLocales, getDictionary } from '@dictionary';

// Services
import { InternalServices } from '@utils/services';
import Link from 'next/link';

interface Props {
    params: { lang: string };
}

async function generateMetadata({ params }: Props): Promise<Metadata> {
    const dictionary = await getDictionary(params.lang);

    const title = dictionary['HOME_PAGE_TITLE'];
    const description = dictionary['HOME_PAGE_DESCRIPTION'];
    const bannerURL = new URL(`${InternalServices.getBLOB()}/images/thumbnail.png`);
    const banner = {
        url: bannerURL,
        secureUrl: bannerURL,
        alt: `${dictionary['HOME_PAGE_TITLE']} banner`,
        width: 1920,
        height: 1080,
    };

    return {
        title: title,
        description: description,
        openGraph: {
            title: title,
            description: description,
            type: 'website',
            images: banner,
            url: InternalServices.getDeploymentURL(dictionary['LANGUAGE_LOCALE_URL']),
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
    const dictionary = await getDictionary(params.lang);

    return (
        <article className='home --fade-in'>
            <section className='home__header --flex-column'>
                <div className='home__header__title --flex-column'>
                    <h1 className='--color-ease-in'>{dictionary['ABOUT_NAME']}</h1>
                    <h2 className='--color-ease-in'>{dictionary['ABOUT_HERO']}</h2>
                </div>
                <SocialListing dictionary={dictionary} />
                <MenuListing dictionary={dictionary} />
            </section>
            <section id='content' className='home__content --flex-column'>
                <section id='PROJECTS_TITLE'>
                    <h3 className='--color-ease-in'>{dictionary['PROJECTS_TITLE']}</h3>
                    <ProjectListing dictionary={dictionary} maxListing={3} />
                    <Link
                        className='--redirector'
                        href={`/${dictionary['LANGUAGE_LOCALE_URL']}/projects`}
                    >
                        <span className='--color-ease-in'>{dictionary['PROJECTS_REDIRECTOR']}</span>
                        <div className='--skewd-background' />
                    </Link>
                </section>
                <section id='JOB_HISTORY_TITLE'>
                    <h3 className='--color-ease-in'>{dictionary['JOB_HISTORY_TITLE']}</h3>
                    <JobListing dictionary={dictionary} />
                </section>
                <section id='BLOG_TITLE'>
                    <h3 className='--color-ease-in'>{dictionary['BLOG_TITLE']}</h3>
                    <BlogListing isShowcasing={true} dictionary={dictionary} />
                    <Link
                        className='--redirector'
                        href={`/${dictionary['LANGUAGE_LOCALE_URL']}/blog`}
                    >
                        <span className='--color-ease-in'>{dictionary['BLOG_REDIRECTOR']}</span>
                        <div className='--skewd-background' />
                    </Link>
                </section>
                <section id='CONTACT_TITLE'>
                    <h3 className='--color-ease-in'>{dictionary['CONTACT_TITLE']}</h3>
                    <ContactForm dictionary={dictionary} />
                </section>
            </section>
            <Actions dictionary={dictionary} locales={getClientLocales()} />
        </article>
    );
}

export type { Props };
export { generateMetadata, generatePage };
