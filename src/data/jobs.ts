import { Job } from '../utils/interfaces/api';

export default [
    {
        startDate: new Date('2021-07-15'),
        company: 'PRODEMGE',
        positions: ['Developer'],
        description:
            "Designed and secured government applications using Typescript (Angular/React Native) and Java (Spring Boot). Managed document processing with iText and Apache POI API's. Implemented UI based on client-established patterns.",
        technologies: ['Springboot', 'Java', 'Angular', 'Typescript', 'Mainframe'],
    },
    {
        startDate: new Date('2021-04-15'),
        endDate: new Date('2021-07-15'),
        company: 'Kukac',
        positions: ['Developer Intern'],
        description:
            'Enhanced IBM Watson API-powered applications, focusing on chatbot development. Utilized Typescript (Angular) for front-end and Express for responsive chatbots. Optimized Watson Assistant algorithms and implemented DevOps, including Docker environments with CI/CD.',
        technologies: ['Node JS', 'Angular', 'Typescript', 'IBM Watson'],
    },
] as Job[];
