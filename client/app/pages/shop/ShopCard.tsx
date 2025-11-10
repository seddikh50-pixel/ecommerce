"use client"
import Image from 'next/image'
import React, { useEffect } from 'react'
import ProductCard from '../home/ProductCard'
import { useCartStore } from '@/app/store/store'
import { Product } from '@/lib/generated/prisma';



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
  const { shopProducts, setShopProducts, setAllShopProducts } = useCartStore()
 
  useEffect(() => {
    setAllShopProducts(products)
    setShopProducts(products)
  }, []);

  return (
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
}

export default ShopCard
