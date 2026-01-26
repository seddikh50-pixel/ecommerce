import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import path from "path"
import { promises as fs } from 'fs'
import { revalidateTag } from "next/cache";

interface Params {
    id: string
}


export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
 
    try {
        const existingCategory = await prisma.category.findUnique({
            where: { id }
        })

      

        if (!existingCategory) {
            return NextResponse.json({ success: false, message: 'there is no category' })
        }

        const deletedCategory = await prisma.category.delete({
            where: { id }
        })
       
      

        if (existingCategory?.image ) {
            const filePath = path.join(process.cwd(), "public", existingCategory.image)
            await fs.unlink(filePath)
        }
        revalidateTag("categories")

        return NextResponse.json({ success: true, message: 'category deleted successfully' })
    } catch (error) {
        return NextResponse.json({ success: false, message: 'failed deleted', error })
    }

}