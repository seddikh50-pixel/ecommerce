import Shop from '@/app/pages/shop/Shop'
import Container from '@/components/common/Container'
import React from 'react'
import ShopCard from '../../pages/shop/ShopCard'
import prisma from '@/lib/prisma'
import { getAllBrands, getAllCategories, getAllProducts } from '@/lib/cache'
import SideCategoryAndBrand from '@/app/pages/shop/SideCategoryAndBrand'


const page = async () => {
    const products = await getAllProducts()
    const categories =  await getAllCategories()
    const brands = await getAllBrands()

    return (
        <div className='bg-gray-100 p-4'>
            <Shop />
            <Container>
                <h1>Get the products as your needs</h1>
                <div className='flex'>
                    <SideCategoryAndBrand categories={categories} brands={brands} />
                    <ShopCard products={products}/>
                </div>
            </Container>


        </div>
    )
}

export default page
