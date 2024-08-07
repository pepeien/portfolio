'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

// Types
import { Dictionary } from '@utils/interfaces';

// Services
import { StringServices } from '@utils/services';

interface Props {
    dictionary: Dictionary;
    locales?: Dictionary;
}

const Language = ({ dictionary, locales }: Props) => {
    const pathName = usePathname();

    const isLanguageSelected = React.useCallback(
        (langName: string) => {
            return langName === dictionary['LANGUAGE_LOCALE_URL'];
        },
        [dictionary],
    );

    return (
        <nav className='language --flex-column'>
            <ul className='--flex-row'>
                {locales ? (
                    <ul className='language__list --flex-row'>
                        {Object.entries(locales).map(([id, name], index) => (
                            <li
                                key={id}
                                className='--flex-row'
                                data-is-selected={isLanguageSelected(id)}
                            >
                                <Link
                                    href={`/${id}/${StringServices.removeExtraSlashes(
                                        pathName.split(dictionary['LANGUAGE_LOCALE_URL'])[1],
                                    )}`}
                                    scroll={false}
                                >
                                    <span>{name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : undefined}
            </ul>
        </nav>
    );
};

export default Language;
