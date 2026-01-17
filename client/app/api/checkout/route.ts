import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { revalidateTag } from "next/cache";

interface CheckoutItem {
  stripePriceId: string;
  quantity: number;
}

export async function POST(req: Request) {
  try {
    const { items, user } = await req.json();
    
    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items provided" }, { status: 400 });
    }

    // 🧾 إنشاء جلسة الدفع
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: user.email,
      line_items: items.map((item: CheckoutItem) => ({
        price: item.stripePriceId,
        quantity: item.quantity,
      })),
      success_url: `${process.env.NEXT_PUBLIC_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/cancel`,
      metadata: {
        products: JSON.stringify(items),
        userId: user.id,
        useName: user.name
      }
    });



    return NextResponse.json({ url: session.url });
  } catch (error: unknown) {
    const err = error as Error; // تحويل مؤقت
    console.log(err.message);
  }
}
