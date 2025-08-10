import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

interface Params {
    id  : string
}
export async function DELETE(request: NextRequest, { params } : { params : Params} ) {
   
    const  {id}  = params
  
    try {
        const deleted = await prisma.banner.delete({
            where: {
                id
            }
        })
        return NextResponse.json({success : true , message : 'banner deleted successfully'})
    } catch (error) {
         return NextResponse.json({success : false , message : 'failed deleted' ,error})
    }
 
}