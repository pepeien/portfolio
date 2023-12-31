import { Blog } from '@utils/interfaces';

export class BlogServices {
    public static getLatestPost = (blog: Blog[]): Blog => {
        return blog.sort((a, b) => {
            if (!a.date || !b.date) {
                return 1;
            }

            return new Date(a.date).getTime() > new Date(b.date).getTime() ? -1 : 0;
        })[0];
    };
}
