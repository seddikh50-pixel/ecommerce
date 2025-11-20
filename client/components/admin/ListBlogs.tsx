"use client"
import { useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'
import React from 'react'
import Swal from 'sweetalert2'
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
            {blogs.map((blo) =>
                <div className='text-white flex justify-between  ' key={blo.id}>
                    <h1>{blo.title}</h1>
                   <button onClick={() =>deleteProduct(blo.id)} className='bg-red-500 px-2 py-1 text-white'> Delete </button>
                </div>)}

        </div>
    )
}

export default ListBlogs
