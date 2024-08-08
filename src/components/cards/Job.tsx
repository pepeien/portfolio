import React from 'react';

// Types
import { Dictionary, Job } from '@utils/interfaces';

// Services
import { StringServices } from '@utils/services';

// Components
import { TagListing } from '@components';

export type DateDirection = 'normal' | 'inverse';

export interface Props extends Job {
    dictionary: Dictionary;
    inCurrentJob?: boolean;
}

export default function Component({
    startDate,
    endDate,
    company,
    technologies,
    description,
    dictionary,
    inCurrentJob = false,
}: Props) {
    const direction = dictionary['JOB_HISTORY_DATE_DIRECTION'];
    const localizedStartDate = StringServices.getLocalizedDate(dictionary, startDate, direction);
    const localizedEndDate = StringServices.getLocalizedDate(
        dictionary,
        endDate,
        direction,
        dictionary['NOW_TEXT'],
    );

    return (
        <div className='job-card' data-is-current={inCurrentJob}>
            <div className='job-card__header --flex-row'>
                <div className='job-card__header__title'>{company}</div>
                <div className='job-card__header__date --flex-row'>
                    <span>{localizedStartDate}</span>
                    <div className='job-card__header__date__divider' />
                    <span>{localizedEndDate}</span>
                </div>
            </div>
            <div className='job-card__info'>
                <div className='job-card__info__description'>
                    {description[dictionary['LANGUAGE_LOCALE_URL']]}
                </div>
                <TagListing
                    data={technologies.map((_item) => ({
                        text: _item,
                    }))}
                />
            </div>
        </div>
    );
}
