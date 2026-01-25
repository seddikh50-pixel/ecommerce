import { NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import prisma from "@/lib/prisma";
import { revalidateTag } from "next/cache";

export async function POST(req: Request) {
  const buf = Buffer.from(await req.arrayBuffer());
  const signature = req.headers.get("stripe-signature") as string;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      buf,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("❌ Webhook error:", err.message);
      return NextResponse.json({ error: err.message }, { status: 400 });
    }

    console.error("❌ Unknown webhook error:", err);
    return NextResponse.json({ error: "Unknown error" }, { status: 400 });
  }


  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    if (session.payment_status === "paid") {
      const productsRaw = session.metadata?.products ? JSON.parse(session.metadata.products) : [];
      const products = Array.isArray(productsRaw) ? productsRaw : []; 
      const userId = session.metadata?.userId
      const fullName = session.metadata?.useName as string
      if (!userId) {
        throw new Error("Missing userId in Stripe session metadata");
      }

      // const existingOrder = prisma.order.findFirst({where:{userId}})

      const userEmail = session.customer_email
      const order = await prisma.order.create({
        data: {
          stripeSessionId: session.id,
          userId: userId, // ربط الطلب بالمستخدم
          amount: session.amount_total ?? 0,
          email: userEmail!,
          status: "paid",
          items: products,
          fullName : fullName
        }
      })
      revalidateTag('orders')

    }

  }

  return NextResponse.json({ received: true });
}




