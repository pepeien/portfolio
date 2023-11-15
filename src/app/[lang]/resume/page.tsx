import React from 'react';

// Services
import { getCDN } from '@utils/services/api';

interface Props {
    params: { lang: string };
}

export default async function Page({ params }: Props) {
    const pdfName = await fetch(`${getCDN()}/resumes/metadata.json`)
        .then((_res) => _res.json())
        .then((_metadata: { [key: string]: string }) => _metadata[params.lang])
        .catch(() => '');

    return (
        <main className='--page'>
            <embed src={`${getCDN()}/resumes/${pdfName}`} width='100%' height='1005'></embed>
        </main>
    );
}
