import { Metadata } from 'next';

// Pages
import { BlogSearch } from '@pages';

export async function generateMetadata(params: BlogSearch.Props): Promise<Metadata> {
    return BlogSearch.generateMetadata(params);
}

export default async function Page(params: BlogSearch.Props) {
    return BlogSearch.generatePage(params);
}
