import EditProductForm from '@/components/admin/EditProductForm';
import prisma from '@/lib/prisma'
import { Edit } from 'lucide-react';
import React from 'react'

const page = async ({params}: { params: { slug: string } }) => {
    const { slug } =  await  params;
    const product = await prisma.product.findUnique({
        where: {
            id: slug
        }
    });
    const categories = await prisma.category.findMany();
    const brands = await prisma.brand.findMany();
    
  return (
    <div>
      <EditProductForm product={product} categories={categories} brands={brands} />
    </div>
  )
}

export default page
