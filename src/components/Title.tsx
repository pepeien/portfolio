'use client';

import React from 'react';

const BLUR_COEFFICIENT = 20;

interface Props {
    title: string;
    titleSecond: string;
    name: string;
    nameSecond?: string;
}

export default function Title({ title, titleSecond, name, nameSecond }: Props) {
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

    return (
        <div className='title'>
            <div
                className='title__text --flex-column'
                style={{
                    transform: `translate3d(0, ${-scrollY * 0.15}px, 0)`,
                    filter: `blur(${((scrollY * 1.2) / innerHeight) * BLUR_COEFFICIENT}px)`,
                }}
            >
                <div className='--flex-row'>
                    <h3>{title}</h3>
                    <h3>{titleSecond}</h3>
                </div>
                <div className='title__name' data-has-second={'ABOUT_NAME_SECOND' ? true : false}>
                    <h2>{name}</h2>
                    <h3>{nameSecond}</h3>
                </div>
            </div>
        </div>
    );
}
