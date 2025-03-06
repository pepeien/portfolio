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
            <div className='project-card__thumbnail --hidden-overflow-all'>
                <Image
                    src={`${InternalServices.getGitBLOB()}/${repo}/refs/heads/master/.github/images/project-thumbnail.png`}
                    width={1920}
                    height={1080}
                    quality={100}
                    alt={`${name} project thumbnail`}
                    priority={true}
                />
            </div>
            <div className='project-card__info --flex-column --hidden-overflow-all'>
                <h4 className='project-card__info__title --color-ease-in'>{name}</h4>
                <TagListing
                    data={technologies.map((technology) => {
                        return { text: technology } as Tag;
                    })}
                />
                <span className='project-card__info__description --color-ease-in'>
                    {description[dictionary['LANGUAGE_LOCALE_URL']]}
                </span>
            </div>
            <div className='project-card__background --skewd-background' />
        </Link>
    );
}
