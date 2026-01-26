import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { writeFile } from "fs/promises";
import { revalidateTag } from "next/cache";

export async function POST(request: NextRequest) {

    try {

        const formData = await request.formData();
        const name = formData.get('name') as string;
        const image = formData.get('image') as File;
       
        if (!name || image.size === 0) {
            return NextResponse.json({ success: false, msg: "image and name are required" }, {})
        }
        const arrayBuffer = await image.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // مثال: حفظ الصورة في مجلد داخل project
        await writeFile(`./public/brands/${image.name}`, buffer);
        await prisma.brand.create({
            data: {
                name,
                image: `/brands/${image.name}`
            }
        })


       revalidateTag("brands", "page");
        return NextResponse.json({ msg: 'brand added successfuly', success: true }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ msg: error, success: false }, { status: 404 });
    }

}