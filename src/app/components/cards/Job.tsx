import React from 'react';
import { v4 } from 'uuid';

// Types
import { Dictionary, Job, JobDictionary, PersonalDictionary } from '@utils/interfaces';
import { StringServices } from '@utils/services';
import { TagListing } from '@components';

export type DateDirection = 'normal' | 'inverse';

export interface Props extends Job {
    dictionary: Dictionary;
    personalDictionary: JobDictionary;
}

export default function Component({
    startDate,
    endDate,
    company,
    positions,
    technologies,
    dictionary,
    personalDictionary,
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
        <div className='job-card'>
            <div className='job-card__date'>
                <div className='job-card__date__text'>
                    <span>{localizedStartDate}</span>
                    <div className='job-card__date__divider' />
                    <span>{localizedEndDate}</span>
                </div>
            </div>
            <div className='job-card__info --shadowed'>
                <div className='job-card__info__company'>{company}</div>
                <div className='job-card__info__description'>{personalDictionary.description}</div>
                <TagListing
                    data={technologies.map((_item) => ({
                        text: _item,
                    }))}
                />
            </div>
        </div>
    );
}
