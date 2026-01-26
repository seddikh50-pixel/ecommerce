

import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { revalidateTag } from 'next/cache';
import {stripe} from '@/lib/stripe';
import Stripe from 'stripe';
import { supabase } from "@/lib/supabase";

// export async function POST(request: Request) {
//   try {
//     const formData = await request.formData();
    
//     const images: string[] = [];
//     const name = formData.get('name') as string;
//     const price = parseFloat(formData.get('price') as string);
//     const description = formData.get('description') as string;
//     const categoryId = formData.get('category') as string;
//     const brandId = formData.get('brand') as string;
//     const isStocked = formData.get('isStocked') === 'on';
//     const savePromises = [];


//     for (let index = 1; index <= 4; index++) {
//       const image = formData.get(`image${index}`) as File;
//       if (image instanceof File && image.name) {
//         images.push(`/products/${image.name}`);
//         async function saveImage(image: File) {
//           const arrayBuffer = await image.arrayBuffer();
//           const buffer = Buffer.from(arrayBuffer);
//           await writeFile(`./public/products/${image.name}`, buffer);
//         }
//         savePromises.push(saveImage(image));
//       }
//     }

//     await Promise.all(savePromises);

//     // ⚡️ الخطوة 1: إنشاء المنتج داخل Stripe
//     const stripeProduct = await stripe.products.create({
//       name,
//       description,
//       // images: images.map(img => `${process.env.NEXT_PUBLIC_URL}${img}`),
//       images:  ["https://images.unsplash.com/photo-1523275335684-37898b6baf30"],
//       metadata: { categoryId, brandId },
//     });

//     // ⚡️ الخطوة 2: إنشاء السعر
//     const stripePrice = await stripe.prices.create({
//       unit_amount: Math.round(price * 100), // السعر بالسنت
//       currency: 'usd',
//       product: stripeProduct.id,
//     });

//     // ⚡️ الخطوة 3: حفظ المنتج في قاعدة البيانات
//     const product = await prisma.product.create({
//       data: {
//         name,
//         price: price.toString(),
//         description,
//         categoryId,
//         brandId,
//         images,
//         isStocked,
//         stripeProductId: stripeProduct.id,
//         stripePriceId: stripePrice.id,
//       },
//     });
//     revalidateTag('products', 'page');

//     return NextResponse.json({
//       msg: '✅ Product added successfully (with Stripe)',
//       success: true,
//     });
//   } catch (error: unknown) {
//   const err = error as Error; // تحويل مؤقت

//     // ⬅️ هنا نرسل رد JSON في حال الخطأ
//     return NextResponse.json(
//       {
//         msg: err.message || 'Something went wrong',
//         success: false,
//       },
//       { status: 500 }
//     );
// }
// }



// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: "2024-06-20"
// });

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const images: string[] = [];
    const name = formData.get('name') as string;
    const price = parseFloat(formData.get('price') as string);
    const description = formData.get('description') as string;
    const categoryId = formData.get('category') as string;
    const brandId = formData.get('brand') as string;
    const isStocked = formData.get('isStocked') === 'on';

    const uploadPromises: Promise<unknown>[] = [];

    // 🔁 رفع الصور إلى Supabase بدل public/
    for (let index = 1; index <= 4; index++) {
      const image = formData.get(`image${index}`) as File;

      if (image instanceof File && image.name) {
        const buffer = Buffer.from(await image.arrayBuffer());

        const fileName = `products/${Date.now()}-${image.name}`;

        const uploadPromise = supabase.storage
          .from('ecom-store')
          .upload(fileName, buffer, {
            contentType: image.type,
            upsert: true
          })
          .then(({ error }) => {
            if (error) throw error;

            const { data } = supabase.storage
              .from('ecom-store')
              .getPublicUrl(fileName);

            images.push(data.publicUrl); // نحفظ الرابط العام
          });

        uploadPromises.push(uploadPromise);
      }
    }

    await Promise.all(uploadPromises);

    // ⚡️ Stripe Product
    const stripeProduct = await stripe.products.create({
      name,
      description,
      images: images.length ? images : [
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30"
      ],
      metadata: { categoryId, brandId },
    });

    // ⚡️ Stripe Price
    const stripePrice = await stripe.prices.create({
      unit_amount: Math.round(price * 100),
      currency: 'usd',
      product: stripeProduct.id,
    });

    // 💾 Prisma DB
    await prisma.product.create({
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

    revalidateTag('products', 'page');

    return NextResponse.json({
      msg: '✅ Product added successfully (Supabase + Stripe)',
      success: true,
    });

  } catch (error: unknown) {
    const err = error as Error;

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
    revalidateTag("products", "page");
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
