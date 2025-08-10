import CategoryForm from '@/components/admin/CategoryForm'
import ListCategories from '@/components/admin/ListCategories'
import prisma from '@/lib/prisma'
import React from 'react'

const page = async () => {
  const categories = await prisma.category.findMany()

  return (
    <div className='flex'>

      <CategoryForm />
      <div className='text-white'>
        <ListCategories categories={categories}/>
      </div>


    </div>
  )
}

export default page