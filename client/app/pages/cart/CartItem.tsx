"use client"
import { useCartStore } from '@/app/store/store';

import Container from '@/components/common/Container';
import { Delete, DeleteIcon, RemoveFormatting, ShoppingBagIcon, Trash } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import LinkHeader from '../LinkHeader';
import { usePathname } from 'next/navigation';
import {
  Table,
  TableBody,
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
  const { increaseQuantity, decreaseQuantity, items, removeFromCart } = useCartStore()
  const [cart, setCart] = useState<CartItem[]>([]);

  // useEffect(() => {
  //   const localItem = localStorage.getItem('cart-storage')
  //   if (localItem) {
  //     const itemsData = JSON.parse(decodeURIComponent(localItem));
  //     setCart(itemsData.state.items)

  //   }
  // }, [items]);

  useEffect(() => {
  const localItem = localStorage.getItem('cart-storage');
  if (localItem) {
    try {
      const itemsData = JSON.parse(localItem); // ❌ لا decodeURIComponent
      setCart(itemsData.state.items);
    } catch (err) {
      console.warn("Failed to parse cart-storage:", err);
      setCart([]); // قيمة افتراضية عند الفشل
    }
  }
}, [items]);



  return (
    <>
      <LinkHeader pathName={pathName} />
      <Container className='bg-white rounded-md p-4 mt-5' >
        <div className=''>
          <div className='flex gap-2 pt-5'>
            <ShoppingBagIcon />
            <h1 className='text-2xl font-bold'>Shopping Cart</h1>
          </div>
        </div>
        {
          !cart.length ? <h1>no carts</h1> :
            <div className="w-full mt-7">
              {/* 🖥️ جدول للشاشات المتوسطة وما فوق */}
              <div className="hidden md:block overflow-x-auto rounded-lg border  bg-white border-gray-200">
                <Table className="min-w-full">
                  <TableHeader className=''>
                    <TableRow >
                      <TableHead className="font-bold w-[100px]">Image</TableHead>
                      <TableHead className='font-bold'>Product Name</TableHead>
                      <TableHead className='font-bold'>Model</TableHead>
                      <TableHead className='font-bold'>Quantity</TableHead>
                      <TableHead className='font-bold'>Unit Price</TableHead>
                      <TableHead className='font-bold'>Total</TableHead>
                      <TableHead className='font-bold'>Action</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {cart.map((c) => {
                      const quantity = items.find((item) => item.id === c.id)?.quantity ?? 0;

                      return (
                        <TableRow key={c.id}>
                          <TableCell>
                            <div className="relative w-20  h-25 border rounded-sm flex justify-center items-center">
                              <Image
                                src={c.images[0]}
                                alt={c.name}
                                width={300}
                                height={300}
                                className="object-cover  rounded-md"
                              />
                            </div>
                          </TableCell>
                          <TableCell className="font-semibold">{c.name.slice(0,10)}...</TableCell>
                          <TableCell>{c.brand.name}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-3 font-bold">
                              <button
                                onClick={() => decreaseQuantity(c.id)}
                                className="w-6 h-6 flex justify-center items-center border rounded hover:bg-gray-100"
                              >
                                -
                              </button>
                              <span>{quantity}</span>
                              <button
                                onClick={() => increaseQuantity(c.id)}
                                className="w-6 h-6 flex justify-center items-center border rounded hover:bg-gray-100"
                              >
                                +
                              </button>
                            </div>
                          </TableCell>
                          <TableCell>${c.price}</TableCell>
                          <TableCell>${c.price * c.quantity}</TableCell>
                          <TableCell>
                            <button
                              onClick={() => removeFromCart(c.id)}
                              className="text-red-500 hover:underline"
                            >
                              <Trash />
                            </button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>

              {/* 📱 عرض بطاقات في الشاشات الصغيرة */}
              <div className="block md:hidden space-y-4">
                {cart.map((c) => {
                  const quantity = items.find((item) => item.id === c.id)?.quantity ?? 0;

                  return (
                    <div
                      key={c.id}
                      className="border border-gray-200 rounded-xl p-3 flex flex-col gap-3 shadow-sm"
                    >
                      <div className="flex gap-3 items-center justify-between">
                        <div className="relative w-20 h-20  flex-shrink-0">
                          <Image
                            src={c.images[0]}
                            alt={c.name}
                            fill
                            className="object-cover rounded-md"
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-semibold text-sm">{c.name.slice(0,20)}..</span>
                          <span className="text-gray-500 text-xs">{c.brand.name}</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">Quantity:</span>
                        <div className="flex items-center gap-2 font-bold">
                          <button
                            onClick={() => decreaseQuantity(c.id)}
                            className="w-7 h-7 flex justify-center items-center border rounded hover:bg-gray-100"
                          >
                            -
                          </button>
                          <span>{quantity}</span>
                          <button
                            onClick={() => increaseQuantity(c.id)}
                            className="w-7 h-7 flex justify-center items-center border rounded hover:bg-gray-100"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Unit Price:</span>
                        <span>${c.price}</span>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Total:</span>
                        <span>${c.price * c.quantity}</span>
                      </div>

                      <button
                        onClick={() => removeFromCart(c.id)}
                        className="text-red-500 text-sm mt-2 self-end hover:underline"
                      >
                        <Trash />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
      
        }
      </Container>
    </>


  )
}

export default CartItem
