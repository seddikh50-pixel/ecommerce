import prisma from "@/lib/prisma";
import { NextResponse } from "next/server"



export async function GET(request: Request) {
    try {
        const users = prisma.user.findMany()
        return NextResponse.json({users : users })
    } catch (error) {
        
    }
    
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { user, cart } = body;

        const newUser = await prisma.user.upsert({
            where: { id: user.id },
            update: {
                name: user.name,
                email: user.email,
                picture: user.picture,
                cart: cart,
            },
            create: {
                id: user.id,
                name: user.name,
                email: user.email,
                picture: user.picture,
                cart: cart,
            }
        })
        return NextResponse.json({
            message: "تم استلام البيانات بنجاح",
        });
    } catch (error) {
        console.log(error)
    }
}