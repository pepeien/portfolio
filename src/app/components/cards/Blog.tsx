import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

// Type
import { Dictionary, Blog, BlogDictionary } from '@utils/interfaces';

// Services
import { getCurrentRepoCDN } from '@utils/services/api';

export interface BlogCardProps extends Blog {
    dictionary: Dictionary;
    personalDictionary: BlogDictionary;
}

export default function BlogCard({ id, dictionary, personalDictionary }: BlogCardProps) {
    return (
        <Link className='blog-card' href={`${dictionary['LANGUAGE_LOCALE_URL']}/blog/${id}`}>
            <div className='blog-card__thumbnail'>
                <Image
                    src={`${getCurrentRepoCDN()}/.github/blog/${id}/thumbnail.png`}
                    height={1080}
                    width={1920}
                    alt={`${personalDictionary.title} thumbnail`}
                    loading='eager'
                />
            </div>
            <div className='blog-card__data'>
                <div className='blog-card__data__info'>
                    <h5>{personalDictionary.title}</h5>
                    <span>{personalDictionary.description}</span>
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
