import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { revalidateTag } from "next/cache";

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { userId, items, amount, address, status } = body 

//               id              String   @id @default(uuid())
//   fullName        String
//   stripeSessionId String   @unique
//   email           String
//   userId          String
//   user            User     @relation(fields: [userId], references: [id])
//   amount          Int
//   status          String
//   items           Json // هنا نخزن المنتجات
//   createdAt       DateTime @default(now())
        const newOrder = await prisma.order.create({
            data: {
                userId,
                items,
                amount,
                status,
                email: address.email,
                fullName: `${address.firstName} ${address.lastName}`,
                stripeSessionId: address.stripeSessionId
            }
        })
        revalidateTag("orders")
        return NextResponse.json({ success: true, order: newOrder }, { status: 201 })
    } catch (error) {   
        console.log(error)
        return NextResponse.json({ success: false, message: "Failed to create order", error }, { status: 500 })
    }
}


