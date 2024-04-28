import { Metadata } from 'next';

// Pages
import { Home, Layout } from '@pages';

// Utils
import { getServerDefaultLocale } from '@dictionary';

const getDefaultProps = (props: Home.Props): Home.Props => {
    const defaultProps = props;
    defaultProps.params.lang = getServerDefaultLocale();

    return defaultProps;
};

export async function generateMetadata(props: Home.Props): Promise<Metadata> {
    const layoutMetaData = await Layout.generateMetadata({
        children: [],
        isRootLocale: true,
        params: { lang: getServerDefaultLocale() },
    });
    const homeMetadata = await Home.generateMetadata(getDefaultProps(props));

    return { ...layoutMetaData, ...homeMetadata };
}

export default async function Page(props: Home.Props) {
    return Layout.generatePage({
        children: await Home.generatePage({
            ...getDefaultProps(props),
            isRootLocale: true,
        }),
        isRootLocale: true,
        params: { lang: getServerDefaultLocale() },
    });
}
