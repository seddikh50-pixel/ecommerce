import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"
import path from "path"
import { promises as fs } from 'fs'


interface Params {
    id: string
}
export async function DELETE(request: NextRequest, { params }: { params: Params }) {

    const { id } = await params

    const brand = await prisma.brand.findUnique({
        where: { id }
    });


    try {
        await prisma.brand.delete({
            where: {
                id
            }
        })

        if (brand?.image) {
            const filePath = path.join(process.cwd(), "public", brand.image);
            await fs.unlink(filePath);
        }


        return NextResponse.json({ success: true, message: 'banner deleted successfully' })
    } catch (error) {
        return NextResponse.json({ success: false, message: 'failed deleted', error })
    }

}