import React from 'react';
import type { Metadata } from 'next';

// Components
import { LanguageListing, SocialListing } from '@components';

// Dictionary
import { getAlternates, getCanonicalAlternate, getDictionary, getClientLocales } from '@dictionary';

// Services
import { InternalServices } from '@utils/services';

interface Props {
    params: { lang: string };
    children: React.ReactNode;
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
        metadataBase: InternalServices.getDeploymentURL(),
        alternates: {
            //canonical: getCanonicalAlternate(),
            languages: getAlternates(),
        },
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
        other: {
            'google-site-verification': process.env.GOOGLE_VERIFICATION ?? '',
        },
    };
}

async function generatePage({ params, children }: Props) {
    const dictionary = await getDictionary(params.lang);

    return (
        <html lang={dictionary['LANGUAGE_LOCALE']}>
            <body suppressHydrationWarning={true}>
                <LanguageListing dictionary={dictionary} locales={getClientLocales()} />
                {children}
            </body>
        </html>
    );
}

export type { Props };
export { generateMetadata, generatePage };
