import CategorySide from '@/app/pages/category/CategorySide'
import LinkHeader from '@/app/pages/category/LinkHeader'
import ProductCard from '@/app/pages/home/ProductCard'
import Container from '@/components/common/Container'
import { getAllCategories, getAllProducts } from '@/lib/cache'
import Image from 'next/image'
import React from 'react'


interface CategoryName {
    params: Promise<{ slug: string }>

}
const page = async ({ params }: CategoryName) => {
    const { slug } = await params
    const category = decodeURIComponent(slug).replace('-', " ");
    const products = await getAllProducts()
    const getProductByCategory = products.filter((product) => product.category.name.toLowerCase() === category.toLowerCase())
    const categories = await getAllCategories()
    return (
        <Container className='bg-gray-50'>
            <LinkHeader />
            <div className='flex'>
                <CategorySide categories={categories} category={category} />
                <div className='grid p-4  xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1  gap-2 w-full '>
                    {getProductByCategory.length ? getProductByCategory?.map((product, index) =>
                        <div className='w-full bg-white py-5 rounded-md   ' key={index}>
                            <ProductCard product={product} />
                        </div>) : <h1 className='p-5 whitespace-nowrap'>No product with this category</h1>}
                </div>

            </div>

        </Container>
    )
}

export default page
