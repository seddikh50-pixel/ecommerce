"use client"
import { Home } from 'lucide-react'
import { usePathname } from 'next/navigation'
import React from 'react'

interface title {
    productTitle: string
}

const Pathname = ({ productTitle }: title) => {
    const pathName = usePathname()
    console.log()
    return (
        <div>
            <div className='flex gap-2 py-4 justify-start items-center'>
                <Home size={20}/>
                <h1 className='text-store'>{pathName.split('/')[1]}{" /  "}</h1>
                <h1 className='text-store'>{productTitle}</h1>
            </div>
        </div>
    )
}

export default Pathname
