"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { SnackbarProvider, enqueueSnackbar } from 'notistack'
import { useRouter } from 'next/navigation';





const CategoryForm = () => {
    const router = useRouter()
    const [preview, setPreview] = useState<string>('');
    const addCategory = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget);
      

        try {
            const response = await fetch('/api/categories',
                {
                    method: "POST",
                    body: formData
                }
            )
            const data = await response.json()
            if (data.success) {
                router.push('/admin/categories')
                setPreview('')
                enqueueSnackbar(data.msg, { variant: 'success' })
            } else {
                enqueueSnackbar(data.msg, { variant: 'error' })
            }
        } catch (error) {
            console.log(error)
        }

    }



    // const [image, setImage] = useState<File | null>()





    const handlePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]

        if (file) {
            // setImage(file)
            setPreview(URL.createObjectURL(file))
        }
    }

    return (
        <div className="p-6 rounded-xl shadow-lg w-full max-w-md">
            {/* عنوان */}
            <h1 className="mb-8 text-2xl font-semibold text-white  pb-2">
                Add New Category
            </h1>

            <form
                onSubmit={addCategory}
                className="flex flex-col gap-5"
            >
                {/* إدخال الاسم */}
                <input
                    type="text"
                    name="name"
                    placeholder="Category Name"
                    className="px-4 py-2 placeholder:text-gray-400 text-white rounded-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {/* إدخال الصورة */}
                <div className="relative rounded-sm overflow-hidden border-2 border-dashed border-gray-400 hover:border-blue-500 transition-all duration-300 h-36 flex items-center justify-center bg-gray-50">
                    {preview && (
                        <X
                            className="absolute w-6 h-6 right-2 top-2 cursor-pointer bg-gray-200 rounded-full p-1 text-gray-600 hover:bg-gray-300 z-20"
                            onClick={() => setPreview('')}
                        />
                    )}

                    <input
                        id="inputFile"
                        className="hidden"
                        name="image"
                        type="file"
                        onChange={handlePreview}
                    />

                    {!preview ? (
                        <label
                            htmlFor="inputFile"
                            className="cursor-pointer flex flex-col items-center justify-center text-gray-500"
                        >
                            {/* <Image
                                className="object-contain"
                                fill
                                alt=""
                                priority
                                src="/uploads/fg.png"
                            /> */}
                            <span className="mt-2 absolute inset-0 flex justify-center items-center text-lg font-bold text-gray-400">
                                Upload an image
                            </span>
                        </label>
                    ) : (
                        <Image
                            fill
                            alt="category"
                            className="object-contain bg-white"
                            src={preview}
                        />
                    )}
                </div>


                {/* زر الإضافة */}
                <Button
                    type="submit"
                    className="bg-black border-white border hover:bg-white hover:text-black hoverEffect white text-white font-medium py-2 px-4 rounded-sm transition-colors"
                >
                    Add Category
                </Button>
            </form>
        </div>

    )
}

export default CategoryForm