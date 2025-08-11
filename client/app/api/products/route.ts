
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {



  return NextResponse.json([{ id: 1, name: 'Product A' }]);
}


export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log(data)

    const formData = await request.formData();
    console.log(formData)
    
    return NextResponse.json({ product: formData })
  } catch (error) {
    return NextResponse.json({ msg: error })
  }
}
