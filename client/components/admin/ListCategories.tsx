"use client"
import { Link, X } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import Swal from 'sweetalert2'
import { useSnackbar } from 'notistack'
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

interface Props {
  id: string
  name: string
  image: string
}

interface ListCategories {
  categories: Props[]
}
const   ListCategories = ({ categories }: ListCategories) => {

  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const deleteCategory = async (id: string) => {
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
          const response = await fetch(`/api/categories/${id}`,
            {
              method: "DELETE"
            }
          )
          const data = await response.json()
          if (data.success) {
            enqueueSnackbar(data.message, { variant: 'success' })
            router.push('/admin/categories')
          }
        } catch (error) {
          console.log(error)
        }
      }
    })
  }



  return (

    <div className="flex flex-col gap-4 p-6 bg-white border-t-0  stylish-scroll shadow-sm border border-gray-700 h-[calc(100vh-3.5rem)]">
     
            <h1 className='font-bold text-xl '>All Categories</h1>


           <Table>
                <TableCaption>A list of categories.</TableCaption>

                <TableHeader className='border border-white'>
                    <TableRow >
                        <TableHead className="w-60  ">Image</TableHead>
                        <TableHead className="w-100  ">Category Name</TableHead>
                        {/* <TableHead className="w-40  "> category</TableHead>
                        <TableHead className="w-40  "> brand</TableHead> */}
                        <TableHead className="text-center ">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {categories.map((category, index) => {
                        return (
                            <TableRow key={index} className='hover:bg-white/15'>
                                <TableCell className="font-medium">
                                    <div className='relative xl:w-20 xl:h-15 lg:w-20 lg:h-15 md:w-15 md:h-15 sm:w-10 sm:h-10 h-10 w-10  rounded-sm overflow-hidden '>
                                        <Image src={category?.image} fill alt='' />
                                    </div>
                                </TableCell>
                                <TableCell className=' text-sm'>{category.name.slice(0, 20)}...</TableCell>
                                <TableCell className="   h-full ">
                                    <div className='flex items-center justify-center gap-5 '>
                                        {/* <X className=' hover:bg-white hover:text-black cursor-pointer' onClick={() => deleteProduct(product.id)} /> */}
                                        {/* <Edit className=' hover:bg-white hover:text-black cursor-pointer xl:block lg:block md:block sm:hidden hidden' /> */}
                                        {/* <Link href={`/admin/categories/edit/${category.id}`} className='bg-blue-600 rounded-sm hover:bg-blue-600/90 text-white px-4 py-1'>Edit</Link> */}
                                        <button className='bg-red-600 rounded-sm hover:bg-red-600/90 text-white px-4 py-1' onClick={() => deleteCategory(category.id)}>Delete</button>
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

export default ListCategories