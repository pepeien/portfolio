import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

// Type
import { Dictionary, Blog, BlogDictionary } from '@utils/interfaces';

// Services
import { InternalServices, StringServices } from '@utils/services';

export interface BlogCardProps extends Blog {
    dictionary: Dictionary;
    personalDictionary: BlogDictionary;
}

export default function BlogCard({
    id,
    author,
    date,
    dictionary,
    personalDictionary,
}: BlogCardProps) {
    const elapsedTimeSincePost = StringServices.getLocalizedElapsedDate(dictionary, new Date(date));

    const getHeader = () => {
        return (
            <ul className='blog-card__header'>
                <li className='blog-card__header__block blog-card__header__author'>
                    <svg
                        version='1.1'
                        xmlns='http://www.w3.org/2000/svg'
                        xmlnsXlink='http://www.w3.org/1999/xlink'
                        viewBox='0 0 511.999 511.999'
                        xmlSpace='preserve'
                    >
                        <g>
                            <g>
                                <path
                                    d='M421.578,190.264l-99.847-99.847c-2.439-2.439-6.391-2.439-8.829,0L82.824,320.495c-2.439,2.439-2.439,6.392,0,8.829
			l99.847,99.847c2.439,2.439,6.391,2.439,8.829,0l230.078-230.078C424.017,196.655,424.017,192.703,421.578,190.264z'
                                />
                            </g>
                        </g>
                        <g>
                            <g>
                                <path
                                    d='M506.511,87.672L424.323,5.484c-7.308-7.31-19.175-7.315-26.488,0l-49.616,49.616c-2.439,2.439-2.439,6.391,0,8.829
			l99.847,99.847c2.439,2.437,6.391,2.437,8.829,0l49.616-49.616C513.826,106.847,513.826,94.987,506.511,87.672z'
                                />
                            </g>
                        </g>
                        <g>
                            <g>
                                <path
                                    d='M508.133,491.11c-1.054-9.556-9.489-16.599-19.104-16.599H111.633l36.058-15.163c4.088-1.719,5.131-7.034,1.994-10.17
			l-86.854-86.854c-3.137-3.135-8.451-2.094-10.17,1.994C52.224,365.359,2.052,484.66,1.627,485.707
			c-5.815,13.208,4.855,27.01,18.107,26.263H489.52C500.566,511.97,509.379,502.408,508.133,491.11z'
                                />
                            </g>
                        </g>
                    </svg>
                    <span>{author}</span>
                </li>
                <li className='blog-card__header__block blog-card__header__date'>
                    <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path
                            d='M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        />
                        <path
                            d='M12 6V12'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        />
                        <path
                            d='M16.24 16.24L12 12'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        />
                    </svg>
                    <span>{elapsedTimeSincePost}</span>
                </li>
            </ul>
        );
    };

    return (
        <Link
            className='blog-card --shadowed'
            href={`${dictionary['LANGUAGE_LOCALE_URL']}/blog/${id}`}
        >
            <div className='blog-card__thumbnail'>
                <Image
                    src={`${InternalServices.getCDN()}/blog/${id}/images/thumbnail.png`}
                    width={910}
                    height={512}
                    quality={100}
                    alt={`${personalDictionary.title} thumbnail`}
                    loading='eager'
                />
            </div>
            <div className='blog-card__data'>
                <div className='blog-card__data__info'>
                    {getHeader()}
                    <h5 className='blog-card__data__info__title'>{personalDictionary.title}</h5>
                    <p className='blog-card__data__info__description'>
                        {personalDictionary.description}
                    </p>
                </div>
            </div>
        </Link>
    );
}
