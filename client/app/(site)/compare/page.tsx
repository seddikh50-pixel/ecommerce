import ComparisonCart from '@/app/pages/cart/ComparisonCart';
import ComparePage from '@/app/pages/home/ComparePage'
import { useCartStore } from '@/app/store/store';
import Container from '@/components/common/Container';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import prisma from '@/lib/prisma';
import Image from 'next/image';
import React from 'react'


const page = async ({
  searchParams,
}: {
  searchParams: { prod1?: string; prod2?: string }
}) => {



  const brands = await prisma.brand.findMany();

  const product1 = await prisma.product.findUnique({
    where: {
      name: searchParams?.prod1 || '',
    },
  });
  const product2 = await prisma.product.findUnique({
    where: {
      name: searchParams?.prod2 || '',
    },
  });


  return (
    <Container>
      {/* <div className='flex justify-between flex-col py-10'>
        <p className='py-10'>product Comparison</p>
        <div>

          <div className='flex justify-between items-center'>
            <h1>Product</h1>
            <h1>{product1?.name} </h1>
            <h1>{product2?.name}</h1>
          </div>

          <div className='flex justify-between items-center'>
              <h1>Image</h1>
              <div className='relative w-60 h-30'><Image fill  alt='' src={product1?.images[0] || ""} /> </div>
               <div className='relative w-60 h-30'><Image fill  alt='' src={product2?.images[0] || ""} /> </div>
          </div>



        </div>

      </div> */}
      <div className="flex flex-col py-10 space-y-6">
        <h2 className="text-xl font-bold">Product Comparison</h2>

        {/* Header row */}
        <div className="flex justify-between bg-gray-100 p-4 font-semibold">
          <div className="w-1/5 font-bold">Feature</div>
          <div className="w-2/5 text-center ">Product-1</div>
          <div className="w-2/5 text-center">Product-2</div>
        </div>

        {/* Name row */}
        <div className="flex justify-between items-center p-4 border">
          <div className="w-1/5 font-bold">Name</div>
          <div className="w-2/5 text-center text-blue-800">{product1?.name || "-"}</div>
          <div className="w-2/5 text-center text-blue-800">{product2?.name || "-"}</div>
        </div>

        {/* Image row */}
        <div className="flex justify-between gap-5 items-center p-4 border">
          <div className="w-1/5 font-bold ">Image</div>
          <div className="w-2/5 relative h-70  rounded-xl overflow-hidden bg-gray-500 flex items-center justify-center">
            {product1?.images?.[0] && (
              <Image fill src={product1.images[0]} alt={product1.name} className="object-cover " />
            )}
          </div>
          <div className="w-2/5 relative h-70 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
            {product2?.images?.[0] && (
              <Image
                fill
                src={product2.images[0]}
                alt={product2.name}
                className="object-cover"
              />
            )}
          </div>
        </div>

        {/* Brand row */}
        <div className="flex justify-between items-center p-4 border">
          <div className="w-1/5 font-bold ">Brand</div>
          <div className="w-2/5 text-center">{brands.find((bra) => bra.id === product1?.brandId || "-")?.name}   </div>
          <div className="w-2/5 text-center">{brands.find((bra) => bra.id === product2?.brandId || "-")?.name}</div>
        </div>

        {/* Price row */}
        <div className="flex justify-between items-center p-4 border">
          <div className="w-1/5 font-bold">Price</div>
          <div className="w-2/5 text-center">${product1?.price || "-"}</div>
          <div className="w-2/5 text-center">${product2?.price || "-"}</div>
        </div>

        {/* Availability row */}
        <div className="flex justify-between items-center p-4 border">
          <div className="w-1/5 font-bold">Availability</div>
          <div className={`w-2/5 text-center ${product1?.isStocked ? 'text-green-600' : 'text-red-600'}`}>
            {product1?.isStocked ? "In Stock" : "Out of Stock"}
          </div>
          <div className={`w-2/5 text-center ${product2?.isStocked ? 'text-green-600' : 'text-red-600'}`}>
            {product2?.isStocked ? "In Stock" : "Out of Stock"}
          </div>
        </div>

        <div className="flex justify-between items-center p-4 border">
          <div className="w-1/5 font-bold">Action</div>

          <div className="w-2/5 text-center">
            <ComparisonCart product={product1!} />
          </div>
          <div className="w-2/5    text-center">
            <ComparisonCart product={product2!} />
          </div>
        </div>

      </div>

    </Container>
  )
}

export default page
