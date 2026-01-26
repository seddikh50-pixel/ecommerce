// import prisma from "@/lib/prisma"
// import { NextRequest, NextResponse } from "next/server"
// import path from "path"
// import { promises as fs } from 'fs'


// interface Params {
//     id: string
// }
// export async function DELETE(request: NextRequest,{ params }: { params: Promise<{ id: string }> }) {

//     const { id } = await params

//     const banner = await prisma.banner.findUnique({
//         where: { id }
//     });

//     try {
//         await prisma.banner.delete({
//             where: {
//                 id
//             }
//         })

//         if (banner?.image) {
//             const filePath = path.join(process.cwd(), "public", banner.image);
//             await fs.unlink(filePath);
//         }


//         return NextResponse.json({ success: true, message: 'banner deleted successfully' })
//     } catch (error) {
//         return NextResponse.json({ success: false, message: 'failed deleted', error })
//     }

// }



import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

interface Params {
  id: string
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  try {
    // 🔎 جلب البانر
    const banner = await prisma.banner.findUnique({
      where: { id }
    })

    if (!banner) {
      return NextResponse.json(
        { success: false, message: "banner not found" },
        { status: 404 }
      )
    }

    // 🧠 استخراج اسم الملف من الرابط
    // مثال:
    // https://xxxx.supabase.co/storage/v1/object/public/ecom-store/banner-123.jpg
    const url = banner.image
    const fileName = url.split('/ecom-store/')[1] 
    // النتيجة: banner-123.jpg

    // 🗑 حذف من Supabase Storage
    const { error: deleteError } = await supabase.storage
      .from('ecom-store')
      .remove([fileName])

    if (deleteError) {
      console.error(deleteError)
      return NextResponse.json(
        { success: false, message: "failed to delete image from storage" },
        { status: 500 }
      )
    }

    // 🗑 حذف من قاعدة البيانات
    await prisma.banner.delete({
      where: { id }
    })

    return NextResponse.json({
      success: true,
      message: 'banner deleted successfully'
    })

  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { success: false, message: 'failed deleted', error },
      { status: 500 }
    )
  }
}
