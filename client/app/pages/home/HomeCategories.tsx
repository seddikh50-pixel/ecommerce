import Container from '@/components/common/Container'
import { ChartArea, FileQuestion, Laptop, Settings } from 'lucide-react'
import React from 'react'
import Text from './Text'
import Image from 'next/image'
import Link from 'next/link'
import { getAllCategories } from '@/lib/cache'


const HomeCategories = async () => {
  const categories = await getAllCategories()


  const data = [
    {
      title: "Laptop Finde",
      description: "Find Your Laptop Easily",
      Icon: <Laptop className='w-5 h-5 md:h-6 md:w-6' />
    },
    {
      title: "Raise a Complaint",
      description: "Share You Experience",
      Icon: <ChartArea className='w-5 h-5 md:h-6 md:w-6' />
    },
    {
      title: "Online Support",
      description: "Get Online Support",
      Icon: <FileQuestion className='w-5 h-5 md:h-6 md:w-6' />
    },
    {
      title: "Service Center",
      description: "Repair Your Device",
      Icon: <Settings className='w-5 h-5 md:h-6 md:w-6' />
    }
  ]
  return (
    <div>
      <Container className='mt-20'>
        <div className='grid  gap-4 lg:grid-cols-4 grid-cols-1  sm:grid-cols-2 '>
          {data.map((t, index) => {
            return (
              <div key={index} className='flex border  bg-white px-6  py-3 rounded-sm hover:border-store justify-center items-center hoverEffect gap-5'>
                <h1 className='rounded-full border  p-2 bg-store text-white '>{t.Icon} </h1>
                <div>
                  <h1 className='font-semibold whitespace-nowrap'>{t.title} </h1>
                  <h3 className='md:text-sm whitespace-nowrap'>{t.description} </h3>
                </div>
              </div>
            )
          })}
        </div>
        <Text className="text-center mt-12 flex flex-col gap-3 tracking-widest">
          <h1 className="font-semibold text-xl">Featured Category</h1>
          <p>Get Your Desired Product From Featured Category!</p>
        </Text>
        <div className='grid lg:grid-cols-8 md:grid-cols-4 grid-cols-2  gap-3 mt-10'>
          {categories.map((cat, index) => {
            return (
              <div  key={index} className='flex flex-col gap-2 items-center  py-7 border border-transparent hoverEffect bg-white hover:border rounded-md hover:border-store'>
                <Link href={`/category/${cat.name.replace(/\s/g,'-')}`} className={`relative w-full block  py-5 h-15`}>
                  <Image alt='' fill src={`${cat.image}`} className={`object-contain `} priority sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                </Link>
                <h1 className='line-clamp-1 text-[12px] font-semibold'>{cat.name} </h1>
              </div>  

            )
          })}
        </div>
      </Container>

    </div>
  )
}

export default HomeCategories