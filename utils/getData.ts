import { ICategory } from "@/@types/ICategory";

export async function getCategories() {
    const res = await fetch(`https://kangae.vercel.app/api/categories`)

    if(!res.ok) {
        throw new Error("Failed to get categories")
    }

    const categories: ICategory[] = await res.json();

    return categories;
}

export async function getPosts(page: number, category: string) {

    const res = await fetch(`https://kangae.vercel.app/api/posts?page=${page}&cat=${category || ""}`)

    if(!res.ok) throw new Error("Failed to get posts")

    const posts = await res.json();

    return posts;
}

export async function getPostById(slug: any) {
        
    const res = await fetch(`https://kangae.vercel.app/api/posts/${slug}`)

    if(!res.ok) {
        throw new Error("Failed.")
    }

    return res.json();
}

export async function getPopularPosts() {
    const res = await fetch(`https://kangae.vercel.app/api/posts/popular`)

    if(!res.ok) throw new Error("Failed");

    return res.json();
}