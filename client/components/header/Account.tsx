import { User } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Account = () => {
  return (
       <Link href='/account/account' className='flex items-center gap-2 justify-end group' >
     
        <User className='text-store h-6 w-6 group-hover:text-blue-100 hoverEffect' />
     
      <div className='hidden lg:flex  flex-col'  >
        <h4 className='font-bold text-base text-white '>Account</h4>
        <p className='whitespace-nowrap text-xs'>Login / Register</p>
      </div>
    </Link>
  )
}

export default Account