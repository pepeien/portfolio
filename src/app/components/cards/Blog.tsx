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

export default function BlogCard({
    id,
    author,
    date,
    dictionary,
    personalDictionary,
}: BlogCardProps) {
    const generateElapsedTime = (time: string) => {
        if (!dictionary.DATE_ELAPSED) {
            return time;
        }

        return dictionary.DATE_ELAPSED_LOCATION === 'AFTER'
            ? `${time} ${dictionary.DATE_ELAPSED}`
            : `${dictionary.DATE_ELAPSED} ${time}`;
    };

    const getLocalizedDate = (date?: Date, fallback = ''): string => {
        if (!date || !date.toLocaleDateString) {
            return fallback;
        }

        const MINUTES_ON_HOUR = 60;
        const HOURS_ON_DAY = 24;
        const DAYS_ON_MONTH = 31;
        const MONTHS_ON_YEAR = 12;

        const minutes = Math.ceil(Math.abs(date.getTime() - Date.now()) / 1000 / 60);

        if (minutes < MINUTES_ON_HOUR) {
            return dictionary.DATE_NOW;
        }

        const hours = Math.round(minutes / 60);

        if (hours < HOURS_ON_DAY) {
            return generateElapsedTime(
                `${hours} ${
                    hours <= 1 ? dictionary.DATE_HOUR_LONG : dictionary.DATE_HOUR_LONG_PLURAL
                }`,
            );
        }

        const days = Math.round(hours / 24);

        if (days < DAYS_ON_MONTH) {
            return generateElapsedTime(
                `${days} ${
                    hours <= 1 ? dictionary.DATE_DAY_LONG : dictionary.DATE_DAY_LONG_PLURAL
                }`,
            );
        }

        const months = Math.round(days / 30);

        if (months < MONTHS_ON_YEAR) {
            return generateElapsedTime(
                `${months} ${
                    months <= 1 ? dictionary.DATE_MONTH_LONG : dictionary.DATE_MONTH_LONG_PLURAL
                }`,
            );
        }

        const years = months / 12;

        return generateElapsedTime(
            `${years} ${years <= 1 ? dictionary.DATE_YEAR_LONG : dictionary.DATE_YEAR_LONG_PLURAL}`,
        );
    };

    return (
        <Link
            className='blog-card --shadowed'
            href={`${dictionary['LANGUAGE_LOCALE_URL']}/blog/${id}`}
        >
            <div className='blog-card__thumbnail'>
                <div className='blog-card__header'>
                    <div className='blog-card__header__block blog-card__header__author'>
                        <span>{author}</span>
                    </div>
                    <div className='blog-card__header__block blog-card__header__date'>
                        <span>{getLocalizedDate(new Date(date))}</span>
                    </div>
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
