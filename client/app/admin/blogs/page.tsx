import BlogForm from '@/components/admin/BlogForm'
import ListBlogs from '@/components/admin/ListBlogs'
import { getAllBlogs } from '@/lib/cache'
import prisma from '@/lib/prisma'
import React from 'react'

const page = async () => {

    const blogs = await prisma.blog.findMany()
 
  
  return (
    <div className='flex xl:flex-row lg:flex-row md:flex-col sm:flex-col flex-col'>
        <BlogForm/>
        <ListBlogs blogs={blogs}/>
    </div>
  )
}

export default page