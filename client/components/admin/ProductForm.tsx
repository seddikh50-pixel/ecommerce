"use client"
import React, { useState } from 'react'
import Image from 'next/image';

interface Cats {
    id: string,
    name: string,
    image: string
}
interface Categories {
    categories: Cats[]
}
const ProductForm = ({ categories }: Categories) => {
    const [image1, setImage1] = useState<string>('');
    const [image2, setImage2] = useState<string>('');
    const [image3, setImage3] = useState<string>('');
    const [image4, setImage4] = useState<string>('');

    const handleImage = (
        event: React.ChangeEvent<HTMLInputElement>,
        sitterFn: React.Dispatch<React.SetStateAction<string>>
    ) => {
        const file = event.target.files?.[0]
        if (file) {
            sitterFn(URL.createObjectURL(file))
        }

    }

    const addProduct = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget);
        for(const entry of formData.entries()){
            console.log(entry)
        }
        try {
            const response = await fetch("/api/products",
                {
                    method : "POST",
                    body : formData
                }
            )
           const data = await response.json()
           console.log(data)
        } catch (error) {
            
        }

    }

    return (
        <div>
            <div >
                <form onSubmit={addProduct} className='flex flex-col gap-5'>
                    <div className='flex gap-4 '>
                        <div className='relative w-40 h-30 rounded-sm overflow-hidden'>
                            <input type="file" name='image1' id='image1' className='hidden ' onChange={(e) => handleImage(e, setImage1)} />
                            {!image1 ? <label htmlFor="image1" className='w-full h-full cursor-pointer bg-white block relative' ><span className='absolute inset-0 flex justify-center items-center font-bold'>Upload image 1</span></label> : <Image fill alt={image1} src={image1} />}
                        </div>
                        <div className='relative w-40 h-30 rounded-sm overflow-hidden'>
                            <input type="file" name='image2' id='image2' className='hidden' onChange={(e) => handleImage(e, setImage2)} />
                            {!image2 ? <label htmlFor="image2" className='w-full h-full cursor-pointer bg-white block relative' ><span className='absolute inset-0 flex justify-center items-center  font-bold'>Upload image 2</span></label> : <Image fill alt={image2} src={image2} />}
                        </div>
                        <div className='relative w-40 h-30 rounded-sm overflow-hidden'>
                            <input type="file" name='image3' id='image3' className='hidden' onChange={(e) => handleImage(e, setImage3)} />
                            {!image3 ? <label htmlFor="image3" className='w-full h-full cursor-pointer bg-white block relative' ><span className='absolute inset-0 flex justify-center items-center  font-bold'>Upload image 2</span></label> : <Image className='bg-yellow-50' fill alt={image3} src={image3} />}
                        </div>
                        <div className='relative w-40 h-30 rounded-sm overflow-hidden'>
                            <input type="file" name='image4' id='image4' className='hidden' onChange={(e) => handleImage(e, setImage4)} />
                            {!image4 ? <label htmlFor="image4" className='w-full h-full cursor-pointer bg-white block relative' ><span className='absolute inset-0 flex justify-center items-center  font-bold'>Upload image 2</span></label> : <Image fill alt={image4} src={image4} />}
                        </div>
                    </div>


                    <div>
                        <input type="text" className='bg-white placeholder:text-black' placeholder='Product' name='name' />
                    </div>
                    <div>
                        <input type="number" className='bg-white placeholder:text-black' placeholder='Price' name='price' />
                    </div>
                    <div>
                        <textarea name="description" className='bg-white placeholder:text-black' placeholder='Description' id=""></textarea>
                    </div>
                    <div>
                        <select className=' bg-amber-50' name="category" id="">
                            <option value="">Select category</option>
                            {categories.map((category, index) => {
                                return (
                                    <option key={index} value={category.id}>{category.name} </option>
                                )
                            })}
                        </select>
                    </div>
                    <button type="submit" className='bg-white text-black max-w-44'>Add Product</button>
                </form>
            </div>
        </div>
    )
}

export default ProductForm