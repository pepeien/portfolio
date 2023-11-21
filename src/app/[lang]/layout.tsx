import React from 'react';
import type { Metadata } from 'next';

// Components
import { Navbar } from '@components';

// Dictionary
import { getAlternates, getCanonicalAlternate, getDictionary, getClientLocales } from '@dictionary';

// Services
import { InternalServices } from '@utils/services';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
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
            canonical: getCanonicalAlternate(),
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
            'google-site-verification': 'mo9T2NOuRjVjb6aO-W2GVlGhX8Pb6PCVVtvSxJg7V-I',
        },
    };
}

interface Props {
    params: { lang: string };
    children: React.ReactNode;
}

export default async function RootLayout({ params, children }: Props) {
    const dictionary = await getDictionary(params.lang);

    return (
        <html lang={dictionary['LANGUAGE_LOCALE']}>
            <body>
                <Navbar dictionary={dictionary} locales={getClientLocales()} />
                {children}
            </body>
        </html>
    );
}
