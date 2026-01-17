import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers'



export async function POST(request: Request) {

    const { email, password } = await request.json()
    console.log(email,password)
    if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
        return NextResponse.json({ success: false, error: "wrong crendtials" }, { status: 404 })
    }
    const token = await new SignJWT({ role: "admin" })
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("1h")
        .sign(new TextEncoder().encode(process.env.ADMIN_SECRET_KEY));

    const cookieStore = await cookies()
    cookieStore.set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60,
    })

    return NextResponse.json({ success: true , msg : 'Logged in successfully' }, { status: 200 });

}