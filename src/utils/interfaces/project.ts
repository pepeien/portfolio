import { Translations } from './post';

export interface Project {
    name: string;
    repo: string;
    description: Translations;
    technologies: string[];
    metadata?: ProjectMetadata;
}

export interface ProjectMetadata {
    primaryColor: string;
    accentColor: string;
}
