import Container from '@/components/common/Container'
import prisma from '@/lib/prisma'
import { Calendar, Database } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const LatestBlog = async () => {
  const blogs = await prisma.blog.findMany()


  return (
    <Container className='bg-white mt-10 p-5'>
      <div className='px-5 flex justify-between'>
        <h1>Latest Blogs</h1>
        <h1 className=' underline font-medium'>View All</h1>
      </div>
      <div className='grid lg:grid-cols-4 gap-4'>
        {blogs?.map((blog, index) => {
          return (
            <div className='' key={index}>
              <div className='relative w-full h-51  rounded-md '>
                {blog.image && <Image className='object-contain rounded-md' src={blog.image} alt='blos' fill />}
              </div>
              <div className='flex justify-start items-center gap-1'>
                <Calendar />
                {blog.createdAt.toDateString()}
              </div>
              <h1>{blog.title} </h1>
            </div>
          )
        })}
      </div>
    </Container>
  )
}

export default LatestBlog