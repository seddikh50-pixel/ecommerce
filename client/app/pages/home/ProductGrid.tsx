import Container from '@/components/common/Container'
import prisma from '@/lib/prisma'
import React from 'react'
import Products from './Products'

const ProductGrid = async () => {
  const products = await prisma.product.findMany({
    include: {
      category: true, // هذا سيجلب بيانات الكاتيجوري المرتبطة بكل منتج
    },
  });

  return (
    <div>
      <Container>
        <Products products={products} />
      </Container>
    </div>
  )
}

export default ProductGrid