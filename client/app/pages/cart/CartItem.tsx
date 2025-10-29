"use client"

import Container from '@/components/common/Container';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'


interface Brand {
  id: string;
  name: string;
  image: string;
}

interface Category {
  id: string;
  name: string;
  image: string;
}

interface CartItem {
  id: string;
  name: string;
  price: string;
  quantity: number;
  description: string;
  images: string[];
  isStocked: boolean;
  brandId: string;
  categoryId: string;
  brand: Brand;
  category: Category;
}

const CartItem = () => {
  const router = useRouter()
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {

    const localItem = localStorage.getItem('cart-storage')

    if (localItem) {
      const itemsData = JSON.parse(decodeURIComponent(localItem));
      setCart(itemsData.state.items)

    }

  }, []);



  return (
    <Container>
      {
        !cart.length ? <h1>no carts</h1> : 
        <div>
        {cart.map((car, index) => {
          return (
            <div key={index}>
              <h1 key={index}>{car.name} </h1>
              <div className=' relative w-30 h-30'>
                <Image src={car.images[0]} fill alt='' />
              </div>
                <h1>{car.quantity}</h1>
            </div>
          )
        })}
      
      </div> 
      }
    </Container>

  )
}

export default CartItem
