import { Metadata } from 'next';

// Pages
import { Blog } from '@pages';

export async function generateMetadata(params: Blog.Props): Promise<Metadata> {
    return Blog.generateMetadata(params);
}

export default async function Page(params: Blog.Props) {
    return Blog.generatePage(params);
}
