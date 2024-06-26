import { Metadata } from 'next';
import React from 'react';

// Components
import {
    ContactForm,
    Title,
    Mountains,
    Footer,
    ProjectListing,
    JobListing,
    BlogListing,
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
            <main className='home --page --flex-column'>
                <div className='home__hero'>
                    <Title dictionary={dictionary} />
                    <Mountains />
                </div>
                <div className='home__content --flex-column'>
                    <div className='home__content__header'>
                        <svg version='1.1' xmlns='http://www.w3.org/2000/svg'>
                            <defs>
                                <linearGradient id='sw-gradient-2' x1='0' x2='0' y1='1' y2='0'>
                                    <stop stopColor='rgba(52, 52, 52, 1)' offset='0%'></stop>
                                    <stop stopColor='rgba(71, 69, 84, 1)' offset='100%'></stop>
                                </linearGradient>
                            </defs>
                            <path
                                fill='url(#sw-gradient-2)'
                                d='M0,336L60,315C120,294,240,252,360,196C480,140,600,70,720,91C840,112,960,224,1080,231C1200,238,1320,140,1440,147C1560,154,1680,266,1800,273C1920,280,2040,182,2160,161C2280,140,2400,196,2520,224C2640,252,2760,252,2880,259C3000,266,3120,280,3240,238C3360,196,3480,98,3600,56C3720,14,3840,28,3960,49C4080,70,4200,98,4320,98C4440,98,4560,70,4680,112C4800,154,4920,266,5040,266C5160,266,5280,154,5400,91C5520,28,5640,14,5760,42C5880,70,6000,140,6120,175C6240,210,6360,210,6480,231C6600,252,6720,294,6840,308C6960,322,7080,308,7200,252C7320,196,7440,98,7560,84C7680,70,7800,140,7920,168C8040,196,8160,182,8280,182C8400,182,8520,196,8580,203L8640,210L8640,420L8580,420C8520,420,8400,420,8280,420C8160,420,8040,420,7920,420C7800,420,7680,420,7560,420C7440,420,7320,420,7200,420C7080,420,6960,420,6840,420C6720,420,6600,420,6480,420C6360,420,6240,420,6120,420C6000,420,5880,420,5760,420C5640,420,5520,420,5400,420C5280,420,5160,420,5040,420C4920,420,4800,420,4680,420C4560,420,4440,420,4320,420C4200,420,4080,420,3960,420C3840,420,3720,420,3600,420C3480,420,3360,420,3240,420C3120,420,3000,420,2880,420C2760,420,2640,420,2520,420C2400,420,2280,420,2160,420C2040,420,1920,420,1800,420C1680,420,1560,420,1440,420C1320,420,1200,420,1080,420C960,420,840,420,720,420C600,420,480,420,360,420C240,420,120,420,60,420L0,420Z'
                            ></path>
                        </svg>
                    </div>
                    <div className='home__content__main'>
                        <section className='home__content__section home__content__section__projects'>
                            <div className='home__content__section__title'>
                                <h4>{dictionary['PROJECTS_TITLE']}</h4>
                            </div>
                            <div className='home__content__section__main'>
                                <ProjectListing dictionary={dictionary} />
                            </div>
                        </section>
                        <section className='home__content__section home__content__section__job --shadowed'>
                            <div className='home__content__section__title'>
                                <h4>{dictionary['JOB_HISTORY_TITLE']}</h4>
                            </div>
                            <div className='home__content__section__main'>
                                <JobListing dictionary={dictionary} />
                            </div>
                        </section>
                        <section className='home__content__section home__content__section__blog'>
                            <div className='home__content__section__title'>
                                <h4>{dictionary['BLOG_TITLE']}</h4>
                            </div>
                            <div className='home__content__section__main'>
                                <BlogListing dictionary={dictionary} />
                            </div>
                        </section>
                        <section className='home__content__section home__content__section__contact --shadowed'>
                            <div className='home__content__section__title'>
                                <h4>{dictionary['CONTACT_TITLE']}</h4>
                            </div>
                            <div className='home__content__section__main'>
                                <ContactForm dictionary={dictionary} />
                            </div>
                        </section>
                    </div>
                </div>
            </main>
            <Footer dictionary={dictionary} />
        </>
    );
}

export type { Props };
export { generateMetadata, generatePage };
