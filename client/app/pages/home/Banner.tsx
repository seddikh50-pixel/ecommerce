import Container from '@/components/common/Container'
import { Carousel, CarouselContent } from '@/components/ui/carousel'
import React from 'react'

const Banner = () => {
  return (
    <Container className='grid grid-cols-1 lg:grid-cols-4 gap-4 '>
         <div className='lg:col-span-3 bg-amber-500'>
          <Carousel>
            <CarouselContent>
              
            </CarouselContent>
          </Carousel>
         </div>
          <div className='col-span-1 bg-violet-600'>
          search
         </div>
    </Container>
  )
}

export default Banner