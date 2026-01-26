import Header from '@/components/header/Header'
import prisma from '@/lib/prisma'
import React from 'react'

const page = async () => {
 const products = await prisma.product.findMany({
  include: {
    category: true,
    brand: true,
  },
})
  return (
    <div>
        <Header  products={products} />
    </div>
  )
}

export default page