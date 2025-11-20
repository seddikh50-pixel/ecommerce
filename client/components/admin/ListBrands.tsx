"use client"
import { X } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'
import React from 'react'
import Swal from 'sweetalert2'

interface Props {
    id: string
    name: string
    image: string
}

interface ListBrands {
    brands: Props[]
}

const ListBrands = ({ brands }: ListBrands) => {
    const router = useRouter()
    const { enqueueSnackbar } = useSnackbar()


    const deleteBrand = async (id: string) => {
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
                    const response = await fetch(`/api/brands/${id}`,
                        {
                            method: "DELETE"
                        }
                    )
                    const data = await response.json()
                    if (data.success) {
                        enqueueSnackbar(data.message, { variant: 'success' })
                        router.push('/admin/brands')
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        })
    }

    return (
        <div className='flex flex-col p-5 gap-2  border-l border-gray-400 w-full  '>
            {brands?.map((br, index) => {
                return (
                    <div key={index} className='flex justify-between xl:w-100 items-center gap-2 hover:bg-gray-800  rounded-sm  '>
                        <div className='relative w-20 h-10  bg-white rounded-md'><Image src={br.image} fill alt='brand' className='object-contain' /></div>
                        <h2 className='text-white'> {br.name} </h2>
                        <X className='text-white cursor-pointer' onClick={() => deleteBrand(br.id)} />
                    </div>
                )
            })} </div>
    )
}

export default ListBrands