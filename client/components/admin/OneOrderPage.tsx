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
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-lg border border-gray-200 mt-40">
  {/* عنوان الطلب */}
  <h1 className="text-2xl font-bold mb-4 text-gray-800">Order details </h1>

  {/* معلومات العميل */}
  <div className="grid grid-cols-2 gap-4 mb-6">
    <div>
      <p className="text-gray-500 text-sm"> Full name</p>
      <p className="text-gray-800 font-medium">{order.fullName}</p>
    </div>
    <div>
      <p className="text-gray-500 text-sm"> Email adress</p>
      <p className="text-gray-800 font-medium">{order.email}</p>
    </div>
    <div>
      <p className="text-gray-500 text-sm">Status </p>
      <p className={`font-medium ${
        order.status === "paid" ? "text-green-600" : "text-yellow-600"
      }`}>
        {order.status}
      </p>
    </div>
    <div>
      <p className="text-gray-500 text-sm"> Total amount</p>
      <p className="text-gray-800 font-medium">${order.amount}</p>
    </div>
  </div>

  {/* منتجات الطلب */}
  <h2 className="text-xl font-semibold mb-3 text-gray-700"> Bought Products</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {matchedProducts.map((product, index) => (
      <div
        key={index}
        className="flex items-center bg-gray-50 rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow"
      >
        {/* صورة المنتج */}
        {product.images && (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-16 h-16 object-cover rounded-lg mr-4"
          />
        )}
        {/* بيانات المنتج */}
        <div>
          <p className="font-medium text-gray-800">{product.name.slice(0,40)}</p>
          {/* <p className="text-gray-500 text-sm">الكمية: {product.}</p> */}
          <p className="text-gray-800 font-semibold">${product.price}</p>
        </div>
      </div>
    ))}
  </div>
</div>

        // <div>
        //     <h1> {order.fullName}</h1>
        //     <h1> {order.email}</h1>
        //     <h1> {order.status}</h1>
        //     <h1>  {order.amount}</h1>
        //     <h1> bought products </h1>
        //     <div>
        //         {matchedProducts.map((product, index) => {
        //             return (
        //                 <h1 key={index}>{product?.name} </h1>
        //             )
        //         })}
        //     </div>

        // </div>
    )
}

export default OneOrderPage






