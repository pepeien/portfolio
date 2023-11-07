import { Job } from '../utils/interfaces';

export default [
    {
        startDate: new Date('2021-07-15'),
        company: 'Prodemge',
        positions: ['Developer'],
        description: 'JOB_KUKAC_DESCRIPTION',
        technologies: ['Springboot', 'Java', 'Angular', 'Typescript', 'Mainframe'],
    },
    {
        startDate: new Date('2021-04-15'),
        endDate: new Date('2021-07-15'),
        company: 'Kukac',
        positions: ['Developer Intern'],
        description: 'JOB_PRODEMGE_DESCRIPTION',
        technologies: ['Node JS', 'Angular', 'Typescript', 'IBM Watson'],
    },
] as Job[];
