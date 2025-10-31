"use client"
import { ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { useCartStore } from '@/app/store/store'

const Carticon = () => {
  const {items } = useCartStore()
  return (
    <Link href='/cart' className='flex items-center gap-2 justify-end group' >
      <span className='relative'>
        <ShoppingBag className='text-store h-6 w-6 group-hover:text-blue-100 hoverEffect' />
        {items.length ? <span className='absolute text-white text-xs -right-1 -top-1 bg-store w-4 rounded-full h-4 flex justify-center items-center'>{items.length} </span> : ""}
      </span>
      <div className='hidden lg:flex flex-col'  >
        <h4 className='font-bold text-base text-white '>Cart</h4>
        <p className='whitespace-nowrap text-xs'>View cart</p>
      </div>
    </Link>
  )
}

export default Carticon