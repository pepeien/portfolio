import { MetadataRoute } from 'next';

// Services
import { InternalServices } from '@utils/services';

export default function sitemap(): MetadataRoute.Sitemap {
    const deploymentURL = InternalServices.getDeploymentURL().toString();
    const now = new Date();

    return [
        {
            url: deploymentURL,
            lastModified: now,
            changeFrequency: 'yearly',
            priority: 1,
        },
        {
            url: `${deploymentURL}/blog`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${deploymentURL}/resume`,
            lastModified: now,
            changeFrequency: 'yearly',
            priority: 0.5,
        },
    ];
}
