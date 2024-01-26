import { ICategory } from "@/@types/ICategory";

export async function getCategories() {
    const res = await fetch("http://localhost:3000/api/categories", {
        cache: "no-store"
    })

    if(!res.ok) {
        throw new Error("Failed to get categories")
    }

    const categories: ICategory[] = await res.json();

    return categories;
}

export async function getPosts(page: number, category: string) {

    const res = await fetch(`${process.env.API_URL}/api/posts?page=${page}&cat=${category || ""}`, {
        cache: "no-store"
    })

    if(!res.ok) throw new Error("Failed to get posts")

    const posts = await res.json();

    return posts;
}

export async function getPostById(slug: any) {
        
    const res = await fetch(`${process.env.API_URL}/api/posts/${slug}`, {
        cache: "no-store"
    })

    if(!res.ok) {
        throw new Error("Failed.")
    }

    return res.json();
}

export async function getPopularPosts() {
    const res = await fetch(`${process.env.API_URL}/api/posts/popular`)

    if(!res.ok) throw new Error("Failed");

    return res.json();
}