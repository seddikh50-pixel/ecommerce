import Container from '@/components/common/Container'
import { getAllBrands } from '@/lib/cache'
import { GitCompareArrows, Headset, ShieldCheck, Truck } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const ShopByBrand = async() => {
    const brands = await getAllBrands()

    const extraData = [
      {
        title : "Free Delivery",
        description : "Free shipping over $100",
        icon: <Truck size={45}/>
      },
        {
        title : "Free Return",
        description : "Free shipping over $100",
        icon: <GitCompareArrows size={45}/>
      },
        {
        title : "Costumer Support",
        description : "Freindly 24/7 costumer support ",
        icon: <Headset size={45}/>
      },
       {
        title : "Money Back Guarantee ",
        description : "Freindly 24/7 costumer support ",
        icon: <ShieldCheck size={45}/>
      }
    ]
    
  return (
    <Container className='bg-white rounded-md py-5'>
      <div className='flex justify-between p-5 items-center'>
        <h1 className='font-semibold text-xl'>Shop By brands</h1>
        <h1 className='font-semibold'>View all</h1>
      </div>
      <div className='grid lg:grid-cols-8 md:grid-cols-4 grid-cols-2 sm:grid-cols-4  p-5 gap-3 rounded-md '>
        {brands.map((bra)=> {
            return(
                <div className='relative w-full h-25 border border-gray-200  rounded-sm' key={bra.id}>
                     <Image fill alt='brand' className='object-contain' src={bra.image}/>
                </div>
            )
        })}
    </div>
    <div className='grid lg:grid-cols-4 gap-3 mt-10 p-4'>
      {extraData.map((ex,index)=> {
        return (
          <div key={index} className='flex gap-2 p-2 py-4 border rounded-sm border-gray-200 group'>
            <div className='group-hover:text-store hoverEffect'>{ex.icon} </div>
            <div className='flex flex-col '>
              <h1 className='font-bold text-gray-900'>{ex.title} </h1>
              <p className='text-gray-700 text-sm'>{ex.description} </p>
            </div>

          </div>
        )
      })}
    </div>
    </Container>
  )
}

export default ShopByBrand