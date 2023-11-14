import React from 'react';

import type { Metadata } from 'next';

// Components
import { Footer, Navbar } from '@components';

// Dictionary
import { getDictionary, getLocales } from './dictionaries';

import './styles/global.scss';

export const metadata: Metadata = {
    title: 'Erick Frederick',
    description: "Erick Frederick's portfolio page",
    icons: [
        {
            url: 'favicon.ico',
            sizes: '64x64 32x32 24x24 16x16',
            type: 'image/x-icon',
        },
        {
            url: 'android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
        },
        {
            url: 'android-chrome-512x512.png',
            sizes: '512x512',
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
    children: React.ReactNode;
}

export default async function RootLayout({ params, children }: Props) {
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
