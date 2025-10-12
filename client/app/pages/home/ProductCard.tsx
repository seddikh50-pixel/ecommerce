
import { Button } from '@/components/ui/button';
import prisma from '@/lib/prisma';
import { ShoppingCartIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import PriceFormatter from './PriceFormatter';



interface Category {
    id: string
    name: string
    image: string
}
interface Product {
    name: string;
    category: Category
    id: string;
    images: string[];
    price: string;
    description: string;
    categoryId: string;
    brandId: string;
};




const ProductCard = async ({ product }: { product: Product }) => {

    return (
        <div    className='flex flex-col w-full justify-start space-y-1 px-3 gap-1 rounded-md group'>
            <Link href={`/product/${product.name}`} className='w-full h-44 relative'>
                <Image loading='lazy' alt={product.images[0]} src={product.images[0]} fill className=' object-contain group-hover:scale-110 hoverEffect' />
            </Link>
            <h2 className='font-light text-sm text-gray-700'>{product.category.name} </h2>
            <h1 className='line-clamp-1 font-bold text-base'>{product.name} </h1>
            <PriceFormatter price={product.price}/>
            <Button className='max-w-36 rounded-full bg-store hover:bg-store/90'><ShoppingCartIcon/> Add to Cart</Button>
        </div>
    )
}

export default ProductCard