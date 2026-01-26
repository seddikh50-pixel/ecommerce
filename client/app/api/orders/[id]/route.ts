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

    try {
        const { id } = await params
     
        if (!id) {
            return NextResponse.json(
                { success: false, message: "Order ID is required" },
                { status: 400 }
            );
        }
        

        const existingOrder = prisma.order.findUnique({ where: { id } })
        if (!existingOrder) {
            return NextResponse.json({ success: false, message: "Order not found" },
                { status: 404 })
        }
        await prisma.order.delete({ where: { id } })

        revalidateTag("orders", "max");
        return NextResponse.json({ success: true, message: 'order deleted successfully' })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: 'failed deleted', error })
    }

}