'use client';

import React from 'react';
import { v4 } from 'uuid';

// Types
import { Job } from '@utils/interfaces';

export type DateDirection = 'normal' | 'inverse';

export interface JobCardProps extends Job {
    direction: string;
}

const JobCard = ({
    startDate,
    endDate,
    company,
    positions,
    technologies,
    direction,
}: JobCardProps) => {
    const getMonthYear = (date?: Date, direction = 'normal', fallback = ''): string => {
        if (!date || !date.toLocaleDateString) {
            return fallback;
        }

        const month = date.toLocaleDateString('LANGUAGE_LOCALE_DATE', { month: 'long' });
        const year = date.toLocaleDateString('LANGUAGE_LOCALE_DATE', { year: 'numeric' });

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
                    <span>{getMonthYear(endDate, direction, 'NOW_TEXT')}</span>
                </div>
            </div>
            <div className='job-card__info'>
                <div className='job-card__info__company'>{company}</div>
                <div className='job-card__info__description'></div>
                <ul className='job-card__info__technologies'>
                    {technologies.map((technology) => {
                        return <li key={v4()}>{technology}</li>;
                    })}
                </ul>
            </div>
        </div>
    );
};

export default JobCard;
