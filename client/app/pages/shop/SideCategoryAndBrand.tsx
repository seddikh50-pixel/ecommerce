"use client"
import { useCartStore } from '@/app/store/store'
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

import Link from 'next/link'
import React, { useState } from 'react'


interface Category {
    id: string
    name: string
    image: string
}
interface Brand {
    id: string
    name: string
    image: string
}
interface SideCategoryAndBrandProps {
    categories: Category[]
    brands: Brand[]
}

const SideCategoryAndBrand = ({ categories, brands }: SideCategoryAndBrandProps) => {
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [selectedBrand, setSelectedBrand] = useState<string>("");
    const { filterProductByCategoryId, resetSelection, filterProductByBrandId } = useCartStore()

    const toggleCategory = (id: string,id2: string) => {
        setSelectedCategory(id)
        filterProductByCategoryId(id,id2)
    }

    const toggleBrand = (id: string,id2: string) => {
        setSelectedBrand(id)
        filterProductByBrandId(id , id2)
    }
    const enableCheck = () => {
        setSelectedCategory('')
        setSelectedBrand('')
        resetSelection()
    }
    return (
        <div className='w-64  border-r border-store p-3 xl:block lg:block bg-white sm:hidden md:block hidden  '>
            <div className='flex flex-col  gap-4 pt-4'>
                <h1 className='font-bold leading-2 text-lg py-1'>Product Categories</h1>
                {categories.map((cat) => (
                    <div key={cat.id} className="flex items-center gap-3">
                        <Checkbox
                            checked={selectedCategory.includes(cat.id)}
                            onCheckedChange={() => toggleCategory(cat.id,selectedBrand)} id={`cat-${cat.id}`}
                            className='data-[state=checked]:bg-white
                           data-[state=checked]:border-store
                            data-[state=checked]:text-store'

                        />
                        <Label htmlFor={`cat-${cat.id}`}>{cat.name} </Label>
                    </div>
                ))}
                <button className=' text-left underline' onClick={enableCheck}>reset selection</button>
            </div>
            <div className='flex flex-col  gap-4 pt-4'>
                <h1 className='font-bold leading-2 text-lg py-1'>Product Brands</h1>
                {brands.map((bra) => (
                    <div key={bra.id} className="flex items-center gap-3">
                        <Checkbox
                            checked={selectedBrand.includes(bra.id)}
                            onCheckedChange={() => toggleBrand(bra.id,selectedCategory)} id={`cat-${bra.id}`}
                            className='data-[state=checked]:bg-white
                           data-[state=checked]:border-store
                            data-[state=checked]:text-store'

                        />
                        <Label htmlFor={`cat-${bra.id}`}>{bra.name} </Label>
                    </div>
                ))}
                <button className=' text-left underline' onClick={enableCheck}>reset selection</button>
            </div>
        </div>
    )
}

export default SideCategoryAndBrand
