import { Gift } from 'lucide-react'
import React from 'react'
import Link from 'next/link'
const Offers = () => {
  return (
    <Link href='/shop' className='hidden lg:flex items-center gap-2 justify-end group' >
       <Gift className='text-store h-6 w-6 group-hover:text-blue-100 hoverEffect'/>
        <div className=' flex flex-col'  >
            <h4 className='font-bold text-base text-white '>Shop</h4>
            <p className='whitespace-nowrap text-xs'>Latest Offers</p>
        </div>
    </Link>
  )
}

export default Offers