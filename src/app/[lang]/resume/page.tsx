import { Metadata } from 'next';
import React from 'react';

// Services
import { InternalServices } from '@utils/services';

// Dictionary
import { getCanonicalAlternate, getAlternates, getDictionary } from '@dictionary';

interface Props {
    params: { lang: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const dictionary = await getDictionary(params.lang);

    const title = dictionary['JOB_RESUME_TITLE'];
    const description = dictionary['HOME_PAGE_DESCRIPTION'];
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
            canonical: getCanonicalAlternate('resume'),
            languages: getAlternates('resume'),
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
    };
}

export default async function Page({ params }: Props) {
    const blobURL = InternalServices.getBLOB();

    const pdfName = await fetch(`${blobURL}/resumes/metadata.json`)
        .then((_res) => _res.json())
        .then((_metadata: { [key: string]: string }) => _metadata[params.lang])
        .catch(() => '');

    return (
        <main className='resume --page'>
            <embed src={`${blobURL}/resumes/${pdfName}`} width='100%' height='100%'></embed>
        </main>
    );
}
