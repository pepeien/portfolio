'use client';

import React from 'react';
import ContentLoader from 'react-content-loader';
import { v4 } from 'uuid';

const MIN_TECHNOLOGY_COUNT = 3;

const JobCardLoader = () => {
    return (
        <div className='job-card' data-is-loading={true}>
            <div className='job-card__date'>
                <div className='job-card__date__text'>
                    <ContentLoader speed={2} backgroundColor='#36383c' foregroundColor='#4f5a61'>
                        <rect rx='3' ry='3' width='100%' height='100%' />
                    </ContentLoader>
                </div>
            </div>
            <div className='job-card__info'>
                <div className='job-card__info__company'>
                    <ContentLoader speed={2} backgroundColor='#36383c' foregroundColor='#4f5a61'>
                        <rect rx='3' ry='3' width='100%' height='100%' />
                    </ContentLoader>
                </div>
                <div className='job-card__info__description'>
                    <ContentLoader speed={2} backgroundColor='#36383c' foregroundColor='#4f5a61'>
                        <rect rx='3' ry='3' width='100%' height='100%' />
                    </ContentLoader>
                </div>
                <ul className='job-card__info__technologies'>
                    {new Array(MIN_TECHNOLOGY_COUNT).fill({}).map(() => {
                        return (
                            <li key={v4()}>
                                <ContentLoader
                                    speed={2}
                                    backgroundColor='#36383c'
                                    foregroundColor='#4f5a61'
                                >
                                    <rect rx='3' ry='3' width='100%' height='100%' />
                                </ContentLoader>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default JobCardLoader;
