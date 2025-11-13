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
        <div>

            <Table>

                <TableHeader className='border border-white'>
                    <TableRow >
                        <TableHead className="w-60 text-white ">Image</TableHead>
                        <TableHead className="w-100 text-white ">Name</TableHead>
                        <TableHead className="w-100 text-white ">Price</TableHead>
                        <TableHead className="text-center text-whitew-100">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {products.map((product, index) => {
                        return (
                            <TableRow key={index} className='hover:bg-white/15'>
                                <TableCell className="font-medium">
                                    <div className='relative w-20 h-20 rounded-sm overflow-hidden '>
                                        <Image src={product?.images[0]} fill alt='' />
                                    </div>
                                </TableCell>
                                <TableCell className='text-white'>{product.name}</TableCell>
                                <TableCell className='text-white'>{product.price}</TableCell>
                                <TableCell className=" text-white  h-full ">
                                    <div className='flex items-center justify-center gap-5 '>
                                        <X className=' hover:bg-white hover:text-black cursor-pointer' onClick={() => deleteProduct(product.id)} />
                                        <Edit className=' hover:bg-white hover:text-black cursor-pointer' />
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