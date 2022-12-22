interface Project {
	name: string;
	repoURL: string;
}

export interface TestableProject extends Project {
	testURL: string;
}

export interface ApiResponse<T> {
	wasSuccessful: boolean;
	result: T | undefined;
}
