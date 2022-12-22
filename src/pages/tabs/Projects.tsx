import React from 'react';
import { Carousel } from 'react-responsive-carousel';

//Components
import { ProjectCard } from '../../components';
import { TestableProject } from '../../utils/interfaces';
import { fetchFromApi } from '../../utils/services/api';

//Styles
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const ProjectsTab = () => {
	const [projects, setProjects] = React.useState<TestableProject[]>([
		{
			name: 'namah',
			repoURL: 'https://github.com/ericodesu/namah',
			testURL: 'https://ericodesu.github.io/namah',
		},
		{
			name: 'portfolio',
			repoURL: 'https://github.com/ericodesu/portfolio',
			testURL: 'https://ericodesu.com',
		},
		{
			name: 'portfolio-api',
			repoURL: 'https://github.com/ericodesu/portfolio-api',
			testURL: 'https://api.ericodesu.com',
		},
	]);

	React.useEffect(() => {
		fetchFromApi<TestableProject[]>('/testable')
			.then((response) => {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
				if (!response.wasSuccessful) {
					return;
				}

				if (response.result) {
					setProjects(response.result);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<div className='projects'>
			<Carousel
				centerMode={true}
				showIndicators={true}
				swipeable={true}
				centerSlidePercentage={100}
				showThumbs={false}
				showArrows={false}
				showStatus={false}
			>
				{projects.map((project) => {
					return (
						<ProjectCard
							key={project.name}
							name={project.name}
							repoURL={project.repoURL}
							testURL={project.name !== 'portfolio' ? project.testURL : undefined}
							thumbnailURL={`${project.repoURL}/blob/master/.github/images/project-thumbnail.png?raw=true`}
						/>
					);
				})}
			</Carousel>
		</div>
	);
};

export default ProjectsTab;
