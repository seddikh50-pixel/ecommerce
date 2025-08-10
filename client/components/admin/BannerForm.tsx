"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { SnackbarProvider, enqueueSnackbar } from 'notistack'
import { useRouter } from 'next/navigation';




const BannerForm = () => {
    const router = useRouter()
    const sendImage = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget);
        try {
            const response = await fetch('/api/banners',
                {
                    method: "POST",
                    body: formData
                }
            )
            const data = await response.json()
            if (data.success) {
                router.push('/admin/banners')
                setPreview('')
                enqueueSnackbar('Banner addad successfully', { variant: 'success' })
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
                <form action="" onSubmit={sendImage} className='flex relative flex-col gap-4 max-w-64'>
                    <div className='relative  rounded-lg overflow-hidden max-w-64 h-36 flex w-64  max-h-44 '>
                        {preview && <X className='absolute w-5 h-5 right-2 cursor-pointer bg-gray-300 rounded-full hover:bg-gray-100 text-gray-600 hoverEffect top-2 ' onClick={() => setPreview('')} />}
                        <input id='inputFile' className='hidden' name='image' type="file" onChange={handlePreview} />
                        {/* <label className="cursor-pointer rounded-md  bg-blue-300 w-full h-full  text-white" htmlFor="inputFile"><Image className='object-cover'  width={256} height={144} alt=''  priority  src={"/uploads/fg.png"} /></label> */}
                        {!preview ? <label className="cursor-pointer rounded-md   w-full h-full  text-white" htmlFor="inputFile"><Image width={256} className='object-center -translate-y-15' height={144} alt='' priority src={"/uploads/fg.jpg"} /></label> :
                            <Image style={{ width: "auto", height: "auto" }} width={200} height={100} alt='' src={preview} />}

                    </div>
                    <Button disabled={!preview} type='submit'>Add Banner</Button>
                </form>
            </div>

        </div>
    )
}

export default BannerForm