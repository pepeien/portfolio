export interface ProjectIdentity {
    primaryColor: string;
    accentColor: string;
}

export interface Project {
    name: string;
    repo: string;
    technologies: string[];
    identity?: ProjectIdentity;
}
