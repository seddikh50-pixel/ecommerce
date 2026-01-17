"use client"
import { X } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'
import React from 'react'
import Swal from 'sweetalert2'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

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
        <div className='flex flex-col p-5 gap-2  border-l border-black  w-full  '>




            <h1 className='text-2xl font-bold '>A list of brands.</h1>

            <Table>
                <TableCaption>A list of brands.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Invoice</TableHead>
                        <TableHead>Brand name</TableHead>

                        <TableHead className="">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {brands.map((brand, index) => {



                        return (
                            <TableRow key={brand.id}>
                                <TableCell className='relative w-20 h-10  bg-white rounded-md'><Image src={brand.image} fill alt='brand' className='object-contain' /></TableCell>
                                <TableCell className='text-black'> {brand.name} </TableCell>
                                <TableCell className=' flex ' onClick={() => deleteBrand(brand.id)} >
                                    <h1 className='cursor-pointer bg-red-600 rounded-sm hover:bg-red-600/90 flex justify-center items-center text-white px-4 py-1'>Delete</h1>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
                {/* <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter> */}
            </Table>


        </div>
    )
}

export default ListBrands