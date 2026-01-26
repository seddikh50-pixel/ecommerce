"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button';
import { Upload, X } from 'lucide-react';
import { SnackbarProvider, enqueueSnackbar } from 'notistack'
import { useRouter } from 'next/navigation';





const BrandForm = () => {
    const router = useRouter()
    const [preview, setPreview] = useState<string>('');
    const addBrand = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget);


        try {
            const response = await fetch('/api/brands',
                {
                    method: "POST",
                    body: formData
                }
            )
            const data = await response.json()
            console.log(data)

            if (data.success) {
                router.push('/admin/brands')
                setPreview('')
                enqueueSnackbar(data.msg, { variant: 'success' })
            } else {
                enqueueSnackbar(data.msg, { variant: 'error' })
            }
        } catch (error) {
            console.log(error)
        }

    }

    const handlePreview = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            setPreview(URL.createObjectURL(file))
        }

    }










    return (
        <div className="p-6   xl:w-lg sm:w-96 w-64 shadow-lg max-w-lg xl:h-[calc(100vh-56px)] lg:h-[calc(100vh-56px)]" >
            {/* عنوان */}
            <h1 className="mb-8 text-2xl font-semibold text-white  pb-2">
                Add New Brand
            </h1>   

            <form
                onSubmit={addBrand}
                className="flex flex-col gap-5 border-black border p-4 rounded-sm  "
            >
                {/* إدخال الاسم */}
                <input
                    
                    type="text"
                    name="name"
                    placeholder="Brand Name"
                    className="px-4 py-2   placeholder:text-gray-400 text-black rounded-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                onChange={handlePreview}
                    type="file"
                    id='brand'
                    name="image"
                    placeholder="Brand Name"
                    className="px-4 py-2 hidden "
                />
                {!preview ? <label htmlFor="brand" className='relative rounded-sm w-full h-64 flex justify-center items-center cursor-pointer'><Upload width={40} className='text-black '/>  </label>
                    : <div className='relative w-full h-64 rounded-sm overflow-hidden border-1 border-white '><Image fill alt={preview} className='bg-white ' src={preview} /></div>}
                {/* إدخال الصورة */}



                {/* زر الإضافة */}
                <Button
                    type="submit"
                    className="bg-black border-white border hover:bg-white hover:text-black hoverEffect white text-white font-medium py-2 px-4 rounded-sm transition-colors"
                >
                    Add Brand
                </Button>
            </form>
        </div>

    )
}

export default BrandForm