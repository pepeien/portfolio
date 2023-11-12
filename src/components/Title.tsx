import React from 'react';

// Context
import { LangContext } from '../context';

const BLUR_COEFFICIENT = 20;

const Title = () => {
    const [selectedLang, _] = React.useContext(LangContext);

    const [scrollY, setScrollY] = React.useState<number>(window.scrollY);

    React.useEffect(() => {
        addEventListener('scroll', () => {
            setScrollY(window.scrollY);
        });
    }, [scrollY]);

    return (
        <div className='title'>
            <div
                className='title__text --flex-column'
                style={{
                    transform: `translate3d(0, ${-scrollY * 0.15}px, 0)`,
                    filter: `blur(${((scrollY * 1.2) / window.innerHeight) * BLUR_COEFFICIENT}px)`,
                }}
            >
                <div className='--flex-row'>
                    <h3>{selectedLang['ABOUT_TITLE']}</h3>
                    <h3>{selectedLang['ABOUT_TITLE_SECOND']}</h3>
                </div>
                <div
                    className='title__name'
                    data-has-second={selectedLang['ABOUT_NAME_SECOND'] ? true : false}
                >
                    <h2>{selectedLang['ABOUT_NAME']}</h2>
                    {selectedLang['ABOUT_NAME_SECOND'] ? (
                        <h3>{selectedLang['ABOUT_NAME_SECOND']}</h3>
                    ) : undefined}
                </div>
            </div>
        </div>
    );
};

export default Title;
