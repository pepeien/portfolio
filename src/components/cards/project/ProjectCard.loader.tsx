import React from 'react';
import ContentLoader from 'react-content-loader';

const ProjectCardLoader = () => {
    return (
        <div className='project-card' data-is-loading={true} data-is-showing-info={false}>
            <div className='project-card__data'>
                <h5>
                    <ContentLoader speed={3} backgroundColor='#36383c' foregroundColor='#4f5a61'>
                        <rect rx='3' ry='3' width='100%' height='100%' />
                    </ContentLoader>
                </h5>
                <ul>
                    <li>
                        <ContentLoader
                            speed={2}
                            backgroundColor='#36383c'
                            foregroundColor='#4f5a61'
                        >
                            <rect rx='3' ry='3' width='100%' height='100%' />
                        </ContentLoader>
                    </li>
                    <li>
                        <ContentLoader
                            speed={2}
                            backgroundColor='#36383c'
                            foregroundColor='#4f5a61'
                        >
                            <rect rx='3' ry='3' width='100%' height='100%' />
                        </ContentLoader>
                    </li>
                    <li>
                        <ContentLoader
                            speed={2}
                            backgroundColor='#36383c'
                            foregroundColor='#4f5a61'
                        >
                            <rect rx='3' ry='3' width='100%' height='100%' />
                        </ContentLoader>
                    </li>
                </ul>
                <span>
                    <ContentLoader speed={2} backgroundColor='#36383c' foregroundColor='#4f5a61'>
                        <rect rx='3' ry='3' width='100%' height='100%' />
                    </ContentLoader>
                </span>
            </div>
        </div>
    );
};

export default ProjectCardLoader;
