// import { NextRequest, NextResponse } from "next/server";
// import prisma from "@/lib/prisma";
// import { writeFile } from 'fs/promises';
// import { revalidateTag } from "next/cache";

// export async function POST(request: NextRequest) {

//     try {

//         const formData = await request.formData();   
//         const name = formData.get('name') as string;
//         const file = formData.get('image') as File;
        
//         if (!name || file.size === 0) {
//             return NextResponse.json({ success: false, msg: "image and name are required" }, {})
//         }
//         await prisma.category.create({
//             data: {
//                 name: name,
//                 image: `/categories/${name}.jpg`
//             }
//         })
        
//         revalidateTag("categories", "page");
//         // إذا تريد حفظ الصورة في السيرفر
//         const arrayBuffer = await file.arrayBuffer();

//         const buffer = Buffer.from(arrayBuffer);

//         // مثال: حفظ الصورة في مجلد داخل project
//         await writeFile(`./public/categories/${name}.jpg`, buffer);
//         return NextResponse.json({ msg: 'category added successfuly', success: true }, { status: 201 })
//     } catch (error) {
//         return NextResponse.json({ msg:error, success: false }, { status: 404 });
//     }

// }


import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { revalidateTag } from "next/cache";
import { supabase } from "@/lib/supabase"; // تأكد هذا الملف موجود

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();   
    const name = formData.get('name') as string;
    const file = formData.get('image') as File;
        
    if (!name || !file || file.size === 0) {
      return NextResponse.json(
        { success: false, msg: "image and name are required" },
        { status: 400 }
      );
    }

    // تحويل الملف إلى buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // اسم الملف في التخزين
    const fileName = `categories/${name}-${Date.now()}.jpg`;

    // ⬆️ رفع الصورة إلى Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('ecom-store') // اسم الباكيت
      .upload(fileName, buffer, {
        contentType: file.type,
        upsert: true
      });

    if (uploadError) {
      console.error(uploadError);
      return NextResponse.json(
        { success: false, msg: "upload failed" },
        { status: 500 }
      );
    }

    // 🔗 جلب الرابط العام للصورة
    const { data } = supabase.storage
      .from('ecom-store')
      .getPublicUrl(fileName);

    const imageUrl = data.publicUrl;

    // 💾 حفظ في قاعدة البيانات
    await prisma.category.create({
      data: {
        name: name,
        image: imageUrl
      }
    });

    // ♻️ إعادة التحقق من الكاش
    revalidateTag("categories", "max");

    return NextResponse.json(
      { msg: 'category added successfully', success: true },
      { status: 201 }
    );

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { msg: "server error", success: false },
      { status: 500 }
    );
  }
}
