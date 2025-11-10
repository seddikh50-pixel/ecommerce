"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import ProductCard from '../home/ProductCard'
import { useCartStore } from '@/app/store/store'
import { Product } from '@/lib/generated/prisma';
import AppLoader from '@/components/common/Loading'
import { Loader2 } from 'lucide-react'
import { motion } from "motion/react";



interface category {
  id: string
  name: string
  image: string
}

interface brand {
  id: string
  name: string
  image: string
}


interface Products {
  isStocked: boolean;
  name: string;
  id: string;
  category: category
  images: string[];
  price: string;
  description: string;
  categoryId: string;
  brandId: string;
  brand: brand
  stripeProductId: string | null; // ✅ أضف | null هنا
  stripePriceId: string | null;
};

interface ListProducts {
  products: Products[]
}

const ShopCard = ({ products }: ListProducts) => {
  const { shopProducts, setShopProducts, setAllShopProducts, loading } = useCartStore()


  useEffect(() => {
    setAllShopProducts(products)
    setShopProducts(products)
  }, []);



  return (
    <>

      {


        shopProducts.length ?
          // loading ?
          //   <div>
          //     <div className="flex gap-3 justify-center items-center">
          //       <h1 className="text-store text-xl font-bold">SedTech</h1>
          //       <Image alt="SedTech logo" width={50} height={50} src="/storelogo.png" />
          //     </div>
          //     <motion.div
          //       animate={{ scale: [1, 1.1, 1] }}
          //       transition={{
          //         repeat: Infinity,
          //         duration: 1.5,
          //         ease: "easeInOut",
          //       }}

          //       className="flex gap-3 justify-center items-center"
          //     >
          //       <Loader2 className="animate-spin text-blue-700" />
          //       <h1 className="text-blue-700 font-bold">sedtech is loading..</h1>
          //     </motion.div></div> :


          (
            loading ?
              <div className=' w-full flex justify-center items-center'>
                <div className="flex gap-3 justify-center items-center">
                  <h1 className="text-store text-xl font-bold">SedTech</h1>
                  <Image alt="SedTech logo" width={50} height={50} src="/storelogo.png" />
                </div>
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "easeInOut",
                  }}

                  className="flex gap-3 justify-center items-center"
                >
                  <Loader2 className="animate-spin text-blue-700" />
                  <h1 className="text-blue-700 font-bold">sedtech is loading..</h1>
                </motion.div></div> :
              <div className='flex-1'>
                <div className='grid grid-cols-4 gap-2 w-full  '>
                  {shopProducts.map((product, index) => {
                    return (
                      <div className='w-full bg-white py-5 rounded-md' key={index}>
                        <ProductCard product={product} />
                      </div>
                    )
                  })}
                </div>
              </div>

          )
          :
          <div className='flex justify-center flex-col items-center w-full gap-5 p-10'>
            <h1 className='text-xl font-bold'>No Product Available</h1>
            <p>We re sorry, but there are no products matching on criteria at the moment.</p>
            <div className='flex animate-pulse text-store gap-2 '>
              <Loader2 className='animate-spin' />
              <h1>Were restocking shortly</h1>
            </div>
            <p>Please check back later or explore our other product categories.</p>
          </div>
      }


    </>

  )
}

export default ShopCard
