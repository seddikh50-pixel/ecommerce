
import BannerForm from '@/components/admin/BannerForm'
import ListBanners from '@/components/admin/ListBanners'
import prisma from '@/lib/prisma'
import { get } from 'http'
import React from 'react'
const Page = async () => {



  const getBanners = await prisma.banner.findMany()
  return (
    <div className='flex xl:flex-row lg:flex-row md:flex-col sm:flex-col flex-col  '>
       <div className=' xl:w-96  lg:w-96  p-4 b '>
        <BannerForm />
      </div>
      <div className="p-4 flex-1 border-l  xl:h-[calc(100vh-3.5rem)] lg:h-[calc(100vh-3.5rem)]  sm:w-full  border-gray-600 border-t-0  ">
        <ListBanners banners={getBanners} />
      </div>
     
    </div>
  )
}

export default Page