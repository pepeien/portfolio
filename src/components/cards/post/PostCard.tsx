'use client';

import Image from 'next/image';
import React from 'react';

// Type
import { Post } from '@utils/interfaces';

// Components
import PostCardLoader from './PostCard.loader';

export interface PostCardProps extends Post {
    isLoading?: boolean;
}

const PostCard = ({ id, isLoading }: PostCardProps) => {
    if (isLoading) {
        return <PostCardLoader />;
    }

    return (
        <a className='post-card'>
            <div className='post-card__thumbnail'>
                <Image
                    src={`${
                        process.env.GITHUB_CDN ?? ''
                    }/portfolio/master/.github/posts/${id}/thumbnail.png?raw=true`}
                    alt={`${id} thumbnail`}
                />
            </div>
            <div className='post-card__data'>
                <div className='post-card__data__info'>
                    <h5></h5>
                    <span></span>
                </div>
                <div className='post-card__data__arrow'>
                    <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path
                            d='M4 12H20M20 12L16 8M20 12L16 16'
                            strokeWidth='1'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        />
                    </svg>
                </div>
            </div>
        </a>
    );
};

export default PostCard;
