export interface JobDictionary {
    description: string;
}

export interface BlogDictionary {
    title: string;
    description: string;
}

export interface ProjectDictionary {
    description: string;
}

export interface PersonalDictionary {
    jobs: { [key: string]: JobDictionary };
    blog: { [key: string]: BlogDictionary };
    projects: { [key: string]: ProjectDictionary };
}

export interface Dictionary {
    [key: string]: string;
}
