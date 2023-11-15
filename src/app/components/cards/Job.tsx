import React from 'react';
import { v4 } from 'uuid';

// Types
import { Dictionary, Job, JobDictionary, PersonalDictionary } from '@utils/interfaces';

export type DateDirection = 'normal' | 'inverse';

export interface JobCardProps extends Job {
    dictionary: Dictionary;
    personalDictionary: JobDictionary;
}

export default function JobCard({
    startDate,
    endDate,
    company,
    positions,
    technologies,
    dictionary,
    personalDictionary,
}: JobCardProps) {
    const direction = dictionary['JOB_HISTORY_DATE_DIRECTION'];

    const getMonthYear = (date?: Date, direction = 'normal', fallback = ''): string => {
        if (!date || !date.toLocaleDateString) {
            return fallback;
        }

        const month = date.toLocaleDateString(dictionary['LANGUAGE_LOCALE_DATE'], {
            month: 'long',
        });
        const year = date.toLocaleDateString(dictionary['LANGUAGE_LOCALE_DATE'], {
            year: 'numeric',
        });

        if (direction === 'normal') {
            return `${month.charAt(0).toUpperCase()}${month.slice(1)} ${year}`;
        }

        return `${year} ${month.charAt(0).toUpperCase()}${month.slice(1)}`;
    };

    return (
        <div className='job-card'>
            <div className='job-card__date'>
                <div className='job-card__date__text'>
                    <span>{getMonthYear(startDate, direction)}</span>
                    <div className='job-card__date__divider' />
                    <span>{getMonthYear(endDate, direction, dictionary['NOW_TEXT'])}</span>
                </div>
            </div>
            <div className='job-card__info'>
                <div className='job-card__info__company'>{company}</div>
                <div className='job-card__info__description'>{personalDictionary.description}</div>
                <ul className='job-card__info__technologies'>
                    {technologies.map((technology) => {
                        return <li key={v4()}>{technology}</li>;
                    })}
                </ul>
            </div>
        </div>
    );
}
