import { Search } from 'lucide-react'
import React from 'react'

const ProductCoparison = () => {
  return (
    <div className='h-1/2 w-full rounded-md bg-amber-200 flex  gap-1   items-center p-2 flex-col'>
        <div className='text-center flex flex-col p-1 text-stone-600 tracking-normal'>
            <h3 className='font-bold'>Compare Products</h3>
        <p className='text-sm line-clamp-1'>Choose Two Products To Compare</p>
        </div>
          <div className='w-full '>
            <div className='w-full flex flex-col space-y-2'>
                <div className='w-full relative'>
                    <input type="text" placeholder='Search and choose product' className=' placeholder:text-[12px] w-full text-sm bg-white px-3 py-[7px]' />
                    <Search className='absolute right-2 top-1 text-gray-700' width={20}/>
                </div>
                 <div className='w-full relative'>
                    <input type="text" placeholder='Search and choose product' className='placeholder:text-[12px]  w-full text-sm bg-white px-3 focus:outline-gray-200 py-[7px]' />
                    <Search className='absolute right-2 top-1 text-gray-700' width={20}/>
                </div>
                <button className='w-full border border-gray-400 py-1 bg-gray-100 text-gray-700'>View Compare</button>
            </div>
        </div>
        </div>
  )
}

export default ProductCoparison