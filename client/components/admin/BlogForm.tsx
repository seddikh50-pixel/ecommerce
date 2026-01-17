"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button';
import { Upload, X } from 'lucide-react';
import { SnackbarProvider, enqueueSnackbar } from 'notistack'
import { useRouter } from 'next/navigation';
import { Textarea } from "@/components/ui/textarea"






const BlogForm = () => {
    const router = useRouter()
    const [preview, setPreview] = useState<string>('');
    const addBrand = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget);


        try {
            const response = await fetch('/api/blogs',
                {
                    method: "POST",
                    body: formData
                }
            )
            const data = await response.json()

            if (data.success) {
                router.push('/admin/blogs')
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
        <div className="p-6  xl:w-lg lg:w-lg md:w-md sm:w-md w-58  shadow-lg max-w-lg lg:h-[calc(100vh-56px)]" >
            {/* عنوان */}
            <h1 className="mb-8 text-2xl font-semibold text-white  pb-2">
                Add New Brand
            </h1>

            <form
                onSubmit={addBrand}
                className="flex flex-col gap-5"
            >
                {/* إدخال الاسم */}
                <input

                    type="text"
                    name="title"
                    placeholder="Title"
                    className="px-4 py-2 placeholder:text-gray-400 rounded-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className='w-96 overflow-hidden h-32'>
                    <Textarea
                        name="content"
                        placeholder="Blog"
                        className="px-4  py-2 placeholder:text-gray-400  rounded-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
              <div className='w-96 h-64 border-1 border-black/20 rounded-md  '>
                  <input
                    onChange={handlePreview}
                    type="file"
                    id='brand'
                    name="image"
                    placeholder="Brand Name"
                    className="px-4 py-2 hidden k"
                />
            
                {!preview ? <label htmlFor="brand" className='relative rounded-sm w-full h-64 flex justify-center items-center cursor-pointer '><Upload width={40} className='text-black ' />  </label>
                    : <div className='relative w-full h-64 rounded-sm overflow-hidden  '><Image fill alt={preview} className='bg-white' src={preview} /></div>}
                {/* إدخال الصورة */}

              </div>

                {/* زر الإضافة */}
                <Button
                    type="submit"
                    className="bg-black border-white border hover:bg-white hover:text-black hoverEffect white text-white font-medium py-2 px-4 rounded-sm transition-colors"
                >
                    Publish Blog
                </Button>
            </form>
        </div>

    )
}

export default BlogForm