import { MetadataRoute } from 'next';

// Types
import { Blog } from '@utils/interfaces';

// Services
import { BlogServices, InternalServices, StringServices } from '@utils/services';

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

    const sitemap: MetadataRoute.Sitemap = [];

    sitemap.push({
        url: deploymentURL,
        lastModified: now,
        changeFrequency: 'yearly',
        priority: 1,
    });
    console.log(releasedBlogPosts);
    if (releasedBlogPosts.length > 0) {
        const latestPost = BlogServices.getLatestPost(releasedBlogPosts);

        sitemap.push({
            url: `${deploymentURL}/blog/${latestPost.id}`,
            lastModified: latestPost.date,
            changeFrequency: 'monthly',
            priority: 1,
        });
    }

    return sitemap;
}
