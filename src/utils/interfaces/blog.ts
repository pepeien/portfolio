// Types
import { Dictionary } from '.';

export interface Blog {
    id: string;
    author: string;
    theme: string;
    date: string;
    updateDate?: string;
    status: 'RELEASED' | 'UPCOMING';
    title: Dictionary;
    description: Dictionary;
}
