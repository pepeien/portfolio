import { Translations } from './post';

export interface Job {
    startDate: Date;
    endDate?: Date;
    company: string;
    positions: string[];
    description: Translations;
    technologies: string[];
}
