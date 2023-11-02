export interface Job {
    startDate: Date;
    endDate?: Date;
    company: string;
    positions: string[];
    description: string;
    technologies: string[];
}

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

export interface ApiResponse<T> {
    wasSuccessful: boolean;
    result: T | undefined;
}
