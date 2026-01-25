import OneOrderPage from '@/components/admin/OneOrderPage';
import { getAllOrders, getAllProducts } from '@/lib/cache';
import React from 'react'


interface Params {
    params: Promise<{ slug: string }>
}

const page = async ({ params }: Params) => {
    const {slug} = await params

    const allOrders = await getAllOrders()
    const order = allOrders.find((order) => {
        return order.id === slug;
    });

   

    if(!order) return <h1>no orders</h1>
    
    return (
        <div>
           <OneOrderPage order={order}  /> 
        </div>
    )
}

export default page
