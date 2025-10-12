
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';
import { writeFile } from 'fs/promises';
import { revalidateTag } from 'next/cache';


export async function GET(request: Request) {

  const products = await prisma.product.findMany()

  return NextResponse.json({ products: products });
}


export async function POST(request: Request) {
  try {

    const formData = await request.formData();
    const images: string[] = []
    const name = formData.get('name') as string
    const price = formData.get('price') as string
    const description = formData.get('description') as string
    const categoryId = formData.get('category') as string
    const brandId = formData.get('brand') as string
    const savePromises = [];
   

    for (let index = 1; index <= 4; index++) {
      const image = formData.get(`image${index}`) as File

      if (image instanceof File && image.name) {
        images.push(`/products/${image.name}`)
        async function saveImage(image: File) {
          const arrayBuffer = await image.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
          await writeFile(`./public/products/${image.name}`, buffer);
        }
        savePromises.push(saveImage(image))
      }
    }

    await Promise.all(savePromises)
    await prisma.product.create({
      data: {
        name,
        price,
        description,
        categoryId,
        images,
        brandId
      }
    })
    revalidateTag("products")
    return NextResponse.json({ msg: 'product added successfully', success: true })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error : any) {
     if (error.code === "P2002" && error.meta?.target?.includes("name")) {
    return NextResponse.json({ 
      msg: "يوجد منتج بهذا الاسم, يرجى اختيار اسم اخر", 
      success: false 
    });
  }
    return NextResponse.json({ msg: error })
  }
}
