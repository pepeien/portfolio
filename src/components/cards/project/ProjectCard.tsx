import React from 'react';
import { v4 } from 'uuid';

// Context
import { LangContext } from '../../../context';

// Types
import { Project } from '../../../utils/interfaces';

// Components
import ProjectCardLoader from './ProjectCard.loader';

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
        return <ProjectCardLoader />;
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
