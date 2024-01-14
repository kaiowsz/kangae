import { IUser } from "./IPost";

export type IComment = {
    id: string;
    createdAt: string;
    desc: string;
    userEmail: string;
    postSlug: string;
    user: IUser;
}