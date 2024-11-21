import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Types
import { Dictionary, Project, Tag } from '@utils/interfaces';

// Services
import { InternalServices } from '@utils/services';
import { TagListing } from '@components';

export interface Props extends Project {
    dictionary: Dictionary;
}

export default function Component({
    name,
    link,
    description,
    dictionary,
    repo,
    technologies,
}: Props) {
    return (
        <Link
            className='project-card --flex-column --hidden-overflow-all --color-ease-in'
            href={link}
            target='_blank'
            rel='noreferrer'
        >
            <Image
                className='project-card__thumbnail'
                src={`${InternalServices.getGitBLOB()}/${repo}/refs/heads/master/.github/images/project-thumbnail.png`}
                width={1920}
                height={1080}
                quality={100}
                alt={`${name} project thumbnail`}
                priority={true}
            />
            <h4 className='project-card__title'>{name}</h4>
            <TagListing
                className='project-card__tags'
                data={technologies.map((technology) => {
                    return { text: technology } as Tag;
                })}
            />
            <div className='project-card__description'>
                <span>{description[dictionary['LANGUAGE_LOCALE_URL']]}</span>
                <svg
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    strokeWidth='1'
                    strokeLinecap='round'
                    strokeLinejoin='miter'
                >
                    <polyline points='20 13 20 22 2 22 2 4 11 4'></polyline>
                    <polyline points='16 2 22 2 22 8'></polyline>
                    <line x1='12' y1='12' x2='21.6' y2='2.4'></line>
                </svg>
            </div>
            <div className='project-card__background --skewd-background' />
        </Link>
    );
}
