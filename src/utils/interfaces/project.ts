export interface Project {
    name: string;
    repo: string;
    description: string;
    technologies: string[];
    metadata?: ProjectMetadata;
}

export interface ProjectMetadata {
    primaryColor: string;
    accentColor: string;
}
