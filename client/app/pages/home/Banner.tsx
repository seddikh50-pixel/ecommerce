import Container from '@/components/common/Container'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import React from 'react'
// import { getBanners } from "@/lib/cache";
import Image from 'next/image';
import prisma from '@/lib/prisma';
import ProductCoparison from '../ProductCoparison';

const Banner = async () => {
  const banner = await prisma.banner.findMany()
  const products = await prisma.product.findMany()

  return (
    <Container className='grid grid-cols-1 pt-5 lg:grid-cols-4 gap-2 h-max    '>
      <div className='lg:col-span-3 rounded-md overflow-hidden '>
        <Carousel >
          <CarouselContent>
            {banner?.map((p) => {
              return (
                <CarouselItem key={p.id}>
                  <div className='relative  w-full aspect-[16/9] md:aspect-[21/9]  '>
                    <Image priority alt="" fill
                      className="object-content z-30" src={`${p.image}`} />
                  </div>
                </CarouselItem>)
            })}
          </CarouselContent>
          <div className='absolute  bottom-10 left-1/2   z-40'>
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </div>
      <div className='hidden lg:flex flex-col h-full gap-2 '>
        <ProductCoparison products={products}/>
        <div className='w-full relative h-1/2'>
          <Image fill alt='smallBanner' className='object-cover rounded-md' src={"/smallBanner.jpg"}/>
        </div>
      </div>

    </Container>
  )
}

export default Banner