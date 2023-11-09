import React from 'react';

// Context
import { LangContext } from '../context';

const Footer = () => {
    const [selectedLang, setSelectedLang] = React.useContext(LangContext);

    return (
        <footer>
            <span>
                {selectedLang['FOOTER_TEXT_1']} {'┐(︶▽︶)┌'}
            </span>
            <span>{selectedLang['FOOTER_TEXT_2']} </span>
        </footer>
    );
};

export default Footer;
