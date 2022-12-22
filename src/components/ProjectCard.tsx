import React from 'react';

// Context
import { LangContext } from '../context';

export interface ProjectCardProps {
	name: string;
	repoURL: string;
	testURL?: string;
	thumbnailURL: string;
}

const ProjectCard = ({ name, repoURL, testURL, thumbnailURL }: ProjectCardProps) => {
	const [selectedLang, _] = React.useContext(LangContext);

	const toPascalCase = (text: string) => {
		return text.replace(/(^\w|-\w)/g, clearAndUpper);
	};

	const clearAndUpper = (text: string) => {
		return text.replace(/-/, ' ').toUpperCase();
	};

	return (
		<div className='project-card'>
			<div className='project-card__thumbnail' style={{ backgroundImage: `url(${thumbnailURL})` }}></div>
			<span className='project-card__name'>{toPascalCase(name)}</span>
			<div className='project-card__linkers'>
				<a href={repoURL} target='_blank' rel='noreferrer'>
					{selectedLang['PROJECTS_CODE']}
				</a>
				<a href={testURL} target='_blank' rel='noreferrer' data-is-disabled={testURL === undefined}>
					{selectedLang['PROJECTS_LIVE_DEMO']}
				</a>
			</div>
		</div>
	);
};

export default ProjectCard;
