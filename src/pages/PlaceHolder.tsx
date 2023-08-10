import React from 'react';

// Components
import { ContactForm, RectButton } from '../components';

// Context
import { LangContext } from '../context';

const PlaceHolder = () => {
    const [selectedLang, _] = React.useContext(LangContext);

    const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false);

    const modalHandler = () => {
        setIsModalVisible(!isModalVisible);
    };

    const getButtonSVG = () => {
        return (
            <svg
                version='1.1'
                xmlns='http://www.w3.org/2000/svg'
                x='0px'
                y='0px'
                viewBox='0 0 330 330'
            >
                <path
                    d='M325.606,229.393l-150.004-150C172.79,76.58,168.974,75,164.996,75c-3.979,0-7.794,1.581-10.607,4.394
							l-149.996,150c-5.858,5.858-5.858,15.355,0,21.213c5.857,5.857,15.355,5.858,21.213,0l139.39-139.393l139.397,139.393
							C307.322,253.536,311.161,255,315,255c3.839,0,7.678-1.464,10.607-4.394C331.464,244.748,331.464,235.251,325.606,229.393z'
                />
            </svg>
        );
    };

    return (
        <main className='place-holder --page --fade-in --flex-center'>
            <div className='place-holder__title --zoom-in --flex-center'>
                <div>
                    <span className='--slide-in'>{selectedLang['PLACE_HOLDER_STATUS_1']}</span>
                </div>
                <div className='--blink --infinite-animation' />
                <div>
                    <span>{selectedLang['PLACE_HOLDER_STATUS_2']}</span>
                </div>
            </div>
            <div className='place-holder__footer' data-is-upward={isModalVisible}>
                <RectButton
                    className='--flex-center --bounce-in'
                    onClick={modalHandler}
                    ContentComponent={getButtonSVG}
                />
            </div>
            <ContactForm isVisible={isModalVisible} />
        </main>
    );
};

export default PlaceHolder;
