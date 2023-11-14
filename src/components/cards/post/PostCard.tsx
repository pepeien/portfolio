import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

// Type
import { Dictionary, PersonalDictionary, Post } from '@utils/interfaces';

export interface PostCardProps extends Post {
    dictionary: Dictionary;
    personalDictionary: PersonalDictionary;
}

export default function PostCard({ id, dictionary, personalDictionary }: PostCardProps) {
    return (
        <Link className='post-card' href={`${dictionary['LANGUAGE_LOCALE_URL']}/blog/${id}`}>
            <div className='post-card__thumbnail'>
                <Image
                    src={`${
                        process.env.GITHUB_CDN ?? ''
                    }/portfolio/master/.github/posts/${id}/thumbnail.png`}
                    height={1080}
                    width={1920}
                    alt={`${id} thumbnail`}
                />
            </div>
            <div className='post-card__data'>
                <div className='post-card__data__info'>
                    <h5>{personalDictionary.posts[id].title}</h5>
                    <span>{personalDictionary.posts[id].description}</span>
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
        </Link>
    );
}
