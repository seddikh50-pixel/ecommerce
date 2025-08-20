import NotFound from '@/app/not-found';
import prisma from '@/lib/prisma';
import React from 'react'

interface Params {
  params: {
    slug: string;
  };
}

const SingleProduct =async ({params} : Params) => {
  const {slug} = await params
  const productName = decodeURIComponent(slug);
  const Product = await prisma.product.findUnique({
  where: {
    name: productName,
  },
})
if(!Product){
  return <NotFound/>
}

  return (
    <div>{Product.name} </div>
  )
}

export default SingleProduct