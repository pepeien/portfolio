export interface Translations {
    [key: string]: string;
}

export interface Post {
    id: string;
    title: Translations;
    description: Translations;
}
