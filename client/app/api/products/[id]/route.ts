// import prisma from "@/lib/prisma";
// import { NextRequest, NextResponse } from "next/server";
// import path from "path"
// import { promises as fs } from 'fs'
// import { revalidateTag } from "next/cache";

// interface Params {
//     id: string
// }


// export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }>}) {
//     const { id } = await params


//     try {
//         const images = await prisma.product.findUnique({
//             where: { id }
//         })

//         if (images?.images.length) {
//             images?.images.forEach(async (img) => {
//                 const filePath = path.join(process.cwd(), "public", img)
//                 await fs.unlink(filePath)
//             })
//         }


//         await prisma.product.delete({
//             where : {id}
//         })
//         revalidateTag("products", "page");



//         return NextResponse.json({ success: true, message: 'product deleted successfully', data: images?.images })
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
    // 🔍 جلب المنتج
    const product = await prisma.product.findUnique({
      where: { id }
    });

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    // ☁️ حذف الصور من Supabase Storage
    if (product.images?.length) {
      const filesToDelete: string[] = [];

      for (const img of product.images) {
        // img = public URL
        // https://xxx.supabase.co/storage/v1/object/public/ecom-store/products/file.jpg
        const filePath = img.split('/ecom-store/')[1]; 
        // 👉 products/file.jpg

        if (filePath) {
          filesToDelete.push(filePath);
        }
      }

      if (filesToDelete.length) {
        const { error } = await supabase.storage
          .from('ecom-store')
          .remove(filesToDelete);

        if (error) {
          console.error("Supabase delete error:", error);
          // لا نوقف العملية
        }
      }
    }

    // 🗑 حذف المنتج من DB
    await prisma.product.delete({
      where: { id }
    });

    revalidateTag("products", "max");

    return NextResponse.json({
      success: true,
      message: "product deleted successfully",
      deletedImages: product.images
    });

  } catch (error: unknown) {
    const err = error as Error;

    return NextResponse.json(
      { success: false, message: "failed delete", error: err.message },
      { status: 500 }
    );
  }
}
