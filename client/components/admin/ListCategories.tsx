"use client"
import { X } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import Swal from 'sweetalert2'
import { useSnackbar } from 'notistack'
import { useRouter } from 'next/navigation';

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

    <div className="flex flex-col gap-4 p-6 bg-black border-t-0 overflow-scroll stylish-scroll shadow-sm border border-gray-700 h-[calc(100vh-3.5rem)]">
      <h1 className='font-bold text-2xl'>All Categories</h1>
      {categories.map((category, index) => (
        <div
          key={index}
          className="flex max-h-20 items-center justify-between p-3 bg-black rounded-lg shadow-sm hover:shadow-md shadow-white transition-shadow duration-300 border border-white-100"
        >
          {/* صورة المنتج */}
          <div className="relative w-16 h-16 rounded-full overflow-hidden border bg-white border-white">
            <Image
              src={category.image}
              alt={category.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* اسم الكاتيقوري */}
          <h1 className="flex-1 text-lg font-medium text-white px-4 truncate">
            {category.name}
          </h1>

          {/* أيقونة الحذف */}
          <button onClick={()=> deleteCategory(category.id)} className="p-2 rounded-full hover:text-gray-600 hoverEffect">
            <X size={20} />
          </button>
        </div>
      ))}
    </div>
  )
}

export default ListCategories