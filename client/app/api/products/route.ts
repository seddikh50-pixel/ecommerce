   
import { NextResponse } from 'next/server';

export async function GET(request : Request) {

  

  return NextResponse.json([{ id: 1, name: 'Product A' }]);
}


export async function POST(request: Request) {
  const data = await request.json();
  console.log(data)
  // Here you would typically save the product to a database
  return NextResponse.json({ message: 'Product created', product: data }, { status: 201 });
}
