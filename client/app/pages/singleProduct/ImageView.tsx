'use client'

import { AnimatePresence } from 'motion/react'
import Image from 'next/image'
import React, { useState } from 'react'
import { motion } from 'motion/react'
import { MoveLeft, X } from 'lucide-react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'

interface ImageProps {
  images: string[]
}
const ImageView = ({ images }: ImageProps) => {



  const [active, setActive] = useState(images[0]);
  const [openModel, setOpenModel] = useState(false);

  return (
    <div className="w-full space-y-3 border p-4 rounded-md  ">
      <AnimatePresence mode='wait'>

        {openModel && (
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className='absolute inset-0 bg-black/50 z-50 flex justify-center items-center h-screen ' >
            <div className='sm:w-[70%] lg:w-150  sm:h-80 md:w-120 md:h-96 xl:h-140  xl:w-180  bg-white relative flex justify-center items-center'>
              <X onClick={() => {
                setOpenModel(false)
                document.body.style.overflow = "auto"

              }} width={30} height={30} className='absolute  z-20 top-5 right-5 text-7xl hoverEffect text-black rounded-full border p-1 hover:bg-violet-500  ' />
              <Carousel className='w-full h-full flex justify-center items-center' opts={{ startIndex: images.findIndex((img) => img === active) }}>
                <CarouselContent className='h-full w-full'>
                  {images.map((img, index) => {
                    return (
                      <CarouselItem key={index} className='flex justify-center items-center h-full w-full'>
                        <div className='xl:h-96 xl:w-96 w-72 h-72  relative '>
                          <Image src={img} alt="img" fill className="object-cover" />
                        </div>
                      </CarouselItem>
                    )
                  })}
                </CarouselContent>
                <CarouselPrevious className='left-5' />
                <CarouselNext className='right-5' />
              </Carousel>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="relative w-full aspect-square overflow-hidden rounded-md">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0"
            onClick={() => {
              setOpenModel(true)
              document.body.style.overflow = "hidden"
            }}

          >
            <Image

              src={active}
              alt="image"
              fill
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-4 h-30 gap-1 ">
        {images.map((img, index) => (
          <div
            className={`relative cursor-pointer  ${active === images[index] && "border rounded-none border-black/50"}`}
            key={index}
            onClick={() => setActive(img)}
          >
            <Image src={img} alt="img" fill className="object-cover" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ImageView