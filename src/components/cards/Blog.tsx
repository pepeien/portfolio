import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

// Type
import { Dictionary, PersonalDictionary, Blog } from '@utils/interfaces';

export interface BlogCardProps extends Blog {
    dictionary: Dictionary;
    personalDictionary: PersonalDictionary;
}

export default function BlogCard({ id, dictionary, personalDictionary }: BlogCardProps) {
    return (
        <Link className='blog-card' href={`${dictionary['LANGUAGE_LOCALE_URL']}/blog/${id}`}>
            <div className='blog-card__thumbnail'>
                <Image
                    src={`${
                        process.env.GITHUB_CDN ?? ''
                    }/portfolio/master/.github/blogs/${id}/thumbnail.png`}
                    height={1080}
                    width={1920}
                    alt={`${id} thumbnail`}
                />
            </div>
            <div className='blog-card__data'>
                <div className='blog-card__data__info'>
                    <h5>{personalDictionary.blog[id].title}</h5>
                    <span>{personalDictionary.blog[id].description}</span>
                </div>
                <div className='blog-card__data__arrow'>
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
