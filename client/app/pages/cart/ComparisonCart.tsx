"use client"
import { useCartStore } from '@/app/store/store'
import { Button } from '@/components/ui/button';
import { ShoppingCartIcon } from 'lucide-react';
import React from 'react'


interface Products {
    name: string;
    id: string;
    images: string[];
    price: string;
    description: string;
    categoryId: string;
    brandId: string;
    isStocked: boolean;
    stripeProductId: string | null;
    stripePriceId: string | null;
}

const ComparisonCart = ({ product }: { product: Products }  ) => {
    console.log(product)
    const { addToCart, items, decreaseQuantity, increaseQuantity } = useCartStore()
    console.log(items)

      const itemCheck = items.find((item) => item.id === product?.id)


    return (
        <div>

            
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

export default ComparisonCart
