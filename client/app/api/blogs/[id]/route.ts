import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from 'fs'

import prisma from "@/lib/prisma";
import { writeFile } from "fs/promises";
import { revalidateTag } from "next/cache";
import path from "path";
interface Params {
    id: string
}



export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    try {
        const blogImage = await prisma.blog.findUnique({ where: { id } })
        if (!blogImage) {
            return NextResponse.json({ success: false, message: 'there is no brand' })
        }
        await prisma.blog.delete({ where: { id } })
        console.log({theDeleted: blogImage?.image})
        if (blogImage?.image) {
            const filePath = path.join(process.cwd(), "public", blogImage.image)
            await fs.unlink(filePath)
        }
        revalidateTag("blogs")
        return NextResponse.json({ success: true, message: 'brand deleted successfully' })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: 'failed deleted', error })
    }

}