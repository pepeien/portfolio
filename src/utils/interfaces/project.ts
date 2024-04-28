// Types
import { Dictionary } from '.';

export interface ProjectIdentity {
    primaryColor: string;
    accentColor: string;
}

export interface Project {
    name: string;
    repo: string;
    link: string;
    technologies: string[];
    description: Dictionary;
    identity?: ProjectIdentity;
}
