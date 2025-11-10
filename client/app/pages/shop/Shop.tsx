'use client'
import React from 'react'
import { usePathname } from 'next/navigation';
import LinkHeader from '../LinkHeader';


const Shop = () => {
    const pathName = usePathname()

    return (
        <div>
             <LinkHeader pathName={pathName} />

        </div>
    )
}

export default Shop
