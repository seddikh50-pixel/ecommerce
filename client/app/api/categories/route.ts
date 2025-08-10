import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { writeFile } from 'fs/promises';

export async function POST(request: NextRequest) {

    try {

        const formData = await request.formData();
        
        const name = formData.get('name') as string;
        const file = formData.get('image') as File;
        
        if (!name || file.size === 0) {
            return NextResponse.json({ success: false, msg: "image and category required" }, {})
        }
        await prisma.category.create({
            data: {
                name: name,
                image: `/categories/${name}.jpg`
            }
        })


        // إذا تريد حفظ الصورة في السيرفر
        const arrayBuffer = await file.arrayBuffer();

        const buffer = Buffer.from(arrayBuffer);

        // مثال: حفظ الصورة في مجلد داخل project
        await writeFile(`./public/categories/${name}.jpg`, buffer);
        return NextResponse.json({ msg: 'category added successfuly', success: true }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ msg:error, success: false }, { status: 404 });
    }

}