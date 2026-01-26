
import Products from '@/components/admin/Products'
import { getAllProducts } from '@/lib/cache'
import prisma from '@/lib/prisma'
import { get } from 'http'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


const page = async () => {

  const products = await getAllProducts()




  return (
    <div className=''>
      <div>
        <div className='flex justify-between px-10 p-5'>
          <div className='text-white xl:text-2xl lg:text-2xl md:text-xl sm:text-lg'>List Of products</div>
          <Link href={"products/add"} className='text-white border xl:text-lg lg:text-lg md:text-lg sm:text-md px-5 py-1 border-white  rounded-sm bg-black'>Add Product</Link>

        </div>
        <div className=''>

          <Products products={products} />
        </div>
      </div>
    </div>
  )
}

export default page