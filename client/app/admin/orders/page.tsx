import ListOrders from '@/components/admin/ListOrders'
import { getAllOrders, getAllProducts, getAllUsers } from '@/lib/cache'
import { enqueueSnackbar } from 'notistack'
import React from 'react'

const page = async () => {
  const orders = await getAllOrders()
  const products = await getAllProducts()
  const users = await getAllUsers()


  
  return (
    <div>
      <ListOrders orders={orders} products={products}/>
    </div>
  )
}

export default page