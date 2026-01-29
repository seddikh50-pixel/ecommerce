import React from 'react'
import Link from 'next/link'
import { Zap } from 'lucide-react'
const Deal = () => {
  return (
       <Link href='/' className='hidden lg:flex items-center gap-2 justify-end group' >
       <Zap className='text-store h-6 w-6 group-hover:text-blue-100 hoverEffect'/>
        <div className=' flex flex-col'  >
            <h4 className='font-bold text-base text-white '>TV Deal</h4>
            <p className='whitespace-nowrap text-xs'>Special Deals</p>
        </div>
    </Link>
  )
}

export default Deal