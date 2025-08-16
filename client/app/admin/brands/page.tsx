import BrandForm from '@/components/admin/BrandForm'
import ListBrands from '@/components/admin/ListBrands'
import prisma from '@/lib/prisma'
import React from 'react'

const page =async () => {
    const getBrands = await prisma.brand.findMany() 
  return (
    <div className='flex'>
      <BrandForm/>
      <ListBrands brands={getBrands} />
    </div>
  )
}

export default page