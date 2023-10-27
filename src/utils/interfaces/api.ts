interface Project {
    name: string;
    repoURL: string;
    description: string;
}

export interface TestableProject extends Project {
    testURL?: string;
}

export interface TestableProjectResponse {
    testableProjects: TestableProject[];
}

export interface ApiResponse<T> {
    wasSuccessful: boolean;
    result: T | undefined;
}
