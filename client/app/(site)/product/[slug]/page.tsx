import NotFound from '@/app/not-found';
import { getAllProducts } from '@/lib/cache';
import prisma from '@/lib/prisma';
import React from 'react'

import Container from '@/components/common/Container';
import Footer from '@/components/foooter/Footer';
import FooterTop from '@/components/foooter/FooterTop';
import ImageView from '@/app/pages/singleProduct/ImageView';
import ShareBadge from '../../../pages/singleProduct/ShareBadge'
import { Images } from 'lucide-react';
import Image from 'next/image';
interface Params {
  params: {
    slug: string;
  };
}

const SingleProduct = async ({ params }: Params) => {
  
  const { slug } = await params
  const productName = decodeURIComponent(slug);
  const product = (await getAllProducts()).filter((pro) => { return pro.name === productName })[0]


  if (!product) {
    return <NotFound />
  }

  return (
    <div className=' h-screen'>
      
      
      <Container>
        <ShareBadge />
    
        <div className='flex flex-col md:flex-row gap-5 '>
          <div className=' w-full md:w-2/5'>
            <ImageView images={product?.images} />
          </div>
           <div className='bg-violet-500 w-full md:w-3/5'>
            Details
          </div>
        </div>
      </Container>
    </div>
  )
}

export default SingleProduct