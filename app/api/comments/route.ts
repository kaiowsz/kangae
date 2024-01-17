import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    const { searchParams } = new URL(req.url)

    const postSlug = searchParams.get("postSlug")

    try {
        const comments = await prisma.comment.findMany({
            where: {
                ...(postSlug && { postSlug }),
            },
            include: { user: true }
        })

        return new NextResponse(JSON.stringify(comments));
    } catch (error) {
        console.log(error);
        
        return new NextResponse(JSON.stringify({message: "Something went wrong.", status: 500}))
    }
}

export const POST = async (req: NextRequest) => {
    const session: unknown = await getAuthSession();

    if(!session) {
        return new NextResponse(JSON.stringify({message: "Not authenticated.", status: 401}))
    }

    try {
        const body = await req.json();

        const comment = await prisma.comment.create({
            data: {
                ...body, 
                userEmail: ((session as any).user.email)
            }
        })

        return new NextResponse(JSON.stringify(comment));
    } catch (error) {
        console.log(error);
        
        return new NextResponse(JSON.stringify({message: "Something went wrong.", status: 500}))
    }
}