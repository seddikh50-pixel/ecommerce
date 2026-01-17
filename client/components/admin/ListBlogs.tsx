"use client"
import { useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'
import React from 'react'
import Swal from 'sweetalert2'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Image from 'next/image'
interface Blogs {
    id: string,
    image: string,
    title: string
    content: string
}
interface allBlogs {
    blogs: Blogs[]
}
const ListBlogs = ({ blogs }: allBlogs) => {
    const route = useRouter()

    
        const deleteBlog = async (id: string) => {
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
                        const response = await fetch(`/api/blogs/${id}`,
                            {
                                method: "DELETE",
                            }
                        )
                        const data = await response.json()
                        console.log({data : data})
                        if (data.success) {
                            enqueueSnackbar(data.message, { variant: 'success' })
                            route.push('/admin/blogs ')
                        }
                    } catch (error) {
                        enqueueSnackbar("somthing went worng" + error, { variant: "error" })
                    }
                }
    
            })
    
        }



    return (
        <div className='w-full px-10 p-5 flex flex-col gap-4 '>
            <h1 className='font-bold text-xl '>All Blogs</h1>        
           <Table>
                <TableCaption>A list of blogs.</TableCaption>

                <TableHeader className='border border-white'>
                    <TableRow >
                        <TableHead className="w-60  ">Image</TableHead>
                        <TableHead className="w-100  ">Blog Title</TableHead>
                                       <TableHead className="w-100  ">Blog Content</TableHead>

                        <TableHead className="text-center ">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {blogs.map((blog, index) => {
                        return (
                            <TableRow key={index} className='hover:bg-white/15'>
                                <TableCell className="font-medium">
                                    <div className='relative xl:w-20 xl:h-15 lg:w-20 lg:h-15 md:w-15 md:h-15 sm:w-10 sm:h-10 h-10 w-10  rounded-sm overflow-hidden '>
                                        <Image src={blog?.image} fill alt='' />
                                    </div>
                                </TableCell>
                                <TableCell className=' text-sm'>{blog.title.slice(0, 20)}...</TableCell>
                                  <TableCell className=' text-sm'>{blog.content.slice(0, 20)}...</TableCell>
                                <TableCell className="   h-full ">
                                    <div className='flex items-center justify-center gap-5 '>
                                        {/* <X className=' hover:bg-white hover:text-black cursor-pointer' onClick={() => deleteProduct(product.id)} /> */}
                                        {/* <Edit className=' hover:bg-white hover:text-black cursor-pointer xl:block lg:block md:block sm:hidden hidden' /> */}
                                        {/* <Link href={`/admin/categories/edit/${category.id}`} className='bg-blue-600 rounded-sm hover:bg-blue-600/90 text-white px-4 py-1'>Edit</Link> */}
                                        <button className='bg-red-600 rounded-sm hover:bg-red-600/90 text-white px-4 py-1' onClick={() => deleteBlog(blog.id)}>Delete</button>
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

export default ListBlogs
