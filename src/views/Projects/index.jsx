import React from 'react';
import {useSelector} from 'react-redux';

//Styles
import './projects.scss';
import '../pages.scss';

//Language library
import {projects} from '../../language/lib';

function Projects (){
  const  currentPageLanguage = useSelector(state => state.pageLanguage);
  const pageText = projects[currentPageLanguage];

  return (
    <article id="projects"> 
      <div className="title">{pageText[0]}</div>
      <div className="container --spaced-flex">
        <div className="project">
          <div className="project__image --efrederickcli"/>
          <div className="project__description">
            <div className="project__title">eFrederick CLI</div>
            <div className="project__outside">
              <a 
                className="project__button" 
                href="https://pepeyen.github.io/efrederick-cli/" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                {pageText[1]}
              </a>
              <a 
                className="project__button" 
                href="https://github.com/pepeyen/efrederick-cli/" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                {pageText[2]}
              </a>
            </div>
          </div>
        </div>
        <div className="project">
          <div className="project__image --cstech"/>
          <div className="project__description">
            <div className="project__title">CS Tech</div>
            <div className="project__outside">
              <a 
                className="project__button" 
                href="https://pepeyen.github.io/cs-tech/" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                {pageText[1]}
              </a>
              <a 
                className="project__button" 
                href="https://github.com/pepeyen/cs-tech/" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                {pageText[2]}
              </a>
            </div>
          </div>  
        </div>
        <div className="project">
          <div className="project__image --efrederick"/>
          <div className="project__description">
            <div className="project__title">eFrederick</div>
            <div className="project__outside">
              <a 
                className="project__button" 
                href="https://efrederick.dev/" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                {pageText[1]}
              </a>
              <a 
                className="project__button" 
                href="https://github.com/pepeyen/efrederick/" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                {pageText[2]}
              </a>
            </div>
          </div> 
        </div>
      </div>
    </article>
  );
}

export default Projects;