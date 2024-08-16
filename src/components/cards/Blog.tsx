import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

// Type
import { Dictionary, Blog } from '@utils/interfaces';

// Services
import { InternalServices, StringServices } from '@utils/services';

// Pages
import { Blog as BlogPage } from '@pages';

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
                            icon: BlogPage.getAuthorIcon(),
                            text: author,
                        },
                        {
                            icon: BlogPage.getElapsedTimeIcon(),
                            text: StringServices.getLocalizedElapsedDate(
                                dictionary,
                                wasReleased ? new Date(date) : undefined,
                                dictionary['UPCOMING_TEXT'],
                            ),
                        },
                        {
                            icon: BlogPage.getThemeIcon(),
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
