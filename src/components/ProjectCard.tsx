import React from 'react';
import ContentLoader from 'react-content-loader';

// Context
import { LangContext } from '../context';

export interface ProjectCardProps {
    name: string;
    repoURL: string;
    thumbnailURL: string;
    description: string;
    testURL?: string;
    isLoading?: boolean;
}

const ProjectCard = ({
    name,
    repoURL,
    thumbnailURL,
    description,
    testURL,
    isLoading,
}: ProjectCardProps) => {
    const [selectedLang, _] = React.useContext(LangContext);

    const [isViewingInfo, setIsViewingInfo] = React.useState<boolean>(false);
    const [isFirstRender, setIsFirstRender] = React.useState<boolean>(true);

    const toPascalCase = (text: string) => {
        return text.replace(/(^\w|-\w)/g, clearAndUpper);
    };

    const clearAndUpper = (text: string) => {
        return text.replace(/-/, ' ').toUpperCase();
    };

    const getInfoSVG = () => {
        return (
            <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path d='M12 17.75C12.4142 17.75 12.75 17.4142 12.75 17V11C12.75 10.5858 12.4142 10.25 12 10.25C11.5858 10.25 11.25 10.5858 11.25 11V17C11.25 17.4142 11.5858 17.75 12 17.75Z' />
                <path d='M12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8C11 7.44772 11.4477 7 12 7Z' />
                <path d='M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12ZM12 2.75C6.89137 2.75 2.75 6.89137 2.75 12C2.75 17.1086 6.89137 21.25 12 21.25C17.1086 21.25 21.25 17.1086 21.25 12C21.25 6.89137 17.1086 2.75 12 2.75Z' />
            </svg>
        );
    };

    if (isLoading) {
        return (
            <div className='project-card' data-is-loading={true} data-is-showing-info={false}>
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
        <div
            className='project-card'
            data-is-showing-info={isFirstRender ? 'disabled' : isViewingInfo}
        >
            <div className='project-card__info'>
                <button
                    onClick={() => {
                        setIsViewingInfo(!isViewingInfo);
                        setIsFirstRender(false);
                    }}
                >
                    {getInfoSVG()}
                </button>
                <div className={isViewingInfo ? '--descend-in-reverse' : '--descend-out'}>
                    <h2>{toPascalCase(name)}</h2>
                    <p>{description}</p>
                </div>
            </div>
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
