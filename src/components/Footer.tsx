import React from 'react';

// Types
import { Dictionary } from '@utils/interfaces';

interface Props {
    dictionary: Dictionary;
}

export default function Component({ dictionary }: Props) {
    return (
        <div className='footer --fade-in'>
            <span>{dictionary['FOOTER_TEXT_2']}</span>
        </div>
    );
}
