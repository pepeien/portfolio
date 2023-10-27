import React from 'react';
import { Carousel } from 'react-responsive-carousel';

//Consts
import Projects from '../../projects';

//Components
import { ProjectCard } from '../../components';
//Styles
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const ProjectsTab = () => {
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
                {Projects.length === 0
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
                                      description={''}
                                      isLoading={true}
                                  />
                              );
                          })
                    : Projects.map((project) => {
                          return (
                              <ProjectCard
                                  key={project.name}
                                  name={project.name}
                                  repoURL={project.repoURL}
                                  testURL={
                                      project.name !== 'portfolio'
                                          ? project.testURL ?? undefined
                                          : undefined
                                  }
                                  thumbnailURL={`${project.repoURL}/blob/master/.github/images/project-thumbnail.png?raw=true`}
                                  description={project.description ?? ''}
                              />
                          );
                      })}
            </Carousel>
        </div>
    );
};

export default ProjectsTab;
