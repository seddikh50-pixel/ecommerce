
import BannerForm from '@/components/admin/BannerForm'
import ListBanners from '@/components/admin/ListBanners'
import prisma from '@/lib/prisma'
import React from 'react'
const Page = async () => {



  const getBanners = await prisma.banner.findMany()
  console.log(getBanners)
  return (
    <div className='flex'>
      <div className='w-72 p-4'>
        <ListBanners banners={getBanners} />
      </div>
      <div className='flex-1 p-4'>
        <BannerForm />
      </div>
    </div>
  )
}

export default Page