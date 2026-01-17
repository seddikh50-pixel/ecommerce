"use client"
import { Home } from 'lucide-react'
import { usePathname } from 'next/navigation'
import React from 'react'

const LinkHeader = () => {
    const pathname = usePathname()
   
  return (
    <div className='py-3 flex justify-start gap-2 items-center'>
        <Home size={20} />
      {pathname.split('/').join('  /  ')}
    </div>
  )
}

export default LinkHeader
