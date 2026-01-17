import prisma from "@/lib/prisma"
import { jwtVerify } from "jose"


export async function userMiddleware(token: string) {
    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET)
        const { payload } = await jwtVerify(token, secret)
        console.log({seddik : payload})
        return {success : true , user : payload}
    } catch (error) {
        console.warn("🚨 تم اكتشاف توكن مزيف أو تم التلاعب به!");
        return { success : false, reason: "invalid_signature" };
    }

}