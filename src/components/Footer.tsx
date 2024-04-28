import React from 'react';

// Types
import { Dictionary } from '@utils/interfaces';

interface Props {
    dictionary: Dictionary;
}

const Footer = ({ dictionary }: Props) => {
    return (
        <footer>
            <span>{dictionary['FOOTER_TEXT_2']} 2023-2024</span>
        </footer>
    );
};

export default Footer;
