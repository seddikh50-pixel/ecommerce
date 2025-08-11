"use client"
import { X } from 'lucide-react';
import Image from 'next/image';
import React from 'react'
import { useSnackbar } from 'notistack'
import Swal from "sweetalert2"
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
        Swal.fire({
            title: "هل أنت متأكد؟",
            text: "لا يمكن التراجع بعد الحذف!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "نعم، احذف",
            cancelButtonText: "إلغاء",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(`/api/banners/${id}`,
                        {
                            method: "DELETE"
                        }
                    )
                    const data = await response.json()
                    console.log(data)
                    if (data.success) {
                        enqueueSnackbar(data.message, { variant: 'success' })
                        router.push('/admin/banners')
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        })
    }
    return (
        <div className='flex flex-col gap-3  px-3 hover: '>


            <h1 className='font-bold text-xl text-white'>All Banners</h1>
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