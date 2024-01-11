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

export async function getPosts(page: number) {

    const res = await fetch(`http://localhost:3000/api/posts?page=${page}`, {
        cache: "no-store"
    })

    if(!res.ok) throw new Error("Failed to get posts")

    const posts = await res.json();
    console.log(posts)

    return posts;
}