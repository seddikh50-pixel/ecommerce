import BrandForm from '@/components/admin/BrandForm'
import ListBrands from '@/components/admin/ListBrands'
import { getAllBrands } from '@/lib/cache'
import prisma from '@/lib/prisma'
import { get } from 'http'
import React from 'react'

const page =async () => {
    const getBrands = await getAllBrands()
   
  return (
    <div className='flex xl:flex-row lg:flex-row md:flex-col sm:flex-col flex-col    '>
      <BrandForm/>
      <ListBrands brands={getBrands} />
    </div>
  )
}

export default page