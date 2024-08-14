import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

// Type
import { Dictionary, Blog } from '@utils/interfaces';

// Services
import { InternalServices, StringServices } from '@utils/services';

// Components
import { TagListing } from '@components';

export interface Props extends Blog {
    dictionary: Dictionary;
}

export default function Component({
    id,
    author,
    theme,
    date,
    status,
    title,
    description,
    dictionary,
}: Props) {
    const wasReleased = status === 'RELEASED';

    const getAuthorIcon = () => {
        return (
            <svg version='1.1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
                <path
                    d='M458.159,404.216c-18.93-33.65-49.934-71.764-100.409-93.431c-28.868,20.196-63.938,32.087-101.745,32.087
		c-37.828,0-72.898-11.89-101.767-32.087c-50.474,21.667-81.479,59.782-100.398,93.431C28.731,448.848,48.417,512,91.842,512
		c43.426,0,164.164,0,164.164,0s120.726,0,164.153,0C463.583,512,483.269,448.848,458.159,404.216z'
                />
                <path
                    d='M256.005,300.641c74.144,0,134.231-60.108,134.231-134.242v-32.158C390.236,60.108,330.149,0,256.005,0
		c-74.155,0-134.252,60.108-134.252,134.242V166.4C121.753,240.533,181.851,300.641,256.005,300.641z'
                />
            </svg>
        );
    };

    const getThemeIcon = () => {
        return (
            <svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                <path d='M3,8h18c0.6,0,1-0.4,1-1s-0.4-1-1-1H3C2.4,6,2,6.4,2,7S2.4,8,3,8z M13,16H3c-0.6,0-1,0.4-1,1s0.4,1,1,1h10c0.6,0,1-0.4,1-1S13.6,16,13,16z M21,11H3c-0.6,0-1,0.4-1,1s0.4,1,1,1h18c0.6,0,1-0.4,1-1S21.6,11,21,11z' />
            </svg>
        );
    };

    const getElapsedTimeIcon = () => {
        return (
            <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                    d='M12 7V12L14.5 10.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                />
            </svg>
        );
    };

    const baseLink = wasReleased ? `/blog/${id}` : '';

    const trimText = (text: string, maxLength: number): string => {
        if (text.length > maxLength) {
            return `${text.slice(0, maxLength)}...`;
        }

        return text;
    };

    return (
        <Link
            className='blog-card --hidden-overflow-all --flex-column'
            href={`${dictionary['LANGUAGE_LOCALE_URL']}${baseLink}`}
            aria-disabled={!wasReleased}
        >
            <div className='blog-card__thumbnail --hidden-overflow-all'>
                <Image
                    src={`${InternalServices.getBLOB()}/blog/${id}/images/thumbnail.png`}
                    width={1920}
                    height={1080}
                    quality={100}
                    alt={`${title[dictionary['LANGUAGE_LOCALE_URL']]} thumbnail`}
                    priority={true}
                />
            </div>
            <div className='blog-card__info --flex-column --hidden-overflow-all'>
                <TagListing
                    data={[
                        {
                            icon: getAuthorIcon(),
                            text: author,
                        },
                        {
                            icon: getElapsedTimeIcon(),
                            text: StringServices.getLocalizedElapsedDate(
                                dictionary,
                                wasReleased ? new Date(date) : undefined,
                                dictionary['UPCOMING_TEXT'],
                            ),
                        },
                        {
                            icon: getThemeIcon(),
                            text: dictionary[theme],
                        },
                    ]}
                />
                <h4 className='blog-card__info__title --color-ease-in --flex-center'>
                    {trimText(
                        title[dictionary['LANGUAGE_LOCALE_URL']],
                        dictionary['LANGUAGE_LOCALE_URL'].includes('jp') ? 30 : 58,
                    )}
                </h4>
                <span className='blog-card__info__description --color-ease-in'>
                    {trimText(
                        description[dictionary['LANGUAGE_LOCALE_URL']],
                        dictionary['LANGUAGE_LOCALE_URL'].includes('jp') ? 60 : 150,
                    )}
                </span>
            </div>
            <div className='blog-card__info__background --skewd-background' />
        </Link>
    );
}
