"use client"
import { useCartStore } from '@/app/store/store';

import Container from '@/components/common/Container';
import { ShoppingBagIcon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import LinkHeader from '../LinkHeader';
import { usePathname } from 'next/navigation';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


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
  price: number;
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
  const pathName = usePathname()
  const { increaseQuantity, decreaseQuantity, items,removeFromCart } = useCartStore()
  const router = useRouter()
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const localItem = localStorage.getItem('cart-storage')
    if (localItem) {
      const itemsData = JSON.parse(decodeURIComponent(localItem));
      setCart(itemsData.state.items)

    }
  }, [items]);



  return (
    <>
      <LinkHeader pathName={pathName} />
      <Container >
        <div className=''>
          <div className='flex gap-2 pt-5'>
            <ShoppingBagIcon />
            <h1>Shopping Cart</h1>
          </div>
        </div>
        {
          !cart.length ? <h1>no carts</h1> :
            <div className='pt-5'>
              <Table>
                {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Image	</TableHead>
                    <TableHead>Product Name	</TableHead>
                    <TableHead>Model</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Unit Price</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cart.map((c) => (
                    <TableRow key={c.id}>
                      {/* الصورة */}
                      <TableCell>
                        <div className="relative w-16 h-16">
                          <Image
                            src={c.images[0]}
                            alt={c.name}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                      </TableCell>

                      {/* باقي الأعمدة */}
                      <TableCell className="font-medium">{c.name}</TableCell>
                      <TableCell>{c.brand.name}</TableCell>
                      <TableCell>
                        {items.find((item) => item.id === c.id)?.quantity ?? 0 > 0 ? <div className='flex gap-3 font-bold  '>
                          <button className='text-md w-5 ' onClick={() => decreaseQuantity(c.id)}>-</button>
                          <div className='text-md w-5  flex justify-center items-center'>  {items.find((item) => item.id === c.id)?.quantity}  </div>
                          <button className='text-md w-5 ' onClick={() => increaseQuantity(c.id)} >+</button>
                        </div> : ""}



                      </TableCell>
                      <TableCell>${c.price}</TableCell>
                      <TableCell>${c.price * c.quantity}</TableCell>
                      <TableCell>
                        <button
                             onClick={()=> removeFromCart(c.id)}
                          className="text-red-500 hover:underline"
                        >
                          Remove
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>


            </div>
        }
      </Container>
    </>


  )
}

export default CartItem
