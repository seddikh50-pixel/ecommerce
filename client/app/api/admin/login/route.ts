import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';


export async function POST(request: Request) {
   
    const { email, password } = await request.json()

    if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
        return NextResponse.json({message : ""})
       
    }
      const token = await new SignJWT({ role: "admin" })
            .setProtectedHeader({ alg: "HS256" })
            .setExpirationTime("1h")
            .sign(new TextEncoder().encode(process.env.ADMIN_SECRET_KEY));
        return NextResponse.json({ token : token }, {status: 200});
    
}