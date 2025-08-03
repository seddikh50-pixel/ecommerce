"use client"
import React, { useState } from 'react'
import { Input } from '../ui/input'
import { Search, X } from 'lucide-react'

const Searchbar = () => {
  const [search, setSearch] = useState('')
  const [showResults, setShowResults] = useState(false)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [featuredProducts, setFeaturedProducts] = useState([])
  const searchRef = React.useRef<HTMLInputElement>(null)
  const [showSearch, setShowSearch] = useState(false)
  const mobileInputRef = React.useRef<HTMLInputElement>(null)

  const toggleMobileSearch = () => {
    setShowSearch(!showSearch)
    if(!showSearch) {
       setSearch("")
       setShowResults(true)
    }
  
  }   

  return (
    <div className='relative lg:w-full '>
      <button className='lg:hidden' onClick={toggleMobileSearch}>{showSearch ? <X className='mt-2 '/> : <Search className='lg:hidde mt-2 hover:text-store hoverEffect' />}</button>
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
    </div>
  )
}

export default Searchbar