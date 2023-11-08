import React from 'react';
import ContentLoader from 'react-content-loader';
import { v4 } from 'uuid';

const MIN_TECHNOLOGY_COUNT = 3;

const ProjectCardLoader = () => {
    return (
        <div className='project-card' data-is-loading={true}>
            <div className='project-card__data'>
                <div className='project-card__data__info'>
                    <h5>
                        <ContentLoader
                            speed={2}
                            backgroundColor='#36383c'
                            foregroundColor='#4f5a61'
                        >
                            <rect rx='3' ry='3' width='100%' height='100%' />
                        </ContentLoader>
                    </h5>
                    <ul>
                        {new Array(MIN_TECHNOLOGY_COUNT).fill({}).map(() => {
                            return (
                                <li key={v4()}>
                                    <ContentLoader
                                        speed={2}
                                        backgroundColor='#36383c'
                                        foregroundColor='#4f5a61'
                                    >
                                        <rect rx='3' ry='3' width='100%' height='100%' />
                                    </ContentLoader>
                                </li>
                            );
                        })}
                    </ul>
                    <span>
                        <ContentLoader
                            speed={2}
                            backgroundColor='#36383c'
                            foregroundColor='#4f5a61'
                        >
                            <rect rx='3' ry='3' width='100%' height='100%' />
                        </ContentLoader>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ProjectCardLoader;
