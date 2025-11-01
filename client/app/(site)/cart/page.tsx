import CartItem from '@/app/pages/cart/CartItem'
import OrderSummary from '@/app/pages/cart/OrderSummary'
import prisma from '@/lib/prisma'
import React from 'react'

const page = async () => {
      
  return (
    <div className='bg-gray-100 p-4'>
     <CartItem/>
      <OrderSummary/>
      
    </div>
  )
}

export default page
