import prisma from "@/utils/connect"
import { NextApiResponse } from "next"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (req: NextRequest, {params}: any) => {

    const { slug } = params;

    try {
        const post = await prisma.post.update({
            where: {slug},
            data: {views: {increment: 1}},
            include: {user: true}
        })
        return new NextResponse(JSON.stringify(post))
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify({message: "Something went wrong", status: 500}))
    }
}