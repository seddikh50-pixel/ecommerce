
import BannerForm from '@/components/admin/BannerForm'
import ListBanners from '@/components/admin/ListBanners'
import prisma from '@/lib/prisma'
import React from 'react'
const Page = async () => {



  const getBanners = await prisma.banner.findMany()

  return (
    <div className='flex'>
      <div className="w-96 p-4 h-[calc(100vh-3.5rem)] border border-gray-600 border-t-0 overflow-y-scroll stylish-scroll ">
        <ListBanners banners={getBanners} />
      </div>
      <div className='flex-1 p-4 '>
        <BannerForm />
      </div>
    </div>
  )
}

export default Page