import React from 'react';

// Dictionary
import { getDictionary, getServerDefaultLocale } from '@dictionary';

// Components
import { Mountains } from '@components';

export default async function Page() {
    const dictionary = await getDictionary(getServerDefaultLocale());

    return (
        <html lang={dictionary['LANGUAGE_LOCALE']}>
            <body suppressHydrationWarning={true}>
                <main className='not-found --page'>
                    <section>
                        <div className='not-found__title'>
                            <div className='not-found__title__text --flex-column'>
                                <h3>{dictionary['NOT_FOUND_TEXT']}</h3>
                                <h2>404</h2>
                            </div>
                        </div>
                        <Mountains isScrollReactive={false} />
                    </section>
                </main>
            </body>
        </html>
    );
}
