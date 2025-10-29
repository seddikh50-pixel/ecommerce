"use client"
import React, { useState } from 'react'
import Image from 'next/image';
import { useSnackbar } from 'notistack'
import { useRouter } from 'next/navigation'
import { X } from 'lucide-react';

interface Cats {
    id: string,
    name: string,
    image: string
}

interface Brands {
    id: string,
    name: string,
}
interface Props {
    categories: Cats[]
    brands: Brands[]
}

const ProductForm = ({ categories, brands }: Props) => {
    const { enqueueSnackbar } = useSnackbar()
    const route = useRouter()
    const [image1, setImage1] = useState<string>('');
    const [image2, setImage2] = useState<string>('');
    const [image3, setImage3] = useState<string>('');
    const [image4, setImage4] = useState<string>('');
    const [isStocked, setIsStocked] = useState(true);

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

        try {
            const response = await fetch("/api/products",
                {
                    method: "POST",
                    body: formData
                }
            )
            const data = await response.json()
            if (data.success) {
                enqueueSnackbar(data.msg, { variant: 'success' })
                route.push('/admin/products ')
            } else {
                enqueueSnackbar(data.msg, { variant: 'error' })
            }


        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6">
                <form onSubmit={addProduct} className='flex flex-col gap-6'>
                    <div className='flex gap-4 flex-wrap'>
                        <div className='relative w-40 h-40 rounded-lg border-2 border-dashed border-gray-300 overflow-hidden bg-gray-100'>
                            {image1 && <X className='absolute text-white bg-black cursor-pointer rounded-full p-1 right-2 top-2 z-10' onClick={() => setImage1("")} />}
                            <input type="file" name='image1' id='image1' className='hidden' onChange={(e) => handleImage(e, setImage1)} />
                            {!image1 ? (
                                <label htmlFor="image1" className='w-full h-full cursor-pointer flex flex-col justify-center items-center text-gray-500 hover:text-blue-500 transition'>
                                    <span className='font-medium'>Upload image 1</span>
                                </label>
                            ) : (
                                <Image fill alt={image1} src={image1} className="object-cover" />
                            )}
                        </div>

                        <div className='relative w-40 h-40 rounded-lg border-2 border-dashed border-gray-300 overflow-hidden bg-gray-100'>
                            {image2 && <X className='absolute text-white bg-black cursor-pointer rounded-full p-1 right-2 top-2 z-10' onClick={() => setImage2("")} />}
                            <input type="file" name='image2' id='image2' className='hidden' onChange={(e) => handleImage(e, setImage2)} />
                            {!image2 ? (
                                <label htmlFor="image2" className='w-full h-full cursor-pointer flex flex-col justify-center items-center text-gray-500 hover:text-blue-500 transition'>
                                    <span className='font-medium'>Upload image 2</span>
                                </label>
                            ) : (
                                <Image fill alt={image2} src={image2} className="object-cover" />
                            )}
                        </div>

                        <div className='relative w-40 h-40 rounded-lg border-2 border-dashed border-gray-300 overflow-hidden bg-gray-100'>
                            {image3 && <X className='absolute text-white bg-black cursor-pointer rounded-full p-1 right-2 top-2 z-10' onClick={() => setImage3("")} />}
                            <input type="file" name='image3' id='image3' className='hidden' onChange={(e) => handleImage(e, setImage3)} />
                            {!image3 ? (
                                <label htmlFor="image3" className='w-full h-full cursor-pointer flex flex-col justify-center items-center text-gray-500 hover:text-blue-500 transition'>
                                    <span className='font-medium'>Upload image 3</span>
                                </label>
                            ) : (
                                <Image className='bg-yellow-50 object-cover' fill alt={image3} src={image3} />
                            )}
                        </div>

                        <div className='relative w-40 h-40 rounded-lg border-2 border-dashed border-gray-300 overflow-hidden bg-gray-100'>
                            {image4 && <X className='absolute text-white bg-black cursor-pointer rounded-full p-1 right-2 top-2 z-10' onClick={() => setImage4("")} />}
                            <input type="file" name='image4' id='image4' className='hidden' onChange={(e) => handleImage(e, setImage4)} />
                            {!image4 ? (
                                <label htmlFor="image4" className='w-full h-full cursor-pointer flex flex-col justify-center items-center text-gray-500 hover:text-blue-500 transition'>
                                    <span className='font-medium'>Upload image 4</span>
                                </label>
                            ) : (
                                <Image fill alt={image4} src={image4} className="object-cover" />
                            )}
                        </div>
                    </div>

                    <div>
                        <input type="text" className='w-full p-3 border rounded-lg bg-gray-50 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder='Product' name='name' />
                    </div>
                    <div>
                        <input type="number" className='w-full p-3 border rounded-lg bg-gray-50 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder='Price' name='price' />
                    </div>
                    <div>
                        <textarea name="description" className='w-full p-3 border rounded-lg bg-gray-50 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder='Description'></textarea>
                    </div>
                    <div>
                        <select className='w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500' name="category">
                            <option value="">Select category</option>
                            {categories.map((category, index) => (
                                <option key={index} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <select className='w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500' name="brand">
                            <option value="">Select brand</option>
                            {brands.map((brand, index) => (
                                <option key={index} value={brand.id}>{brand.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>
                            <input type="checkbox" name="isStocked"  />
                            <span className='pl-2'>isStocked</span>
                        </label>
                    </div>
                    <button type="submit" className='bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition'>Add Product</button>
                </form>
            </div>
        </div>
    )
}

export default ProductForm



