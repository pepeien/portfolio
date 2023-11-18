import React from 'react';

// Services
import { InternalServices } from '@utils/services';

interface Props {
    params: { lang: string };
}

export default async function Page({ params }: Props) {
    const cdnURL = InternalServices.getCDN();
    const pdfName = await fetch(`${cdnURL}/resumes/metadata.json`)
        .then((_res) => _res.json())
        .then((_metadata: { [key: string]: string }) => _metadata[params.lang])
        .catch(() => '');

    return (
        <main className='resume --page'>
            <embed src={`${cdnURL}/resumes/${pdfName}`} width='100%' height='100%'></embed>
        </main>
    );
}
