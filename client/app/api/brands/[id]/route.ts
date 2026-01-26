// import prisma from "@/lib/prisma"
// import { NextRequest, NextResponse } from "next/server"
// import path from "path"
// import { promises as fs } from 'fs'
// import { revalidateTag } from "next/cache"



// export async function DELETE(request: NextRequest,{ params }: { params: Promise<{ id: string }> }) {

//     const { id } = await params

//     if (!id) {
//         return NextResponse.json({ success: false, message: "Missing id parameter" });
//     }



//     try {
//         const brand = await prisma.brand.findUnique({
//             where: { id }
//         });


//         await prisma.brand.delete({
//             where: {
//                 id
//             }
//         })

//         if (brand?.image) {
//             const filePath = path.join(process.cwd(), "public", brand.image);
//             await fs.unlink(filePath);
//         }

//         revalidateTag("brands", "page");
//         return NextResponse.json({ success: true, message: 'banner deleted successfully' })
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
  const { id } = await params; // ✅ Promise

  if (!id) {
    return NextResponse.json(
      { success: false, message: "Missing id parameter" },
      { status: 400 }
    );
  }

  try {
    // 🔍 جلب البراند
    const brand = await prisma.brand.findUnique({
      where: { id }
    });

    if (!brand) {
      return NextResponse.json(
        { success: false, message: "Brand not found" },
        { status: 404 }
      );
    }

    // 🗑 حذف من DB
    await prisma.brand.delete({
      where: { id }
    });

    // ☁️ حذف الصورة من Supabase Storage
    if (brand.image) {
      // استخراج المسار من الرابط
      const filePath = brand.image.split('/ecom-store/')[1]; 
      // مثال الناتج: brands/1700000-nike.png

      if (filePath) {
        const { error } = await supabase.storage
          .from('ecom-store')
          .remove([filePath]);

        if (error) {
          console.error("Supabase delete error:", error);
          // لا نكسر العملية — DB تم الحذف
        }
      }
    }

    revalidateTag("brands", "page");

    return NextResponse.json({
      success: true,
      message: "brand deleted successfully"
    });

  } catch (error: unknown) {
    const err = error as Error;

    return NextResponse.json(
      { success: false, message: "failed delete", error: err.message },
      { status: 500 }
    );
  }
}
