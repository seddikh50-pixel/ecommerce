
"use client"
import { Button } from '@/components/ui/button';
import prisma from '@/lib/prisma';
import { ShoppingCartIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import PriceFormatter from './PriceFormatter';
import { useCartStore } from '@/app/store/store';
interface GoogleUser {
    id: string;
    email: string;
    verified_email: boolean;
    name?: string | null;
    given_name?: string | null;
    family_name?: string | null;
    picture?: string | null;

}



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
  category?: category 
  images: string[];
  price: string;
  description: string;
  categoryId: string;
  brandId: string;
  brand?: brand
  stripeProductId: string | null; // ✅ أضف | null هنا
  stripePriceId: string | null;
};





const ProductCard = ({ product }: { product: Products }) => {
    const { items, addToCart, increaseQuantity, decreaseQuantity } = useCartStore()
    const [user, setUser] = useState<GoogleUser | null>(null);

    const itemCheck = items.find((item) => item.id === product.id)
    return (
        <div className='flex flex-col w-full  justify-start space-y-1 px-3 gap-1 rounded-md group'>
            <Link href={`/product/${product.name}`} className='w-full h-44 relative'>
                <Image loading='lazy' alt={product.images[0]} src={product.images[0]} fill className=' object-contain group-hover:scale-110 hoverEffect' />
            </Link>
            <h2 className='font-light text-sm text-gray-700'>{product.category?.name} </h2>
            <h1 className='line-clamp-1 font-bold text-base'>{product.name} </h1>
            <PriceFormatter price={product.price} />



            {itemCheck && itemCheck.quantity > 0 ? <div className=' h-10' >
                <div className='flex justify-between border-b pb-1   '>
                    <h3>Quantity</h3>
                    <div className='flex gap-3 font-bold  '>
                        <button className='text-md w-5 ' onClick={() => decreaseQuantity(product.id)}>-</button>
                        <div className='text-md w-5  flex justify-center items-center'>{items.find((item) => item.id === product.id)?.quantity} </div>
                        <button className='text-md w-5 ' onClick={() => increaseQuantity(product.id)} >+</button>
                    </div>
                </div>
                <div className='flex justify-between pt-1'>
                    <h3>Total</h3>
                    <h1>{+product.price * itemCheck.quantity} </h1>
                </div>
            </div> : <div className=' h-10'><Button onClick={() => addToCart(product)} className='max-w-36 rounded-full bg-store hover:bg-store/90'><ShoppingCartIcon /> Add to Cart</Button></div>
            }

        </div>
    )
}

export default ProductCard