"use client"
import { Loader, Search, SearchIcon, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { useCartStore } from '@/app/store/store'
import Link from 'next/link'
interface category {
    id: string
    name: string
    image: string
}

interface brand {
    id: string
    name: string
    image: string
}


interface Products {
    isStocked: boolean;
    name: string;
    id: string;
    category: category
    images: string[];
    price: string;
    description: string;
    categoryId: string;
    brandId: string;
    brand: brand
    stripeProductId: string | null; // ✅ أضف | null هنا
    stripePriceId: string | null;
};

interface ListProducts {
    products: Products[]
}
const SearchProducts = ({ products }: ListProducts) => {
    const { showSearch, setShowSearch } = useCartStore()
    const [searchProducts, setSearchProducts] = useState<Products[]>([]);
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log("search")
        if (!search.trim()) {
            setSearchProducts([]);
            setLoading(false);
            return;
        }
        setLoading(true)
        const timer = setTimeout(() => {
            const filtered = products.filter((product) => product.name.toLocaleLowerCase().startsWith(search))
            console.log(filtered)
            setSearchProducts(filtered)
            setLoading(false)
        }, 500)

        return () => clearTimeout(timer);
    }, [search]);


    return (
        <div className={`absolute  w-full shadow-sm bg-gray-100 h-64  z-40 left-0 lg:hidden xl:hidden transition-all duration-300 top-20 p-4 ${showSearch ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"} `}>
            <form onSubmit={(e) => e.preventDefault()} action="" className='relative   '>
                <Input placeholder='Search...' className='flex-1 focus-visible:ring-0
                     focus-visible:border-store placeholder:tracking-wider text-black
                      bg-white placeholder:font-semibold pr-16'
                    onChange={(e) => setSearch(e.target.value)}
                />
                {search ?
                    <X className='absolute right-3 w-5 h-5 cursor-pointer text-black top-2 ' /> :
                    <Search className='absolute cursor-pointer text-black right-3 top-2 w-5 h-5' />}
            </form>
            <div className='absolute w-[95%] left-3   mt-2  z-4'>
                <h1 className='p-2 text-black border rounded-t-sm bg-gray-100  '>Popular Products</h1>
                <div className='bg-white    '>

                    {loading ?
                        <div className="text-black text-sm flex justify-center items-center gap-2 py-4">
                            <Loader className='animate-spin text-store  ' />
                            <h1>Loading...</h1>
                        </div>

                        :
                        searchProducts.length > 0 ?
                        searchProducts.map((product) => {
                            return (
                                <div key={product.id} className='flex gap-2 py-2 text-black p-2 border-b justify-start items-center'>
                                    <SearchIcon className='text-black' size={20} />
                                    <Link onClick={() => setShowSearch(false)} href={`/product/${product.name}`} className='text-black hover:bg-amber-700'> <span className="text-sm">{product.name.slice(0,30)}...</span> </Link>
                                </div>
                            )
                        }) : <h1 className='text-black p-2'>No products </h1>

                    }
                </div>
            </div>
        </div>
    )
}

export default SearchProducts
