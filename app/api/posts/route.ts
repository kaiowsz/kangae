import { getAuthSession } from "@/utils/auth"
import prisma from "@/utils/connect"
import { NextApiResponse } from "next"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (req: NextRequest) => {

    const { searchParams } = new URL(req.url)

    const page: unknown = searchParams.get("page")
    const cat: unknown = searchParams.get("cat")

    const POST_PER_PAGE = 3;

    const query = {
        take: POST_PER_PAGE,
        skip: POST_PER_PAGE * ((page as number) - 1),
        orderBy: {createdAt: "desc"},
        where: {
            ...((cat as any) && {catSlug: cat})
        }
    }

    try {
        const [posts, count] = await prisma.$transaction([
            prisma.post.findMany({
                take: POST_PER_PAGE,
                skip: POST_PER_PAGE * ((page as number) - 1),
                orderBy: {createdAt: "desc"},
                where: {
                    ...((cat as any) && {catSlug: cat})
                }
            }),
            prisma.post.count({where: query.where})
        ]);
        return new NextResponse(JSON.stringify({posts, count}))
        
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify({message: "Something went wrong", status: 500}))
    }
}

export const POST = async (req: NextRequest) => {
    const session = await getAuthSession();

    if(!session) {
        return new NextResponse(JSON.stringify({message: "Not authenticated."}))
    }

    try {
        const body = await req.json();
        const post = await prisma.post.create({
            data: {...body, userEmail: (session as any).user.email}
        })

        return new NextResponse(JSON.stringify(post))
    } catch (error) {
        console.log(error)
        throw new Error("Failed to create post.")
    }
}