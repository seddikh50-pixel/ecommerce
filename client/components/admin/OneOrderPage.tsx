import { getAllProducts } from '@/lib/cache';
import { Category } from '@/lib/generated/prisma';
import { JsonValue } from '@/lib/generated/prisma/runtime/library';
import React from 'react'


interface Order {
    id: string;
    createdAt: Date;
    email: string;
    stripeSessionId: string;
    userId: string;
    amount: number;
    status: string;
    items: JsonValue;  // نتركها JSON
    fullName: string
}

interface Product {
    isStocked: boolean;
    name: string;
    id: string;
    category: Category
    images: string[];
    price: string;
    description: string;
    categoryId: string;
    brandId: string;
    stripeProductId: string | null; // ✅ أضف | null هنا
    stripePriceId: string | null;
};


interface OrderItem {
  stripePriceId: string;
  quantity: number; // أو string إذا جلبتها هكذا
}







interface OneOrderPageProps {
    order: Order;

}



const OneOrderPage = async ({ order }: OneOrderPageProps) => {

    const products = await getAllProducts()
    const items = typeof order.items === "string" ? JSON.parse(order.items) : order.items
    
    const matchedProducts : Product[] = items.map((item  :{  stripePriceId: string ,quantity: number })=>{
        const product = products.find((product)=> product.stripePriceId === item.stripePriceId )
        if(!product) return null

        return {
            ...product,
            quantity : item.quantity
        }
    }
        
    )
  

    return (
        <div>
            <h1> {order.fullName}</h1>
            <h1> {order.email}</h1>
            <h1> {order.status}</h1>
            <h1>  {order.amount}</h1>
            <h1> bought products </h1>
            <div>

                {/* {matchedPorducts.map((product, index) => {
                    return (
                        <h1 key={index}>{product.name} </h1>
                    )
                })} */}
            </div>

        </div>
    )
}

export default OneOrderPage






//   const matchedPorducts: Product[] = items.map((item: { stripePriceId: string, quantity: string }) => {
//         const product = products.find((product) => product.stripePriceId === item.stripePriceId)
//         if (!product) return null

//         return {
//             ...product,
//             quantity: Number(item.quantity)
//         }
//     }
//     )