"use client"
import React, { useEffect, useRef, useState } from 'react'
import { Input } from '../ui/input'
import { Loader, Search, SearchIcon, X } from 'lucide-react'
import Link from 'next/link'
import { createClickOutsideHandler } from '../documentEvent/doumentEvent'
import { useCartStore } from '@/app/store/store'

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

const Searchbar = ({ products }: ListProducts) => {
  const { showSearch, setShowSearch } = useCartStore()

  const [search, setSearch] = useState('')
  const [showResults, setShowResults] = useState(false)
  const [searchProducts, setSearchProducts] = useState<Products[]>([]);
  // const [products, setProducts] = useState(product)
  const [loading, setLoading] = useState(false)
  const [featuredProducts, setFeaturedProducts] = useState([])
  const searchRef = React.useRef<HTMLDivElement>(null)
  const searchMobileRef = React.useRef<HTMLDivElement>(null)



  const toggleMobileSearch = () => {
    setShowSearch(!showSearch)
    if (showSearch) {
      setShowResults(true)
    }

  }


  useEffect(() => {
    if (!search.trim()) {
      setSearchProducts([]);
      setLoading(false);
      return;
    }
    setLoading(true)
    const timer = setTimeout(() => {
      const filtered = products.filter((product) => product.name.toLocaleLowerCase().startsWith(search))
      setSearchProducts(filtered)
      setLoading(false)
    }, 500)

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const hanlder = createClickOutsideHandler(searchRef, () => setShowResults(false))
    document.addEventListener('click', hanlder)
    return () => document.removeEventListener("click", hanlder)
  }, []);

  return (
    <div ref={searchRef} className=' relative  w-full'>
      <div ref={searchMobileRef} className='lg:hidden ' onClick={toggleMobileSearch}>{showSearch ? <X className='mt-2 ' /> : <Search className='lg:hidden mt-2 hover:text-store hoverEffect' />}</div>
      <form onSubmit={(e) => e.preventDefault()} action="" className='relative  hidden lg:flex '>
        <Input placeholder='Search...' className='flex-1 focus-visible:ring-0
         focus-visible:border-store placeholder:tracking-wider text-black
          bg-white placeholder:font-semibold pr-16'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setShowResults(true)}
        />
        {search ?
          <X onClick={() => setSearch('')} className='absolute right-3 w-5 h-5 cursor-pointer text-black top-2 ' /> :
          <Search className='absolute cursor-pointer text-black right-3 top-2 w-5 h-5' />}
      </form>

      {showResults &&

        <div className='absolute top-full border rounded-md w-full mt-1 z-49 bg-white'>
          <h1 className='p-2 text-black border-b bg-gray-50  '>Popular Products</h1>
          <div className=''>

            {loading ?
              <div className="text-black text-sm flex justify-center items-center gap-2 py-4">
                <Loader className='animate-spin text-store  ' />
                <h1>Loading...</h1>
              </div> : searchProducts.map((product) => {
                return (
                  <div key={product.id} className='flex p-2 border border-gray-100 pt-2 gap-2'>
                    <SearchIcon className='text-black' />
                    <Link href={`/product/${product.name}`} className='text-black'>{product.name} </Link>
                  </div>
                )
              })}
          </div>
        </div>

      }
      {/* {showSearch &&

        <div className='absolute top-full -left-64  border rounded-md w-86 mt-1 z-49 '>
          <div className='seddik'></div>
          <h1 className='p-2 text-black border-b bg-gray-50  '>Popular Products</h1>
          <div className=''>

            {searchProducts.map((product) => {
              return (
                <div key={product.id} className='flex p-2 border border-gray-100 pt-2 gap-2'>
                  <SearchIcon className='text-black' />
                  <Link href={`/product/${product.name}`} className='text-black'>{product.name} </Link>
                </div>
              )
            })}
          </div>
        </div>

      } */}
    </div>
  )
}

export default Searchbar