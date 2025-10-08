import React from 'react';

// Types
import { Dictionary } from '@utils/interfaces';

// Components
import { LanguageAction, ThemeAction, HomeAction } from '@components';

interface Props {
    dictionary: Dictionary;
    locales: Dictionary;
}

export default function Component({ dictionary, locales }: Props) {
    return (
        <nav className='actions'>
            <LanguageAction dictionary={dictionary} locales={locales} />
            <ThemeAction />
            <HomeAction dictionary={dictionary} />
        </nav>
    );
}
