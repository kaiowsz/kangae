import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/connect";

export const GET = async (req: NextRequest) => {
    try {
        const posts = await prisma.post.findMany({
            take: 4,
            orderBy: {
                views: "desc"
            }
        })
        
        return new NextResponse(JSON.stringify(posts));
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify({message: "Something went wrong fetching popular posts", status: 500}))
    }
}