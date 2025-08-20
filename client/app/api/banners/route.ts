import { NextRequest, NextResponse } from "next/server";
import { writeFile } from 'fs/promises';
import prisma from "@/lib/prisma";


export async function GET() {
    // This function would typically fetch banners from a database or an external API
    const banners = [
        { id: 1, title: "Banner 1", image: "/images/banner1.jpg" },
        { id: 2, title: "Banner 2", image: "/images/banner2.jpg" },
        { id: 3, title: "Banner 3", image: "/images/banner3.jpg" }
    ];

    return NextResponse.json({ banners: banners }, { status: 200 })
}


export async function POST(request: Request) {

    try {
        const formData = await request.formData();
        const count = await prisma.banner.count();
        await prisma.banner.create({
            data: {
                image: `/banners/banner${count + 1}.jpg`
            }
        })

        const file = formData.get('image') as File;
        // إذا تريد حفظ الصورة في السيرفر
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // مثال: حفظ الصورة في مجلد داخل project
        await writeFile(`./public/banners/banner${count + 1}.jpg`, buffer);
      

        return NextResponse.json({ message: 'Banner added successfuly', success: true }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "something went wrong ", success: false, msg: error }, { status: 404 });
    }
}
