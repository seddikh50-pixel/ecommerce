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
        const images = await prisma.product.findUnique({
        where :{ id}
    })
   
    if(images?.images.length){
        images?.images.forEach(async(img)=> {
            const filePath = path.join(process.cwd(), "public" , img)
            await fs.unlink(filePath)
        })
    }

    await prisma.product.delete({
        where : {id}
    })

     
        // const filePath = path.join(process.cwd(), "public" , images.image)
        // await fs.unlink(filePath)
    
     
      return NextResponse.json({ success: true, message: 'product deleted successfully', data : images?.images })
    } catch (error) {
         return NextResponse.json({ success: false, message: 'failed deleted', error  })
    }

}