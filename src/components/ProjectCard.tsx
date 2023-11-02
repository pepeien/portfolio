import React from 'react';
import ContentLoader from 'react-content-loader';

// Context
import { LangContext } from '../context';

// Types
import { Project } from '../utils/interfaces';
import { v4 } from 'uuid';

export interface ProjectCardProps extends Project {
    isLoading?: boolean;
}

const ProjectCard = ({
    name,
    description,
    technologies,
    metadata,
    isLoading,
}: ProjectCardProps) => {
    const [selectedLang, _] = React.useContext(LangContext);

    if (isLoading) {
        return (
            <div className='project-card' data-is-loading={true} data-is-showing-info={false}>
                <div className='project-card__data'>
                    <h5>
                        <ContentLoader
                            speed={3}
                            backgroundColor='#36383c'
                            foregroundColor='#4f5a61'
                        >
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
            style={{
                backgroundColor: metadata?.primaryColor,
                color: metadata?.accentColor,
            }}
        >
            <div className='project-card__data'>
                <h5>{name}</h5>
                <ul>
                    {technologies.map((technology) => {
                        return (
                            <li
                                key={v4()}
                                style={{
                                    color: metadata?.primaryColor,
                                    backgroundColor: metadata?.accentColor,
                                }}
                            >
                                {technology}
                            </li>
                        );
                    })}
                </ul>
                <span>{selectedLang[description]}</span>
            </div>
        </div>
    );
};

export default ProjectCard;
