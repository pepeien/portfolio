import React from 'react';

// Dictionary
import { getDictionary } from '@dictionary';

// Components
import { Mountains, Navbar } from '@components';

export default async function Page() {
    const dictionary = await getDictionary('en-us');

    return (
        <>
            <Navbar dictionary={dictionary} />
            <main className='not-found --page'>
                <section>
                    <div className='title'>
                        <div className='title__text --flex-column'>
                            <div className='title__name'>
                                <h2>404</h2>
                            </div>
                        </div>
                    </div>
                    <Mountains isScrollReactive={false} />
                </section>
            </main>
        </>
    );
}
