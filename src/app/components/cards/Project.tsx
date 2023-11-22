import React from 'react';
import Image from 'next/image';

// Types
import { Project, ProjectDictionary, ProjectIdentity, Tag } from '@utils/interfaces';

// Services
import { InternalServices } from '@utils/services';
import { TagListing } from '@components';

export interface Props extends Project {
    personalDictionary: ProjectDictionary;
}

export default async function Component({ name, repo, technologies, personalDictionary }: Props) {
    const repoCdnURL = `${InternalServices.getGitBLOB()}/${repo}/master/.github`;

    const identity: ProjectIdentity = await fetch(`${repoCdnURL}/metadata.json?raw=true`, {
        next: { revalidate: InternalServices.getFetchInterval() },
    })
        .then((_res) => _res.json())
        .catch(() => {});

    return (
        <a
            className='project-card --flex-column --hoverable'
            style={{
                backgroundColor: identity?.primaryColor,
                color: identity?.accentColor,
            }}
            href={`${process.env.NEXT_PUBLIC_GIT_URL ?? ''}/${repo}`}
            target='_blank'
            rel='noreferrer'
        >
            <div className='project-card__wrapper'>
                <div className='project-card__header'>
                    <h5>{name}</h5>
                    <TagListing
                        data={technologies.map(
                            (_item) =>
                                ({
                                    text: _item,
                                    backgroundColor: identity.accentColor,
                                    accentColor: identity.primaryColor,
                                }) as Tag,
                        )}
                    />
                </div>
                <div className='project-card__description'>
                    <div
                        className='project-card__description__background --behind'
                        style={{
                            left: `-${Math.max(Math.random() * 100, 22)}vh`,
                        }}
                    >
                        <svg
                            viewBox='0 0 1440 420'
                            version='1.1'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path
                                fill={identity?.accentColor}
                                d='M0,168L60,147C120,126,240,84,360,105C480,126,600,210,720,217C840,224,960,154,1080,112C1200,70,1320,56,1440,77C1560,98,1680,154,1800,182C1920,210,2040,210,2160,175C2280,140,2400,70,2520,70C2640,70,2760,140,2880,147C3000,154,3120,98,3240,84C3360,70,3480,98,3600,119C3720,140,3840,154,3960,147C4080,140,4200,112,4320,91C4440,70,4560,56,4680,98C4800,140,4920,238,5040,252C5160,266,5280,196,5400,140C5520,84,5640,42,5760,28C5880,14,6000,28,6120,42C6240,56,6360,70,6480,126C6600,182,6720,280,6840,266C6960,252,7080,126,7200,119C7320,112,7440,224,7560,259C7680,294,7800,252,7920,231C8040,210,8160,210,8280,203C8400,196,8520,182,8580,175L8640,168L8640,420L8580,420C8520,420,8400,420,8280,420C8160,420,8040,420,7920,420C7800,420,7680,420,7560,420C7440,420,7320,420,7200,420C7080,420,6960,420,6840,420C6720,420,6600,420,6480,420C6360,420,6240,420,6120,420C6000,420,5880,420,5760,420C5640,420,5520,420,5400,420C5280,420,5160,420,5040,420C4920,420,4800,420,4680,420C4560,420,4440,420,4320,420C4200,420,4080,420,3960,420C3840,420,3720,420,3600,420C3480,420,3360,420,3240,420C3120,420,3000,420,2880,420C2760,420,2640,420,2520,420C2400,420,2280,420,2160,420C2040,420,1920,420,1800,420C1680,420,1560,420,1440,420C1320,420,1200,420,1080,420C960,420,840,420,720,420C600,420,480,420,360,420C240,420,120,420,60,420L0,420Z'
                            ></path>
                        </svg>
                    </div>
                    <div
                        className='project-card__description__background'
                        style={{
                            left: `-${Math.max(Math.random() * 100, 22)}vh`,
                        }}
                    >
                        <svg
                            viewBox='0 0 1440 420'
                            version='1.1'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path
                                fill={identity?.accentColor}
                                d='M0,168L60,147C120,126,240,84,360,105C480,126,600,210,720,217C840,224,960,154,1080,112C1200,70,1320,56,1440,77C1560,98,1680,154,1800,182C1920,210,2040,210,2160,175C2280,140,2400,70,2520,70C2640,70,2760,140,2880,147C3000,154,3120,98,3240,84C3360,70,3480,98,3600,119C3720,140,3840,154,3960,147C4080,140,4200,112,4320,91C4440,70,4560,56,4680,98C4800,140,4920,238,5040,252C5160,266,5280,196,5400,140C5520,84,5640,42,5760,28C5880,14,6000,28,6120,42C6240,56,6360,70,6480,126C6600,182,6720,280,6840,266C6960,252,7080,126,7200,119C7320,112,7440,224,7560,259C7680,294,7800,252,7920,231C8040,210,8160,210,8280,203C8400,196,8520,182,8580,175L8640,168L8640,420L8580,420C8520,420,8400,420,8280,420C8160,420,8040,420,7920,420C7800,420,7680,420,7560,420C7440,420,7320,420,7200,420C7080,420,6960,420,6840,420C6720,420,6600,420,6480,420C6360,420,6240,420,6120,420C6000,420,5880,420,5760,420C5640,420,5520,420,5400,420C5280,420,5160,420,5040,420C4920,420,4800,420,4680,420C4560,420,4440,420,4320,420C4200,420,4080,420,3960,420C3840,420,3720,420,3600,420C3480,420,3360,420,3240,420C3120,420,3000,420,2880,420C2760,420,2640,420,2520,420C2400,420,2280,420,2160,420C2040,420,1920,420,1800,420C1680,420,1560,420,1440,420C1320,420,1200,420,1080,420C960,420,840,420,720,420C600,420,480,420,360,420C240,420,120,420,60,420L0,420Z'
                            ></path>
                        </svg>
                    </div>
                    <span style={{ color: identity.primaryColor }}>
                        {personalDictionary.description}
                    </span>
                </div>
                <div className='project-card__arrow'>
                    <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path
                            d='M20 4L12 12M20 4V8.5M20 4H15.5M19 12.5V16.8C19 17.9201 19 18.4802 18.782 18.908C18.5903 19.2843 18.2843 19.5903 17.908 19.782C17.4802 20 16.9201 20 15.8 20H7.2C6.0799 20 5.51984 20 5.09202 19.782C4.71569 19.5903 4.40973 19.2843 4.21799 18.908C4 18.4802 4 17.9201 4 16.8V8.2C4 7.0799 4 6.51984 4.21799 6.09202C4.40973 5.71569 4.71569 5.40973 5.09202 5.21799C5.51984 5 6.07989 5 7.2 5H11.5'
                            style={{ stroke: identity.primaryColor }}
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        />
                    </svg>
                </div>
            </div>
        </a>
    );
}
