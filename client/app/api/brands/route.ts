// import { NextRequest, NextResponse } from "next/server";
// import prisma from "@/lib/prisma";
// import { writeFile } from "fs/promises";
// import { revalidateTag } from "next/cache";

// export async function POST(request: NextRequest) {

//     try {

//         const formData = await request.formData();
//         const name = formData.get('name') as string;
//         const image = formData.get('image') as File;

//         if (!name || image.size === 0) {
//             return NextResponse.json({ success: false, msg: "image and name are required" }, {})
//         }
//         const arrayBuffer = await image.arrayBuffer();
//         const buffer = Buffer.from(arrayBuffer);

//         // مثال: حفظ الصورة في مجلد داخل project
//         await writeFile(`./public/brands/${image.name}`, buffer);
//         await prisma.brand.create({
//             data: {
//                 name,
//                 image: `/brands/${image.name}`
//             }
//         })


//        revalidateTag("brands", "page");
//         return NextResponse.json({ msg: 'brand added successfuly', success: true }, { status: 201 })
//     } catch (error) {
//         return NextResponse.json({ msg: error, success: false }, { status: 404 });
//     }

// }




import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { supabase } from "@/lib/supabase";
import { revalidateTag } from "next/cache";

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const name = formData.get('name') as string;
        const image = formData.get('image') as File;

        if (!name || !image || image.size === 0) {
            return NextResponse.json(
                { success: false, msg: "image and name are required" },
                { status: 400 }
            );
        }

        // 🧠 تحويل الصورة إلى Buffer
        const buffer = Buffer.from(await image.arrayBuffer());

        const safeName = image.name
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^\w.-]/g, "");

        const fileName = `brands/${Date.now()}-${safeName}`;

        const { error } = await supabase.storage
            .from('ecom-store')
            .upload(fileName, buffer, {
                contentType: image.type,
                upsert: true,
            });
        if (error) {
            console.error("Supabase upload error:", error);
            return NextResponse.json(
                { success: false, msg: "Upload failed" },
                { status: 500 }
            );
        }

        // 🌍 الحصول على الرابط العام
        const { data } = supabase.storage
            .from('ecom-store')
            .getPublicUrl(fileName);

        const imageUrl = data.publicUrl;

        // 💾 حفظ في قاعدة البيانات
        await prisma.brand.create({
            data: {
                name,
                image: imageUrl, // نحفظ URL وليس path محلي
            },
        });

        revalidateTag("brands", "max");

        return NextResponse.json(
            { msg: 'brand added successfully', success: true },
            { status: 201 }
        );

    } catch (error: unknown) {
        const err = error as Error;

        return NextResponse.json(
            { msg: err.message || "Server error", success: false },
            { status: 500 }
        );
    }
}
