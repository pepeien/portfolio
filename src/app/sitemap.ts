import { MetadataRoute } from 'next';

// Services
import { getDeploymentURL } from '@utils/services/api';

export default function sitemap(): MetadataRoute.Sitemap {
    const deploymentURL = getDeploymentURL().toString();

    return [
        {
            url: deploymentURL,
            lastModified: '2023-11-11',
            changeFrequency: 'yearly',
            priority: 1,
        },
        {
            url: `${deploymentURL}/blog`,
            lastModified: '2023-11-12',
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${deploymentURL}/resume`,
            lastModified: '2023-11-12',
            changeFrequency: 'yearly',
            priority: 0.5,
        },
    ];
}
