import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import path from "path"
import  {promises as fs} from 'fs'

interface Params {
    id : string
}


export async function DELETE(request : NextRequest, {params} : {params : Params}) {
    const {id} = await params

    try {
        const categoryImage = await prisma.category.findUnique({
        where :{ id}
    })

    await prisma.category.delete({
        where : {id}
    })

    if(categoryImage?.image){
        const filePath = path.join(process.cwd(), "public" , categoryImage.image)
        await fs.unlink(filePath)
    }
     
      return NextResponse.json({ success: true, message: 'category deleted successfully' })
    } catch (error) {
         return NextResponse.json({ success: false, message: 'failed deleted', error })
    }

}