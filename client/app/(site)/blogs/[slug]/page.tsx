import Container from '@/components/common/Container';
import Pathname from '@/components/pathname/Pathname';
import { getAllBlogs } from '@/lib/cache';
import Image from 'next/image';
import React from 'react'

interface BlogId {
  params: { slug: string }

}

const page = async ({ params }: BlogId) => {
  const { slug } = await params

  const blogName = decodeURIComponent(slug);

  const blog = (await getAllBlogs()).find((bl) => bl.title.toLowerCase().trim() === blogName.toLowerCase())
  
   if (!blog) {
    return "no blog"
  }

  return (
    <Container className='flex flex-col space-y-5' >
      <Pathname productTitle={blogName}/>

      <div className='relative w-[700px] h-[400px]'>
        <Image src={blog.image} fill alt='' />
      </div>
      <p className='text-2xl font-black'> {blog.title} </p>
       <h1 className='max-w-[1000px] whitespace-pre-line text-xl text-gray-700 '>{blog.content}</h1>
       <p> </p>
      
    </Container>
  )
}

export default page
