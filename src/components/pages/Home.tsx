import { Metadata } from 'next';
import React from 'react';

// Components
import {
    ContactForm,
    Footer,
    ProjectListing,
    JobListing,
    BlogListing,
    MenuListing,
    Socials,
} from '@components';

// Dictionary
import { getDictionary } from '@dictionary';

// Services
import { InternalServices } from '@utils/services';

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
        <>
            <main className='home --hidden-overflow-all'>
                <div className='home__header --fade-in --flex-column'>
                    <div className='home__header__title --flex-column'>
                        <h1>{dictionary['ABOUT_NAME']}</h1>
                        <h2>{dictionary['ABOUT_HERO']}</h2>
                    </div>
                    <Socials dictionary={dictionary} />
                    <MenuListing dictionary={dictionary} />
                </div>
                <section id='content' className='home__content --fade-in --flex-column'>
                    <article id='PROJECTS_TITLE'>
                        <h3>{dictionary['PROJECTS_TITLE']}</h3>
                        <ProjectListing dictionary={dictionary} />
                    </article>
                    <article id='JOB_HISTORY_TITLE'>
                        <h3>{dictionary['JOB_HISTORY_TITLE']}</h3>
                        <JobListing dictionary={dictionary} />
                    </article>
                    <article id='BLOG_TITLE'>
                        <h3>{dictionary['BLOG_TITLE']}</h3>
                        <BlogListing dictionary={dictionary} />
                    </article>
                    <article id='CONTACT_TITLE'>
                        <h3>{dictionary['CONTACT_TITLE']}</h3>
                        <ContactForm dictionary={dictionary} />
                    </article>
                </section>
            </main>
            <Footer dictionary={dictionary} />
        </>
    );
}

export type { Props };
export { generateMetadata, generatePage };
