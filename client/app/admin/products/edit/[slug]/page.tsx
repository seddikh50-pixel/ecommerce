import EditProductForm from '@/components/admin/EditProductForm';
import { getAllBrands, getAllCategories } from '@/lib/cache';
import prisma from '@/lib/prisma'
import { Edit } from 'lucide-react';
import React from 'react'

const page = async ({params}: { params: Promise<{ slug: string }> }) => {
    const { slug } =  await  params;
    const product = await prisma.product.findUnique({
        where: {
            id: slug
        }
    });
    const categories = await getAllCategories();
    const brands = await getAllBrands();
    
  return (
    <div>
      <EditProductForm product={product} categories={categories} brands={brands} />
    </div>
  )
}

export default page
