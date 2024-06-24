'use client';

import React from 'react';

// Types
import { Dictionary } from '@utils/interfaces';

// Services
import { StringServices } from '@utils/services';

const PARALLAX_COEFFICIENT = 0.15;
const BLUR_COEFFICIENT = 20;

interface Props {
    dictionary: Dictionary;
}

export default function Title({ dictionary }: Props) {
    const [scrollY, setScrollY] = React.useState<number>(0);
    const [innerHeight, setInnerHeight] = React.useState<number>(0);

    React.useEffect(() => {
        addEventListener('scroll', () => {
            setScrollY(window.scrollY);
            setInnerHeight(window.innerHeight);
        });

        return () => {
            removeEventListener('scroll', () => {
                setScrollY(window.scrollY);
                setInnerHeight(window.innerHeight);
            });
        };
    }, [scrollY]);

    const getParallax = () => {
        const result = Math.max(0, -scrollY * PARALLAX_COEFFICIENT);

        if (isNaN(result)) {
            return 0;
        }

        return result;
    };

    const getScrollBlur = () => {
        const result = Math.max(0, ((scrollY * 1.2) / innerHeight) * BLUR_COEFFICIENT);

        if (isNaN(result)) {
            return 0;
        }

        return result;
    };

    return (
        <div className='title'>
            <div
                className='title__wrapper --flex-column'
                style={{
                    transform: `translate3d(0, ${getParallax()}px, 0)`,
                    filter: getScrollBlur() >= 1 ? `blur(${getScrollBlur()}px)` : undefined,
                }}
            >
                <div className='title__hero --flex-column'>
                    <h4>{dictionary['ABOUT_HERO']}</h4>
                </div>
                <div className='title__pre --flex-row'>
                    <h3>{dictionary['ABOUT_TITLE']}</h3>
                    <h3 className='--last'>{dictionary['ABOUT_TITLE_SECOND']}</h3>
                </div>
                <div
                    className='title__name --flex-row'
                    data-has-second={StringServices.isStringValid(dictionary['ABOUT_NAME_SECOND'])}
                >
                    <h2>{dictionary['ABOUT_NAME']}</h2>
                    <h3 className='--last'>{dictionary['ABOUT_NAME_SECOND']}</h3>
                </div>
            </div>
        </div>
    );
}
