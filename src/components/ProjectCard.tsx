import React from 'react';
import ContentLoader from 'react-content-loader';

// Context
import { LangContext } from '../context';

export interface ProjectCardProps {
    name: string;
    repoURL: string;
    thumbnailURL: string;
    testURL?: string;
    isLoading?: boolean;
}

const ProjectCard = ({ name, repoURL, thumbnailURL, testURL, isLoading }: ProjectCardProps) => {
    const [selectedLang, _] = React.useContext(LangContext);

    const toPascalCase = (text: string) => {
        return text.replace(/(^\w|-\w)/g, clearAndUpper);
    };

    const clearAndUpper = (text: string) => {
        return text.replace(/-/, ' ').toUpperCase();
    };

    if (isLoading) {
        return (
            <div className='project-card' data-is-loading={true}>
                <div className='project-card__thumbnail'>
                    <ContentLoader speed={2} backgroundColor='#36383c' foregroundColor='#4f5a61'>
                        <rect rx='3' ry='3' width='100%' height='100%' />
                    </ContentLoader>
                </div>
                <span className='project-card__name'>
                    <span>
                        <ContentLoader
                            speed={3}
                            backgroundColor='#36383c'
                            foregroundColor='#4f5a61'
                        >
                            <rect rx='3' ry='3' width='100%' height='100%' />
                        </ContentLoader>
                    </span>
                </span>
                <div className='project-card__linkers'>
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
        );
    }

    return (
        <div className='project-card'>
            <div
                className='project-card__thumbnail'
                style={{ backgroundImage: `url(${thumbnailURL})` }}
            ></div>
            <span className='project-card__name'>{toPascalCase(name)}</span>
            <div className='project-card__linkers'>
                <a href={repoURL} target='_blank' rel='noreferrer'>
                    {selectedLang['PROJECTS_CODE']}
                </a>
                <a
                    href={testURL}
                    target='_blank'
                    rel='noreferrer'
                    data-is-disabled={testURL === undefined}
                >
                    {selectedLang['PROJECTS_LIVE_DEMO']}
                </a>
            </div>
        </div>
    );
};

export default ProjectCard;
