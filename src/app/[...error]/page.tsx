import React from 'react';

// Dictionary
import { getDictionary } from '@dictionary';

// Components
import { Mountains } from '@components';

interface Props {
    params: { error: string[] };
}

export default async function Page({ params }: Props) {
    const { error } = params;

    const dictionary = await getDictionary(error[0]);

    return (
        <main className='not-found --page'>
            <section>
                <div className='title'>
                    <div className='title__text --flex-column'>
                        <div className='--flex-row'>
                            <h3>{dictionary['NOT_FOUND_TEXT']}</h3>
                        </div>
                        <div className='title__name'>
                            <h2>404</h2>
                        </div>
                    </div>
                </div>
                <Mountains isScrollReactive={false} />
            </section>
        </main>
    );
}
