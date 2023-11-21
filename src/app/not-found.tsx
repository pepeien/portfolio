import React from 'react';

// Dictionary
import { getDictionary, getServerDefaultLocale } from '@dictionary';

// Components
import { Mountains, Navbar } from '@components';

export default async function Page() {
    const dictionary = await getDictionary(getServerDefaultLocale());

    return (
        <html lang={dictionary['LANGUAGE_LOCALE']}>
            <body>
                <Navbar dictionary={dictionary} />
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
            </body>
        </html>
    );
}
