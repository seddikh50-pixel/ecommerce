"use client"
import { AlignLeft } from 'lucide-react'
import React from 'react'
import { useCartStore } from '@/app/store/store'


const MobileMenu = () => {
  const { isMobileListOpen, setIsMobileListOpen } = useCartStore()
  return (
    <button onClick={() => setIsMobileListOpen(true)} className='hover:text-store hoverEffect  lg:hidden'>
      <AlignLeft />
    </button>
  )
}

export default MobileMenu