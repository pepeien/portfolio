import React from 'react';
import { Carousel } from 'react-responsive-carousel';

//Components
import { ProjectCard } from '../../components';
import { TestableProject, TestableProjectResponse } from '../../utils/interfaces';
import { fetchFromApi } from '../../utils/services/api';

//Styles
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const ProjectsTab = () => {
	const [projects, setProjects] = React.useState<TestableProject[]>([]);

	React.useEffect(() => {
		fetchFromApi<TestableProjectResponse>('/testable')
			.then((response) => {
				if (!response.wasSuccessful || !response.result || !response.result.testableProjects) {
					return;
				}

				setProjects(response.result.testableProjects);
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
				{projects.length === 0
					? Array(3)
							.fill(0)
							.map(() => {
								return (
									<ProjectCard
										key={''}
										name={''}
										repoURL={''}
										testURL={''}
										thumbnailURL={''}
										isLoading={true}
									/>
								);
							})
					: projects.map((project) => {
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
