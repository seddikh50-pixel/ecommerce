import ComparePage from '@/app/pages/home/ComparePage'
import Container from '@/components/common/Container';
import prisma from '@/lib/prisma';
import React from 'react'


const page = async ({
  searchParams,
}: {
  searchParams: { prod1?: string; prod2?: string }
}) => {
   
    const product1 =  await prisma.product.findUnique({
        where: {
            name: searchParams?.prod1 || '', 
        },
    });
    const product2 = await prisma.product.findUnique({    
        where: {
            name: searchParams?.prod2 || '',
        },
    });
    console.log(product1)
    console.log(product2)
    console.log(await searchParams)
  return (
   <Container>
     <div className='flex justify-between py-10'>
       <div>
         {product1?.name}
         {product1?.description}
       </div>

       <div>
        {product2?.name}
        {product2?.description}
       </div>
      
    </div>
   </Container>
  )
}

export default page
