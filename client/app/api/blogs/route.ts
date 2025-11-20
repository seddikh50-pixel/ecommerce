import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { writeFile } from "fs/promises";
import { revalidateTag } from "next/cache";

export async function POST(request: NextRequest) {

    try {

        const formData = await request.formData();
        const content = formData.get('content') as string;
        const title = formData.get('title') as string;
        const image = formData.get('image') as File;
        if (!title || !content || image.size === 0) {
            return NextResponse.json({ success: false, msg: "image and name are required" }, {})
        }
        const arrayBuffer = await image.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        await writeFile(`./public/blogs/${image.name}`, buffer);
        await prisma.blog.create({
            data: {
                title,
                content,
                image: `/blogs/${image.name}`
            }
        })

        revalidateTag("blogs")

        return NextResponse.json({ msg: 'blog added successfuly', success: true }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ msg: error, success: false }, { status: 404 });
    }

}