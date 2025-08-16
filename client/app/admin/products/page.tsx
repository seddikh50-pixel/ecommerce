
import Products from '@/components/admin/Products'
import prisma from '@/lib/prisma'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


const page = async () => {
  const products = await prisma.product.findMany()

  return (
    <div>
      <div>
        <div className='flex justify-between px-10 p-5'>
          <div className='text-white text-2xl'>List Of products</div>
          <Link href={"products/add"} className='text-black border px-5 py-1 border-white font-bold rounded-sm bg-white'>Add Product</Link>

        </div>
        <div>
         <Products products={products}/>
        </div>
      </div>
    </div>
  )
}

export default page