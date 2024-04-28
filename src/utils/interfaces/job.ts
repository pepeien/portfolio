// Types
import { Dictionary } from '.';

export interface Job {
    startDate: Date;
    endDate?: Date;
    company: string;
    positions: string[];
    technologies: string[];
    description: Dictionary;
}
