"use client"
import { X } from 'lucide-react';
import Image from 'next/image';
import React from 'react'
import { useSnackbar } from 'notistack'
import Swal from "sweetalert2"
import { useRouter } from 'next/navigation';

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"


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


            <h1 className='font-bold text-xl '>All Banners</h1>
       



            
           <Table>
                <TableCaption>A list of banners.</TableCaption>

                <TableHeader className='border border-white'>
                    <TableRow >
                        <TableHead className="w-60  ">Banner Image</TableHead>
                        {/* <TableHead className="w-40  "> category</TableHead>
                        <TableHead className="w-40  "> brand</TableHead> */}
                        <TableHead className="text-center ">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {banners.map((banner, index) => {
                        return (
                            <TableRow key={index} className='hover:bg-white/15'>
                                <TableCell className="font-medium">
                                    <div className='relative xl:w-20 xl:h-15 lg:w-20 lg:h-15 md:w-15 md:h-15 sm:w-10 sm:h-10 h-10 w-10  rounded-sm overflow-hidden '>
                                        <Image src={banner?.image} fill alt='' />
                                    </div>
                                </TableCell>
                                <TableCell className="   h-full ">
                                    <div className='flex items-center justify-center gap-5 '>
                                        {/* <X className=' hover:bg-white hover:text-black cursor-pointer' onClick={() => deleteProduct(product.id)} /> */}
                                        {/* <Edit className=' hover:bg-white hover:text-black cursor-pointer xl:block lg:block md:block sm:hidden hidden' /> */}
                                        {/* <Link href={`/admin/categories/edit/${category.id}`} className='bg-blue-600 rounded-sm hover:bg-blue-600/90 text-white px-4 py-1'>Edit</Link> */}
                                        <button className='bg-red-600 rounded-sm hover:bg-red-600/90 text-white px-4 py-1' onClick={() => deleteBanner(banner.id)}>Delete</button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </div>
    )
}

export default ListBanners