
// import prisma from '@/lib/prisma';
// import { NextResponse } from 'next/server';
// import path from 'path';
// import { promises as fs } from 'fs';
// import { writeFile } from 'fs/promises';
// import { revalidateTag } from 'next/cache';


// export async function GET(request: Request) {

//   const products = await prisma.product.findMany()

//   return NextResponse.json({ products: products });
// }


// export async function POST(request: Request) {
//   try {

//     const formData = await request.formData();
//     const images: string[] = []
//     const name = formData.get('name') as string
//     const price = formData.get('price') as string
//     const description = formData.get('description') as string
//     const categoryId = formData.get('category') as string
//     const brandId = formData.get('brand') as string
//     const isStocked = formData.get('isStocked') === 'on'
//     const savePromises = [];


//     for (let index = 1; index <= 4; index++) {
//       const image = formData.get(`image${index}`) as File

//       if (image instanceof File && image.name) {
//         images.push(`/products/${image.name}`)
//         async function saveImage(image: File) {
//           const arrayBuffer = await image.arrayBuffer();
//           const buffer = Buffer.from(arrayBuffer);
//           await writeFile(`./public/products/${image.name}`, buffer);
//         }
//         savePromises.push(saveImage(image))
//       }
//     }

//     await Promise.all(savePromises)
//     await prisma.product.create({
//       data: {
//         name,
//         price,
//         description,
//         categoryId,
//         images,
//         brandId,
//         isStocked
//       }
//     })
//     revalidateTag("products")
//     return NextResponse.json({ msg: 'product added successfully', success: true })
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   } catch (error: any) {
//     if (error.code === "P2002" && error.meta?.target?.includes("name")) {
//       return NextResponse.json({
//         msg: "يوجد منتج بهذا الاسم, يرجى اختيار اسم اخر",
//         success: false
//       });
//     }
//     return NextResponse.json({ msg: error })
//   }
// }


import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { revalidateTag } from 'next/cache';
import {stripe} from '@/lib/stripe';

export async function POST(request: Request) {
   console.log(request.method)
  try {
    const formData = await request.formData();
    
    const images: string[] = [];
    const name = formData.get('name') as string;
    const price = parseFloat(formData.get('price') as string);
    const description = formData.get('description') as string;
    const categoryId = formData.get('category') as string;
    const brandId = formData.get('brand') as string;
    const isStocked = formData.get('isStocked') === 'on';
    const savePromises = [];


    for (let index = 1; index <= 4; index++) {
      const image = formData.get(`image${index}`) as File;
      if (image instanceof File && image.name) {
        images.push(`/products/${image.name}`);
        async function saveImage(image: File) {
          const arrayBuffer = await image.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
          await writeFile(`./public/products/${image.name}`, buffer);
        }
        savePromises.push(saveImage(image));
      }
    }

    await Promise.all(savePromises);

    // ⚡️ الخطوة 1: إنشاء المنتج داخل Stripe
    const stripeProduct = await stripe.products.create({
      name,
      description,
      // images: images.map(img => `${process.env.NEXT_PUBLIC_URL}${img}`),
      images:  ["https://images.unsplash.com/photo-1523275335684-37898b6baf30"],
      metadata: { categoryId, brandId },
    });
    console.log({stripeProduct})

    // ⚡️ الخطوة 2: إنشاء السعر
    const stripePrice = await stripe.prices.create({
      unit_amount: Math.round(price * 100), // السعر بالسنت
      currency: 'usd',
      product: stripeProduct.id,
    });

    // ⚡️ الخطوة 3: حفظ المنتج في قاعدة البيانات
    const product = await prisma.product.create({
      data: {
        name,
        price: price.toString(),
        description,
        categoryId,
        brandId,
        images,
        isStocked,
        stripeProductId: stripeProduct.id,
        stripePriceId: stripePrice.id,
      },
    });
    revalidateTag('products');

    return NextResponse.json({
      msg: '✅ Product added successfully (with Stripe)',
      success: true,
    });
  } catch (error: unknown) {
  const err = error as Error; // تحويل مؤقت

    // ⬅️ هنا نرسل رد JSON في حال الخطأ
    return NextResponse.json(
      {
        msg: err.message || 'Something went wrong',
        success: false,
      },
      { status: 500 }
    );
}
}


export async function PUT(request: Request) {
  
console.log(request.method)
  try { 
    const formData = await request.formData();
    const id = formData.get('id') as string;
    const images: string[] = [];
    const name = formData.get('name') as string;
    const price = formData.get('price') as string;
    const description = formData.get('description') as string;
    const categoryId = formData.get('category') as string;
    const brandId = formData.get('brand') as string;
    const isStocked = formData.get('isStocked') === 'on';
    const savePromises = [];
    for (let index = 1; index <= 4; index++) {
      const image = formData.get(`image${index}`) as File ;
      if (image instanceof File && image.name) {
        images.push(`/products/${image.name}`);
        async function saveImage(image: File) {
          const arrayBuffer = await image.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
          await writeFile(`./public/products/${image.name}`, buffer);
        }
        savePromises.push(saveImage(image));
      }
    }

    await Promise.all(savePromises);
    await prisma.product.update({
      where: { id },
      data: {   
        name,
        price,
        description,
        categoryId,
        images,
        brandId,
        isStocked
      }
    });
    revalidateTag("products")
    return NextResponse.json({ msg: 'product updated successfully', success: true }) 

  }
 catch (error: unknown) {
  const err = error as Error; // تحويل مؤقت

    // ⬅️ هنا نرسل رد JSON في حال الخطأ
    return NextResponse.json(
      {
        msg: err.message || 'Something went wrong',
        success: false,
      },
      { status: 500 }
    );
}
}
