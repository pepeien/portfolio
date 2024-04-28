// Types
import { Dictionary } from '.';

export interface Blog {
    id: string;
    author: string;
    theme: string;
    date: string;
    status: 'RELEASED' | 'UPCOMING';
    title: Dictionary;
    description: Dictionary;
}
