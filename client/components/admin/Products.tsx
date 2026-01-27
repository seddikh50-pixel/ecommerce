'use client'
import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Swal from 'sweetalert2'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Edit, X } from 'lucide-react'
import { useSnackbar } from 'notistack'
import Link from 'next/link';

import { Button } from '../ui/button'

interface Props {
    id: string;
    name: string;
    images: string[];
    price: string;
    description: string;
    categoryId: string;
    brandId: string;
}

interface products {
    products: Props[]
}

const Products = ({ products }: products) => {

    const route = useRouter()
    const { enqueueSnackbar } = useSnackbar()

    const deleteProduct = async (id: string) => {
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
                    const response = await fetch(`/api/products/${id}`,
                        {
                            method: "DELETE",
                        }
                    )
                    const data = await response.json()
                    if (data.success) {
                        enqueueSnackbar(data.message, { variant: 'success' })
                        route.push('/admin/products ')
                    }
                } catch (error) {
                    enqueueSnackbar("somthing went worng" + error, { variant: "error" })
                }
            }

        })

    }
    return (
        <div className=''>
            <h1 className='font-bold text-xl '>All Products</h1>

            <Table>

                <TableHeader className='border border-white'>
                    <TableRow >
                        <TableHead className="w-60  ">Image</TableHead>
                        <TableHead className="w-100  ">Name</TableHead>
                        <TableHead className="w-100  ">Price</TableHead>
                        {/* <TableHead className="w-40  "> category</TableHead>
                        <TableHead className="w-40  "> brand</TableHead> */}
                        <TableHead className="text-center ">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {products.map((product, index) => {
                        return (
                            <TableRow key={index} className='hover:bg-white/15'>
                                <TableCell className="font-medium">
                                    <div className='relative xl:w-20 xl:h-15 lg:w-20 lg:h-15 md:w-15 md:h-15 sm:w-10 sm:h-10 h-10 w-10  rounded-sm overflow-hidden '>
                                        <Image src={product?.images[0]} fill alt='' />
                                    </div>
                                </TableCell>
                                <TableCell className=' text-sm'>{product.name.slice(0, 20)}...</TableCell>
                                <TableCell className=''>${product.price}</TableCell>
                                <TableCell className="   h-full ">
                                    <div className='flex items-center justify-center gap-5 '>
                                        <Link href={`/admin/products/edit/${product.id}`} className='bg-blue-600 rounded-sm hover:bg-blue-600/90 text-white px-4 py-1'>Edit</Link>
                                        <button className='bg-red-600 rounded-sm hover:bg-red-600/90 text-white px-4 py-1' onClick={() => deleteProduct(product.id)}>Delete</button>
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

export default Products