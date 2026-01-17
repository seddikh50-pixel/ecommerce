
import React from 'react'
import { useSearchParams } from "next/navigation"
import prisma from '@/lib/prisma'


const ComparePage = async () => {
    // const searchParams = useSearchParams()
    // const prod1 = searchParams.get('prod1') || ''
    // const prod2 = searchParams.get('prod2') || ''
    const products = await  prisma.product.findMany()

    // const product1 = prisma.product.findUnique({
    //     where: {
    //         name: prod1,        
    //     },
    // });
    // const product2 = prisma.product.findUnique({ 
    //     where: {
    //         name: prod2,
    //     },
    // }); 
    // console.log(product1 , product2)
  return (
    <div>
      
    </div>
  )
}

export default ComparePage
