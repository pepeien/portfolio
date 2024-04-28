import { Metadata } from 'next';

// Pages
import { Blog, Layout } from '@pages';

// Utils
import { getServerDefaultLocale } from '@dictionary';

const getDefaultProps = (props: Blog.Props): Blog.Props => {
    const defaultProps = props;
    defaultProps.params.lang = getServerDefaultLocale();

    return defaultProps;
};

export async function generateMetadata(props: Blog.Props): Promise<Metadata> {
    const layoutMetadata = await Layout.generateMetadata({
        children: [],
        isRootLocale: true,
        params: { lang: getServerDefaultLocale() },
    });
    const blogMetadata = await Blog.generateMetadata(getDefaultProps(props));

    return { ...layoutMetadata, ...blogMetadata };
}

export default async function Page(props: Blog.Props) {
    return Layout.generatePage({
        children: [await Blog.generatePage(getDefaultProps(props))],
        isRootLocale: true,
        params: { lang: getServerDefaultLocale() },
    } as Layout.Props);
}
