export interface Job {
    startDate: string;
    endDate?: string;
    company: string;
    positions: string[];
    description: string;
    technologies: string[];
}

export interface Project {
    name: string;
    repoURL: string;
    description: string;
    technologies: string[];
}

export interface ApiResponse<T> {
    wasSuccessful: boolean;
    result: T | undefined;
}
