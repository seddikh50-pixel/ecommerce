import ProductForm from '@/components/admin/ProductForm'
import { getAllBrands, getAllCategories } from '@/lib/cache'
import prisma from '@/lib/prisma'
import { get } from 'http'
import React from 'react'


const page = async () => {
  const categories = await getAllCategories()
  const brands = await getAllBrands()

  return (
    <div className='p-5 flex flex-col gap-5'>
          <h1 className='text-white text-3xl'>Add Product</h1>
          <ProductForm categories={categories} brands={brands} />
          <div>    
          </div>
    </div>
  )
}

export default page