import Container from '@/components/common/Container'
import { getAllBlogs } from '@/lib/cache'
import { Calendar, Database } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const LatestBlog = async () => {
  const blogs = await getAllBlogs()


  return (
    <Container className='bg-white mt-10 p-5'>
      <div className='py-5 flex justify-between'>
        <h1 className='text-2xl font-semibold'>Latest Blogs</h1>
        <Link href={'/blogs'} className=' cursor-pointer underline font-medium'>View All</Link>
      </div>
      <div className='grid lg:grid-cols-4  md:grid-cols-2 sm:grid-cols-2 gap-4'>
        {blogs?.map((blog, index) => {
          return (
            <div className='flex flex-col gap-3 group  rounded-sm overflow-hidden' key={index}>
              <div className='relative w-full h-64  rounded-sm overflow-hidden '>
                {blog.image && <Image className='object-cover  group-hover:scale-105 hoverEffect bg-amber-400' src={blog.image} alt='blos' fill />}
              </div>
              <div className='flex justify-start items-center gap-1 '>
                <Calendar />
                <h3 className='group-hover:underline decoration-store decoration-2 hoverEffect  underline-offset-6'>  {new Date(blog.createdAt).toDateString()}</h3>

              </div>
              <h1 className=' line-clamp-2 text-sm font-bold hover:text-store hoverEffect'>{blog.title} </h1>
            </div>
          )
        })}
      </div>
   
    </Container>
  )
}

export default LatestBlog