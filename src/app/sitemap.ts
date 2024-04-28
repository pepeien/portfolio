import { MetadataRoute } from 'next';

// Types
import { Blog } from '@utils/interfaces';

// Services
import { BlogServices, InternalServices, StringServices } from '@utils/services';

// Dictionary
import { getCanonical, getServerLocales } from '@dictionary';
import { Languages } from 'next/dist/lib/metadata/types/alternative-urls-types';

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

export const getAlternates = (prefix = '', suffix = '', hasCanonical = false) => {
    const result: { [key: string]: string } = {};

    const canonical = getCanonical();
    const serverLocales = getServerLocales();
    const locales = hasCanonical
        ? Object.keys(serverLocales)
        : Object.keys(serverLocales).filter((alternate) => alternate !== canonical);

    locales.forEach((key) => {
        result[key] = StringServices.removeExtraSlashes(
            `${prefix}/${serverLocales[key]}/${suffix}`,
        );
    });

    return result;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const defaultURL = StringServices.removeExtraSlashes(
        InternalServices.getDeploymentURL().toString(),
    );

    const result: MetadataRoute.Sitemap = [];

    const rootAlternates = getAlternates(defaultURL, '', true);
    const rootSitemap = {
        url: defaultURL,
        lastModified: now,
        changeFrequency: 'yearly',
        alternates: {
            languages: rootAlternates,
        },
    } as SiteMap;

    result.push(rootSitemap);

    Object.values(rootAlternates).forEach((locale) => {
        result.push({
            ...rootSitemap,
            url: locale,
        });
    });

    const releasedBlogPosts = await fetch(`${InternalServices.getBLOB()}/blog/metadata.json`, {
        next: { revalidate: InternalServices.getFetchInterval() },
    })
        .then((_res) => _res.json())
        .then((_blog: Blog[]) => _blog.filter((_post) => _post.status === 'RELEASED'))
        .catch(() => [] as Blog[]);

    if (releasedBlogPosts.length > 0) {
        releasedBlogPosts
            .slice(0, 3)
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
                const blogAlternates = getAlternates(defaultURL, `blog/${post.id}`, true);
                const blogSitemap = {
                    url: `${defaultURL}/blog/${post.id}`,
                    lastModified: post.date,
                    alternates: {
                        languages: blogAlternates,
                    },
                } as SiteMap;

                result.push(blogSitemap);

                Object.values(blogAlternates).forEach((locale) => {
                    result.push({
                        ...blogSitemap,
                        url: locale,
                    });
                });
            });
    }

    return result;
}
