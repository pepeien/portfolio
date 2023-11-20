import React from 'react';

// Services
import { InternalServices } from '@utils/services';

interface Props {
    params: { lang: string };
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
