'use client';

import React from 'react';
import ContentLoader from 'react-content-loader';
import { v4 } from 'uuid';

export default function AsyncMarkdownLoader() {
    return (
        <div className='async-markdown' data-is-loading={true}>
            <h1>
                <ContentLoader speed={3} backgroundColor='#545454' foregroundColor='#a3a2a2'>
                    <rect rx='3' ry='3' width='100%' height='100%' />
                </ContentLoader>
            </h1>
            {new Array(6).fill('').map(() => {
                return (
                    <p key={v4()} style={{ width: `${Math.max(Math.random() * 100, 60)}%` }}>
                        <ContentLoader
                            speed={3}
                            backgroundColor='#545454'
                            foregroundColor='#a3a2a2'
                        >
                            <rect rx='3' ry='3' width='100%' height='100%' />
                        </ContentLoader>
                    </p>
                );
            })}
        </div>
    );
}
