export type IPost = {
    id: string;
    createdAt: string;
    slug: string;
    title: string;
    desc: string;
    img?: string;
    views: number;
    catSlug: string;
    userEmail: string;
}

export type IUser = {
    id: string;
    name: string;
    email: string;
    emailVerified: string | null;
    image: string;
}

export interface IPostWithUser extends IPost {
    user: IUser;
}