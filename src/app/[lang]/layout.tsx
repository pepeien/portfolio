import React from 'react';

import type { Metadata } from 'next';

// Components
import { Footer, Navbar } from '@components';

// Dictionary
import { getDictionary, getLocales } from './dictionaries';

import '../styles/main.scss';

export const metadata: Metadata = {
    title: 'Erick Frederick',
    description: "Erick Frederick's portfolio page",
    icons: [
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
    ],
    openGraph: {
        siteName: 'Erick Frederick',
        title: 'Erick Frederick',
        description: "Erick Frederick's portfolio page",
        type: 'website',
    },
};

interface Props {
    params: { lang: string };
    searchParams: string;
    children: React.ReactNode;
}

export default async function RootLayout({ params, searchParams, children }: Props) {
    const dictionary = await getDictionary(params.lang);

    return (
        <html lang={dictionary['LANGUAGE_LOCALE']}>
            <body>
                <Navbar dictionary={dictionary} locales={getLocales()} />
                {children}
                <Footer dictionary={dictionary} />
            </body>
        </html>
    );
}
