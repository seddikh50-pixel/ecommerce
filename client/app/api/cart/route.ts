import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { json } from "stream/consumers";



export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { userId } = body
        
        if (!userId) {
            return NextResponse.json({ success: false, msg: "you have to login ", status: 401 })
        }
        const user = await prisma.user.findUnique({ where: { id: `${userId}` } })
        if (!user) {
            return NextResponse.json(
                { success: false, msg: "user not found, please login again" },
                { status: 401 }
            );
        }
        return NextResponse.json({ success: true, cart: user.cart, status: 200 })
    } catch (error) {
        console.error("❌ Error in /api/cart:", error);

        return NextResponse.json(
            { success: false, msg: "Server error" },
            { status: 500 }
        );
    }
}