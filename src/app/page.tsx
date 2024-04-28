import { Metadata } from 'next';

// Pages
import { Home, Layout } from '@pages';

// Utils
import { getServerDefaultLocale } from '@dictionary';

const getDefaultProps = (props: Home.Props): Home.Props => {
    const defaultProps = props;
    defaultProps.params.lang = getServerDefaultLocale();
    defaultProps.params.isRootLocale = true;

    return defaultProps;
};

export async function generateMetadata(props: Home.Props): Promise<Metadata> {
    const layoutMetaData = await Layout.generateMetadata({
        params: { lang: getServerDefaultLocale(), isRootLocale: true },
        children: [],
    });
    const homeMetadata = await Home.generateMetadata(getDefaultProps(props));

    return { ...layoutMetaData, ...homeMetadata };
}

export default async function Page(props: Home.Props) {
    return Layout.generatePage({
        children: await Home.generatePage({
            ...getDefaultProps(props),
        }),
        params: { lang: getServerDefaultLocale(), isRootLocale: true },
    });
}
