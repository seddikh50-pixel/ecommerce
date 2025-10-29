import prisma from "@/lib/prisma";
import { jwtVerify, JWTPayload } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";


interface JwtPayload extends JWTPayload {
    id: string;
    email: string;
    name: string;
    picture?: string;
}

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function POST(request: Request) {
    try {
        const authHeader = request.headers.get('Authorization');
        const body = await request.json()

        const { cart } = body
        
        const token = authHeader ? authHeader.split(' ')[1] : null;
      
     
 


        if (!token) {
            return NextResponse.json({ msg: "Not logged in" }, { status: 401 });
        }

        const { payload } = await jwtVerify(token, secret)
        const userPayload = payload as JwtPayload

        const newUser = await prisma.user.upsert({
            where: { id: userPayload.id },
            update: { cart },
            create: {
                id: userPayload.id,
                email: userPayload.email,
                name: userPayload.name,
                picture: userPayload.picture,
                cart
            }
        })
        // console.log(newUser.cart.state)
        return NextResponse.json({ success: true, msg: "Welcome!", user: newUser }, { status: 200 })
    } catch {
        return NextResponse.json({ success: false, msg: "Invalid or expired token" }, { status: 401 });
    }
}