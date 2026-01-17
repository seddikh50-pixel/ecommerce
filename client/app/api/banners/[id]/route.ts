import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"
import path from "path"
import { promises as fs } from 'fs'


interface Params {
    id: string
}
export async function DELETE(request: NextRequest, { params }: { params :Params }) {

    const { id } = await params

    const banner = await prisma.banner.findUnique({
        where: { id }
    });

    try {
        await prisma.banner.delete({
            where: {
                id
            }
        })

        if (banner?.image) {
            const filePath = path.join(process.cwd(), "public", banner.image);
            await fs.unlink(filePath);
        }


        return NextResponse.json({ success: true, message: 'banner deleted successfully' })
    } catch (error) {
        return NextResponse.json({ success: false, message: 'failed deleted', error })
    }

}