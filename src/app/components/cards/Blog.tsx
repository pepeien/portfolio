import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

// Type
import { Dictionary, Blog, BlogDictionary } from '@utils/interfaces';

// Services
import { getCDN } from '@utils/services/api';

export interface BlogCardProps extends Blog {
    dictionary: Dictionary;
    personalDictionary: BlogDictionary;
}

export default function BlogCard({ id, date, dictionary, personalDictionary }: BlogCardProps) {
    return (
        <Link className='blog-card' href={`${dictionary['LANGUAGE_LOCALE_URL']}/blog/${id}`}>
            <div className='blog-card__thumbnail'>
                <div className='blog-card__date'>
                    <span>Article</span>
                </div>
                <Image
                    src={`${getCDN()}/blog/${id}/images/thumbnail.png`}
                    width={910}
                    height={512}
                    quality={100}
                    alt={`${personalDictionary.title} thumbnail`}
                    loading='eager'
                />
            </div>
            <div className='blog-card__data'>
                <div className='blog-card__date'>
                    <span>{new Date(date).toLocaleDateString()}</span>
                </div>
                <div className='blog-card__data__info'>
                    <h5 className='blog-card__data__info__title'>{personalDictionary.title}</h5>
                    <p className='blog-card__data__info__description'>
                        {personalDictionary.description}
                    </p>
                    <div className='blog-card__data__arrow'>
                        <span>{dictionary.BLOG_READ_INVITATION}</span>
                        <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                            <path
                                d='M4 12H20M20 12L16 8M20 12L16 16'
                                strokeWidth='2'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </Link>
    );
}
