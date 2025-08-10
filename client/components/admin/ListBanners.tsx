"use client"
import { X } from 'lucide-react';
import { fetchExternalImage } from 'next/dist/server/image-optimizer';
import Image from 'next/image';
import React from 'react'
import { SnackbarProvider, enqueueSnackbar, useSnackbar } from 'notistack'


import { useRouter } from 'next/navigation';




interface Banner {
    id: string;
    image: string;
}

interface ListBannersProps {
    banners: Banner[];
}

const ListBanners = ({ banners }: ListBannersProps) => {
    const router = useRouter()
    const { enqueueSnackbar } = useSnackbar()


    const deleteBanner = async (id: string) => {
       
        try {
            const response = await fetch(`/api/banners/${id}`,
                {
                    method: "DELETE"
                }
            )
            const data = await response.json()

            if (data.success) {
                enqueueSnackbar(data.message, { variant: 'success' })
                router.push('/admin/banners')
            }
        } catch (error) {
            console.log(error)
        }

    }
    return (
        <div className='flex flex-col gap-3 border-r px-3 hover: '>


            <h1 className='font-bold text-xl'>All Banners</h1>
            {banners.map((banner) => {
                return (
                    <div key={banner.id} className='flex justify-between items-center'>
                        <Image width={100} height={40} priority alt='' className='object-cover' src={banner.image} />
                        <h1 className='text-white'>{banner.image.split('.')[0].slice(9,)} </h1>
                        <X onClick={() => deleteBanner(banner.id)} className='text-white cursor-pointer' />
                    </div>
                )
            })}
        </div>
    )
}

export default ListBanners