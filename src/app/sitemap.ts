import { MetadataRoute } from 'next';

// Types
import { Blog } from '@utils/interfaces';

// Services
import { InternalServices, StringServices } from '@utils/services';

// Dictionary
import { getServerDefaultLocale } from '@dictionary';

const now = new Date();

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const deploymentURL = `${StringServices.removeExtraSlashes(
        InternalServices.getDeploymentURL().toString(),
    )}/${getServerDefaultLocale()}`;
    const releasedBlogPosts = await fetch(`${InternalServices.getBLOB()}/blog/metadata.json`)
        .then((_res) => _res.json())
        .then((_blog: Blog[]) => _blog.filter((_post) => _post.status === 'RELEASED'))
        .catch(() => [] as Blog[]);

    const sitemap = [
        {
            url: deploymentURL,
            lastModified: now,
            changeFrequency: 'yearly',
            priority: 1,
        },
        {
            url: `${deploymentURL}/resume`,
            lastModified: now,
            changeFrequency: 'yearly',
            priority: 0.8,
        },
    ] as MetadataRoute.Sitemap;

    if (releasedBlogPosts.length > 0) {
        sitemap.push({
            url: `${deploymentURL}/blog/${releasedBlogPosts[0].id}`,
            lastModified: releasedBlogPosts[0].date,
            changeFrequency: 'monthly',
            priority: 0.5,
        });
    }

    return sitemap;
}
