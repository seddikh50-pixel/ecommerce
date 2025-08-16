import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react'
import ProductCard from './ProductCard';
interface category {
    id : string
    name : string
    image : string
}

interface Products {
    name: string;
    id: string;
    category : category
    images: string[];
    price: string;
    description: string;
    categoryId: string;
    brandId: string;
};

interface ListProducts {
    products : Products []
}


const Products = ({products }: ListProducts) => {

    return (
        <div className='grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2 grid-cols-1  mt-10 gap-4 '>

            {products.map((product, index)=>{
                return (
                    <div className='w-full bg-white py-5 rounded-md' key={index}>
                         <ProductCard product={product} />
                    </div>
                )
            } )}
        </div>
    )
}

export default Products