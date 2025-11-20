import CategoryForm from '@/components/admin/CategoryForm'
import ListCategories from '@/components/admin/ListCategories'
import prisma from '@/lib/prisma'
import React from 'react'

const page = async () => {
  const categories = await prisma.category.findMany()

  return (
    <div className='flex gap-10 xl:flex-row lg:flex-row md:flex-col sm:flex-col flex-col '>
      <CategoryForm />
      <div className='text-white  flex-1 '>
        <ListCategories categories={categories}/>
      </div>


    </div>
  )
}

export default page