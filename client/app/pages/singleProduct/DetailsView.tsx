"use client"
import { useCartStore } from '@/app/store/store';
import { Button } from '@/components/ui/button';
import { CircleQuestionMark, GitCompare, Heart, Share, ShoppingBasket, StarIcon, Truck } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import { FaQuestion } from 'react-icons/fa';
import { MdDeliveryDining } from 'react-icons/md';
type Brand = {
  id: string;
  name: string;
  image: string;
};

type Category = {
  id: string;
  name: string;
  image: string;
};

type Product = {
  id: string;
  name: string;
  images: string[];
  price: string;
  description: string;
  brandId: string;
  categoryId: string;
  brand: Brand;
  category: Category;
  isStocked: boolean;
  stripeProductId: string | null
  stripePriceId: string | null
};

//
// 🧩 تعريف نوع الـ Props
//
type DetailsViewProps = {
  product: Product;
};

const DetailsView = ({ product }: DetailsViewProps) => {
  const {addToCart} = useCartStore()
   const choices = [
    {
      name : "Compare color",
      icon : <GitCompare size={20}/>
      
    },
      {
      name : "Ask a question",
      icon : <CircleQuestionMark size={20}/>
      
    },
      {
      name : "Delivery & Return",
      icon : <Truck size={20}/>
      
    },
      {
      name : "Share",
      icon : <Share size={20}/>
      
    }
   ]
  return (
    <>
     <div className='w-full md:w-3/5  '>
            <div className=' '>
              <h3 className='text-2xl font-bold'>{product?.name}</h3>
              <h3>{product?.description}</h3>
            </div>
            <div className='border-b border-gray-200'>
              <div className='flex  items-center gap-1 pb-5  '>
                {[...Array(5)].map((_, index) => {
                  return (

                    <div key={index}>
                      <StarIcon size={15} fill='green' className=' ' />
                    </div>

                  )
                })}
                <p className='font-semibold text-xs pt-1'>{"(120)"} </p>
              </div>
            </div>
            <div className='pt-5 border-b border-gray-200 space-y-2 pb-5'>
              <div className='flex gap-2'>
                <h1 className='text-violet-500 text-lg font-medium mb-1'>${product?.price} </h1>
                <h1 className='text-gray-500 line-through text-lg font-medium mb-1'>${+product?.price + 400} </h1>
              </div>
              {product?.isStocked ? <h3 className='text-green-700 bg-green-100 inline px-2 py-1 rounded-sm mb-5'>In Stock</h3> : <h3 className='text-red-700 inline bg-red-200'>Out Of Stock</h3>}
            </div>
            <div className='flex items-center gap-2 py-5 border-b border-gray-200 '>
              <Button onClick={() => addToCart(product)} className='flex-1 bg-violet-500 hover:bg-violet-400'><ShoppingBasket /> Add To Cart </Button>
              <Heart size={35} className='border p-1 rounded-sm border-violet-500 text-violet-500' />
            </div>
            <div className='grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 justify-between border-b py-5'>
              {
                choices.map((item,index)=> {
                  return (
                    <Link href={"/"} key={index} className='flex justify-center items-center gap-2'>
                      <h1 >{item.icon}</h1>
                      <h1>{item.name} </h1>
                    </Link>
                  )
                })
              }
            </div>
            {/* <div>
              <ProductCharastiristics  />
            </div> */}
          </div>
    </>
  )
}

export default DetailsView
