"use client"
import { useCartStore } from '@/app/store/store'
import { Check, Radio } from 'lucide-react'
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
    const [selectedCategory, setSelectedCategory ] = useState<string>("");
    const { filterProductByCategoryId , resetSelection } = useCartStore()

    const toggleCategory = (id: string) => {
        setSelectedCategory(id)
        filterProductByCategoryId(id)
    }
    const enableCheck = () => {
         setSelectedCategory('')
         resetSelection()
    }
    return (
        <div className='w-64'>
            <div>
                {categories.map((cat) => (
                    <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
                        <input
                            checked={selectedCategory.includes(cat.id)}
                            type="checkbox"
                            onChange={() => toggleCategory(cat.id)}
                            className="accent-blue-500"
                        />
                        <span>{cat.name}</span>
                    </label>
                ))}
                <button onClick={enableCheck}>reset selection</button>
            </div>
        </div>
    )
}

export default SideCategoryAndBrand
