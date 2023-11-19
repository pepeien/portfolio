import React from 'react';

import type { Metadata } from 'next';

// Components
import { Footer, Navbar } from '@components';

// Dictionary
import { getAlternates, getCanonical, getDictionary, getLocales } from '@dictionary';

import '../styles/main.scss';
import { InternalServices } from '@utils/services';

const icons = [
    {
        url: '/favicon.ico',
        sizes: '64x64 32x32 24x24 16x16',
        type: 'image/x-icon',
    },
    {
        url: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
    },
    {
        url: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
    },
    {
        url: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
    },
    {
        url: '/mstile-70x70.png',
        sizes: '70x70',
        type: 'image/png',
    },
    {
        url: '/mstile-144x144.png',
        sizes: '144x144',
        type: 'image/png',
    },
    {
        url: '/mstile-150x150.png',
        sizes: '150x150',
        type: 'image/png',
    },
    {
        url: '/mstile-310x150.png',
        sizes: '310x150',
        type: 'image/png',
    },
    {
        url: '/mstile-310x310.png',
        sizes: '310x310',
        type: 'image/png',
    },
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const dictionary = await getDictionary(params.lang);

    const title = dictionary['HOME_PAGE_TITLE'];
    const description = dictionary['HOME_PAGE_DESCRIPTION'];
    const bannerURL = new URL(`${InternalServices.getCDN()}/images/thumbnail.png`);
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
            canonical: getCanonical(),
            languages: getAlternates(),
        },
        title: title,
        description: description,
        icons: icons,
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
                <Navbar dictionary={dictionary} locales={getLocales()} />
                {children}
            </body>
        </html>
    );
}
