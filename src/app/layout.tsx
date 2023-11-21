import React from 'react';
import type { Metadata } from 'next';

// Components
import { Navbar } from '@components';

// Dictionary
import {
    getAlternates,
    getCanonicalAlternate,
    getClientLocales,
    getDictionary,
    getServerDefaultLocale,
} from '@dictionary';

// Services
import { InternalServices } from '@utils/services';

// Icons
import icons from '@utils/icons';

// Styles
import './styles/main.scss';

interface Props {
    children: React.ReactNode;
}

export async function generateMetadata(): Promise<Metadata> {
    const dictionary = await getDictionary(getServerDefaultLocale());

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

export default async function Layout({ children }: Props) {
    return <>{children}</>;
}
