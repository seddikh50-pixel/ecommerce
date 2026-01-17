"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { SnackbarProvider, enqueueSnackbar } from 'notistack'
import { useRouter } from 'next/navigation';




const BannerForm = () => {
    const router = useRouter()
    const addBanner = async (event: React.FormEvent<HTMLFormElement>) => {
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
       <div className="p-6   rounded-xl shadow-lg max-w-md  ">
                  {/* عنوان */}
                  <h1 className="mb-8 text-2xl font-semibold text-white  pb-2">
                      Add New Banner
                  </h1>
      
                  <form
                      onSubmit={addBanner}
                      className="flex flex-col gap-5"
                  >    
                      {/* إدخال الصورة */}
                      <div className="relative max-w-96 rounded-lg  border-2 border-dashed border-gray-400 hover:border-blue-500 transition-all duration-300 h-42 overflow-hidden flex items-center justify-center bg-gray-5    0">
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
                          className="bg-black w-full max-w-96 border-white border hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                      >
                          Add Banner
                      </Button>
                  </form>
              </div>
    )
}

export default BannerForm