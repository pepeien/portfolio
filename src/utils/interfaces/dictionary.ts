export interface JobDictionary {
    description: string;
}

export interface PostDictionary {
    title: string;
    description: string;
}

export interface ProjectDictionary {
    description: string;
}

export interface PersonalDictionary {
    jobs: JobDictionary[];
    posts: { [key: string]: PostDictionary };
    projects: { [key: string]: ProjectDictionary };
}

export interface Dictionary {
    [key: string]: string;
}
