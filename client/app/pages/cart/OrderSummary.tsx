"use client"
import Container from '@/components/common/Container'
import React, { useEffect, useState } from 'react'
import { useCartStore } from '@/app/store/store'
import { Button } from '@/components/ui/button'



const OrderSummary = () => {
  const { items, user } = useCartStore()
  const [total, setTotal] = useState<number>();
  useEffect(() => {
    // if (items && items.length > 0) {
    const total = items.reduce((acc, cur) => acc + Number(cur.price) * (cur.quantity || 1), 0)
    setTotal(total)
    // }

  }, [items]);



  const handleCheckout = async () => {

    try {
      // نحضّر البيانات التي سنرسلها إلى API
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map(item => ({
            stripePriceId: item.stripePriceId, // من قاعدة البيانات
            quantity: item.quantity || 1,
          })),
          user: user
        }),




      });

      const data = await response.json();
      console.log(data)
  

      if (data.url) {
        // تحويل المستخدم إلى صفحة الدفع في Stripe
        window.location.href = data.url;
      } else {
        alert("❌ حدث خطأ أثناء إنشاء جلسة الدفع.");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("⚠️ تعذر الاتصال بخدمة الدفع.");
    }
  };



  return (
    <div>
      <Container>
        <div className='w-full xl:w-[500px] lg:w-[500px] md:w-[400px] border rounded-sm bg-white p-6 mt-5 flex flex-col space-y-4 '>
          <h1 className='font-bold'>Order Summary</h1>
          <div className='flex justify-between items-center'>
            <h1>Subtotal</h1>
            <p>${total} </p>
          </div>
          <div className='flex justify-between items-center'>
            <h1>Discount</h1>
            <p>$0</p>
          </div>
          <div className='flex justify-between items-center'>
            <h1 className='font-bold'>Total</h1>
            <p>${total} </p>
          </div>
          {/* <Button  className='bg-store font-bold text-sm tracking-widest'>Confirm Order</Button> */}
          <Button onClick={handleCheckout}>purchase</Button>
        </div>
      </Container>


    </div>
  )
}

export default OrderSummary
