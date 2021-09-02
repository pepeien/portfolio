import React from 'react'
import {useSelector} from 'react-redux';

//Components
import LangSelector from './LangSelector';

function Footer() {
    const currentPageLanguage = useSelector(state => state.pageLanguage);

    return (
        <div className="footer">
            <div className="footer__text">
                <div className="footer__logo">
                    <p>eFrederick</p>
                </div>
                <div className="footer__social">
                    <div className="footer__social-link --spaced-from-top">
                        <a 
                            className="footer__outside-link" 
                            href={`https://www.linkedin.com/in/erick-frederick-c/?locale=${currentPageLanguage}`}
                            target="_blank" rel="noopener noreferrer"
                        >
                            Linkedin
                        </a>
                    </div>
                    <div className="footer__social-link --spaced-from-top">
                        <a 
                            className="footer__outside-link" 
                            href="https://github.com/ericodess" 
                            target="_blank" rel="noopener noreferrer"
                        >
                            Github
                        </a>
                    </div>
                </div>
                <LangSelector />
            </div>
        </div>
    );
};

export default Footer;