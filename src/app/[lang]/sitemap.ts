import { MetadataRoute } from 'next';
import { Languages } from 'next/dist/lib/metadata/types/alternative-urls-types';
import { headers } from 'next/headers';

// Types
import { Blog } from '@utils/interfaces';

// Services
import { InternalServices, StringServices } from '@utils/services';

// Dictionary
import { LOCALE_HEADER_KEY } from '@dictionary';

type SiteMap = {
    url: string;
    lastModified?: string | Date;
    changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
    priority?: number;
    alternates?: {
        languages?: Languages<string>;
    };
};

const now = new Date();

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const url = `${StringServices.removeExtraSlashes(
        `${InternalServices.getDeploymentURL().toString()}`,
    )}/${headers().get(LOCALE_HEADER_KEY)}`;

    const result: MetadataRoute.Sitemap = [];

    const rootSitemap = {
        url: url,
        lastModified: now,
        changeFrequency: 'yearly',
    } as SiteMap;

    result.push(rootSitemap);

    const releasedBlogPosts = await fetch(`${InternalServices.getBLOB()}/blog/metadata.json`, {
        next: { revalidate: InternalServices.getFetchInterval() },
    })
        .then((_res) => _res.json())
        .then((_blog: Blog[]) => _blog.filter((_post) => _post.status === 'RELEASED'))
        .catch(() => [] as Blog[]);

    if (releasedBlogPosts.length > 0) {
        releasedBlogPosts
            .sort((pastPost, currentPost) => {
                if (pastPost.date === currentPost.date) {
                    return 0;
                }

                if (pastPost.date > currentPost.date) {
                    return 1;
                }

                return -1;
            })
            .forEach((post) => {
                const blogSitemap = {
                    url: `${url}/blog/${post.id}`,
                    lastModified: post.date,
                } as SiteMap;

                result.push(blogSitemap);
            });
    }

    return result;
}
