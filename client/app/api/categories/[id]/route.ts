// import prisma from "@/lib/prisma";
// import { NextRequest, NextResponse } from "next/server";
// import path from "path"
// import { promises as fs } from 'fs'
// import { revalidateTag } from "next/cache";




// export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
//     const { id } = await params
 
//     try {
//         const existingCategory = await prisma.category.findUnique({
//             where: { id }
//         })

      

//         if (!existingCategory) {
//             return NextResponse.json({ success: false, message: 'there is no category' })
//         }

//         const deletedCategory = await prisma.category.delete({
//             where: { id }
//         })
       
      

//         if (existingCategory?.image ) {
//             const filePath = path.join(process.cwd(), "public", existingCategory.image)
//             await fs.unlink(filePath)
//         }
//         revalidateTag("categories", "page");

//         return NextResponse.json({ success: true, message: 'category deleted successfully' })
//     } catch (error) {
//         return NextResponse.json({ success: false, message: 'failed deleted', error })
//     }

// }


import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { revalidateTag } from "next/cache";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  console.log(id)


  try {
    // 🔎 جلب التصنيف
    const existingCategory = await prisma.category.findUnique({
      where: { id }
    });
    if (!existingCategory) {
      return NextResponse.json({
        success: false,
        message: 'there is no category'
      });
    }

    // 🧠 استخراج اسم الملف من رابط Supabase
    // مثال:
    // https://xxxx.supabase.co/storage/v1/object/public/ecom-store/categories/shoes.jpg
    let fileName: string | null = null;

    if (existingCategory.image) {
      fileName = existingCategory.image.split('/ecom-store/')[1];
      // النتيجة: categories/shoes.jpg
    }

    // 🗑 حذف من Supabase Storage
    if (fileName) {
      const { error: storageError } = await supabase.storage
        .from('ecom-store')
        .remove([fileName]);

      if (storageError) {
        console.error(storageError);
        return NextResponse.json({
          success: false,
          message: 'failed to delete image from storage'
        }, { status: 500 });
      }
    }

    // 🗑 حذف من قاعدة البيانات
    await prisma.category.delete({
      where: { id }
    });

    // 🔄 تحديث الكاش
    revalidateTag("categories", "max");

    return NextResponse.json({
      success: true,
      message: 'category deleted successfully'
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: 'failed deleted',
      error
    }, { status: 500 });
  }
}
