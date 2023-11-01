// Types
import { Project } from '../utils/interfaces';

export default [
    {
        name: 'Karikariyaki',
        repoURL: 'https://github.com/pepeien/karikariyaki',
        description: `Order status portal for internal fast food management system.`,
        technologies: ['Angular JS', 'Typescript', 'Node JS', 'Socket.IO', 'Mongo DB'],
    },
    {
        name: 'Namah',
        repoURL: 'https://github.com/pepeien/namah',
        description: `Blog/E-commerce mock app.`,
        technologies: ['React JS', 'Typescript', 'Node JS', 'Mongo DB'],
    },
    {
        name: 'Portfolio API',
        repoURL: 'https://github.com/pepeien/portfolio-api',
        description: `NGINX powered reverse proxy, that serves all solutions used in my personal projects, while offering documentation for all services.`,
        technologies: ['Angular JS', 'Typescript', 'Node js', 'NGINX', 'Docker'],
    },
] as Project[];
