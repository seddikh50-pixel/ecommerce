import ProductForm from '@/components/admin/ProductForm'
import prisma from '@/lib/prisma'
import React from 'react'


const page = async () => {
  const categories = await prisma.category.findMany()

  return (
    <div className='p-5 flex flex-col gap-5'>
          <h1 className='text-white text-3xl'>Add Product</h1>
          <ProductForm categories={categories} />
          <div>
          
          </div>
    </div>
  )
}

export default page