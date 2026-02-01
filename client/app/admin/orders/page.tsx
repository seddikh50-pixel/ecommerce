import ListOrders from '@/components/admin/ListOrders'
import { getAllOrders, getAllProducts, getAllUsers } from '@/lib/cache'
import prisma from '@/lib/prisma'
import { enqueueSnackbar } from 'notistack'
import React from 'react'

const page = async () => {
  const orders = await prisma.order.findMany()
  const products = await prisma.product.findMany()



  
  return (
    <div>
      <ListOrders orders={orders} products={products}/>
    </div>
  )
}

export default page