import { Metadata } from 'next';

// Pages
import { ProjectSearch } from '@pages';

export async function generateMetadata(params: ProjectSearch.Props): Promise<Metadata> {
    return ProjectSearch.generateMetadata(params);
}

export default async function Page(params: ProjectSearch.Props) {
    return ProjectSearch.generatePage(params);
}
