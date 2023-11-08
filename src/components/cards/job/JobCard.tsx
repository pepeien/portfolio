import React from 'react';
import { v4 } from 'uuid';

// Types
import { Job } from '../../../utils/interfaces';

// Context
import { LangContext } from '../../../context';

// Components
import JobCardLoader from './JobCard.loader';

export interface JobCardProps extends Job {
    isLoading?: boolean;
}

const JobCard = ({
    startDate,
    endDate,
    company,
    positions,
    description,
    technologies,
    isLoading,
}: JobCardProps) => {
    const [selectedLang, _] = React.useContext(LangContext);

    const getMonthYear = (date?: Date, fallback = ''): string => {
        if (!date) {
            return fallback;
        }

        const month = date.toLocaleDateString(selectedLang['LANGUAGE_LOCALE'], { month: 'long' });
        const year = date.toLocaleDateString(selectedLang['LANGUAGE_LOCALE'], { year: 'numeric' });

        return `${month.charAt(0).toUpperCase()}${month.slice(1)} ${year}`;
    };

    if (isLoading) {
        return <JobCardLoader />;
    }

    return (
        <div className='job-card'>
            <div className='job-card__date'>
                <div className='job-card__date__text'>
                    <span>{getMonthYear(startDate)}</span>
                    <div className='job-card__date__divider' />
                    <span>{getMonthYear(endDate, selectedLang['NOW_TEXT'])}</span>
                </div>
            </div>
            <div className='job-card__info'>
                <div className='job-card__info__company'>{company}</div>
                <div className='job-card__info__description'>
                    {description[selectedLang['LANGUAGE_LOCALE_URL']]}
                </div>
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
