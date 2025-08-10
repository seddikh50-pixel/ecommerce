"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { SnackbarProvider, enqueueSnackbar } from 'notistack'
import { useRouter } from 'next/navigation';




const CategoryForm = () => {
    const router = useRouter()
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


    const [preview, setPreview] = useState<string>('');
    const [image, setImage] = useState<File | null>()





    const handlePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]

        if (file) {
            setImage(file)
            setPreview(URL.createObjectURL(file))
        }
    }

    return (
        <div>
            <h1 className='mb-10'>Add New Banner</h1>
            <div>
                <form action="" onSubmit={addCategory} className='flex relative flex-col gap-4 max-w-64'>
                    <input type="text" name="name" className='bg-white' id="" />
                    <div className='relative  rounded-lg overflow-hidden max-w-64 h-36 flex w-64  max-h-44 '>
                        {preview && <X className='absolute w-5 z-20 h-5 right-2 cursor-pointer bg-gray-300 rounded-full hover:bg-gray-100 text-gray-600 hoverEffect top-2 ' onClick={() => setPreview('')} />}

                        <input id='inputFile' className='hidden' name='image' type="file" onChange={handlePreview} />
                        {!preview ? <label className="cursor-pointer rounded-md   w-full h-full  text-white" htmlFor="inputFile"><Image width={256} className='object-center -translate-y-15' height={144} alt='' priority src={"/uploads/fg.jpg"} /></label> :
                            <Image fill  alt='category' className='bg-white' src={preview} />}

                    </div>
                    <Button type='submit'>Add Categoryddd</Button>
                </form>
            
            </div>

        </div>
    )
}

export default CategoryForm