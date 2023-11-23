import React from 'react';
import { v4 } from 'uuid';

// Types
import { Dictionary, Job, JobDictionary } from '@utils/interfaces';

// Services
import { InternalServices } from '@utils/services';

// Components
import { JobCard } from '@components';

export interface Props {
    dictionary: Dictionary;
    personalDictionary: { [key: string]: JobDictionary };
}

const MAX_SHOWCASE_COUNT = 3;

export default async function Component({ dictionary, personalDictionary }: Props) {
    const data = await fetch(`${InternalServices.getBLOB()}/jobs/metadata.json`, {
        next: { revalidate: InternalServices.getFetchInterval() },
    })
        .then((_res) => _res.json())
        .then((_jobs: Job[]) =>
            _jobs.slice(0, MAX_SHOWCASE_COUNT).map(
                (_job) =>
                    ({
                        ..._job,
                        startDate: _job.startDate ? new Date(_job.startDate) : new Date(),
                        endDate: _job.endDate ? new Date(_job.endDate) : undefined,
                    }) as Job,
            ),
        )
        .catch(() => [] as Job[]);

    const latestJob = data[0];

    return (
        <div className='jobs'>
            <JobCard
                {...latestJob}
                dictionary={dictionary}
                personalDictionary={personalDictionary[latestJob.company]}
                type='showcase'
            />
            <ul>
                {data.slice(1).map((_item) => (
                    <li key={v4()}>
                        <JobCard
                            {..._item}
                            dictionary={dictionary}
                            personalDictionary={personalDictionary[_item.company]}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}
