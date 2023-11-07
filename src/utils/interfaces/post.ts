export interface PostTranslations {
    [key: string]: string;
}

export interface Post {
    id: string;
    title: PostTranslations;
    description: PostTranslations;
}

export interface PostMetadata {
    posts: Post[];
}
