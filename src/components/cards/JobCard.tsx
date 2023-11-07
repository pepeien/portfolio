import React from 'react';
import { v4 } from 'uuid';

// Types
import { Job } from '../../utils/interfaces';

// Context
import { LangContext } from '../../context';

const JobCard = ({ startDate, endDate, company, positions, description, technologies }: Job) => {
    const [selectedLang, _] = React.useContext(LangContext);

    const getMonthYear = (date?: Date, fallback = ''): string => {
        if (!date) {
            return fallback;
        }

        const month = date.toLocaleDateString(selectedLang['LANGUAGE_LOCALE'], { month: 'long' });
        const year = date.toLocaleDateString(selectedLang['LANGUAGE_LOCALE'], { year: 'numeric' });

        return `${month.charAt(0).toUpperCase()}${month.slice(1)} ${year}`;
    };

    return (
        <div className='job'>
            <div className='job__date'>
                <div className='job__date__text'>
                    <span>{getMonthYear(startDate)}</span>
                    <div className='job__date__divider' />
                    <span>{getMonthYear(endDate, selectedLang['NOW_TEXT'])}</span>
                </div>
            </div>
            <div className='job__info'>
                <div className='job__info__company'>{company}</div>
                <div className='job__info__description'>{selectedLang[description]}</div>
                <ul className='job__info__technologies'>
                    {technologies.map((technology) => {
                        return <li key={v4()}>{technology}</li>;
                    })}
                </ul>
            </div>
        </div>
    );
};

export default JobCard;
