import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

// Type
import { Dictionary, Blog, BlogDictionary } from '@utils/interfaces';

// Services
import { InternalServices, StringServices } from '@utils/services';
import { TagListing } from '@components';

export interface Props extends Blog {
    dictionary: Dictionary;
    personalDictionary: BlogDictionary;
}

export default function Component({
    id,
    author,
    theme,
    date,
    status,
    dictionary,
    personalDictionary,
}: Props) {
    const wasReleased = status === 'RELEASED';
    const accentColor = wasReleased ? '#e2e8f0' : '#313131';
    const backgroundColor = wasReleased ? undefined : '#737272';

    const getAuthorIcon = () => {
        return (
            <svg
                version='1.1'
                xmlns='http://www.w3.org/2000/svg'
                xmlnsXlink='http://www.w3.org/1999/xlink'
                viewBox='0 0 550 550'
                xmlSpace='preserve'
                fill={accentColor}
            >
                <path
                    d='M421.578,190.264l-99.847-99.847c-2.439-2.439-6.391-2.439-8.829,0L82.824,320.495c-2.439,2.439-2.439,6.392,0,8.829
l99.847,99.847c2.439,2.439,6.391,2.439,8.829,0l230.078-230.078C424.017,196.655,424.017,192.703,421.578,190.264z'
                />
                <path
                    d='M506.511,87.672L424.323,5.484c-7.308-7.31-19.175-7.315-26.488,0l-49.616,49.616c-2.439,2.439-2.439,6.391,0,8.829
l99.847,99.847c2.439,2.437,6.391,2.437,8.829,0l49.616-49.616C513.826,106.847,513.826,94.987,506.511,87.672z'
                />
                <path
                    d='M508.133,491.11c-1.054-9.556-9.489-16.599-19.104-16.599H111.633l36.058-15.163c4.088-1.719,5.131-7.034,1.994-10.17
l-86.854-86.854c-3.137-3.135-8.451-2.094-10.17,1.994C52.224,365.359,2.052,484.66,1.627,485.707
c-5.815,13.208,4.855,27.01,18.107,26.263H489.52C500.566,511.97,509.379,502.408,508.133,491.11z'
                />
            </svg>
        );
    };

    const getThemeIcon = () => {
        return (
            <svg fill={accentColor} viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                <path d='M3,8h18c0.6,0,1-0.4,1-1s-0.4-1-1-1H3C2.4,6,2,6.4,2,7S2.4,8,3,8z M13,16H3c-0.6,0-1,0.4-1,1s0.4,1,1,1h10c0.6,0,1-0.4,1-1S13.6,16,13,16z M21,11H3c-0.6,0-1,0.4-1,1s0.4,1,1,1h18c0.6,0,1-0.4,1-1S21.6,11,21,11z' />
            </svg>
        );
    };

    const getElapsedTimeIcon = () => {
        return (
            <svg
                viewBox='0 0 24 24'
                fill='none'
                stroke={accentColor}
                xmlns='http://www.w3.org/2000/svg'
            >
                <path
                    d='M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                />
                <path d='M12 6V12' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
                <path
                    d='M16.24 16.24L12 12'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                />
            </svg>
        );
    };

    return (
        <Link
            className={'blog-card --hoverable'}
            href={
                wasReleased
                    ? `${dictionary['LANGUAGE_LOCALE_URL']}/blog/${id}`
                    : `${dictionary['LANGUAGE_LOCALE_URL']}`
            }
            aria-disabled={wasReleased ? undefined : true}
        >
            <div className='blog-card__thumbnail'>
                <Image
                    src={`${InternalServices.getBLOB()}/blog/${id}/images/thumbnail.png`}
                    width={910}
                    height={512}
                    quality={75}
                    alt={`${personalDictionary.title} thumbnail`}
                />
            </div>
            <div className='blog-card__data'>
                <div className='blog-card__data__info'>
                    <TagListing
                        data={[
                            {
                                icon: getAuthorIcon(),
                                text: author,
                                accentColor: accentColor,
                                backgroundColor: backgroundColor,
                            },
                            {
                                icon: getElapsedTimeIcon(),
                                text: StringServices.getLocalizedElapsedDate(
                                    dictionary,
                                    wasReleased ? new Date(date) : undefined,
                                    'Upcoming',
                                ),
                                accentColor: accentColor,
                                backgroundColor: backgroundColor,
                            },
                            {
                                icon: getThemeIcon(),
                                text: dictionary[theme],
                                accentColor: accentColor,
                                backgroundColor: backgroundColor,
                            },
                        ]}
                    />
                    <h5 className='blog-card__data__info__title'>{personalDictionary.title}</h5>
                    <p className='blog-card__data__info__description'>
                        {personalDictionary.description}
                    </p>
                </div>
            </div>
        </Link>
    );
}
