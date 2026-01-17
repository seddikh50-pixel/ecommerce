import NotFound from '@/app/not-found';
import { getAllProducts } from '@/lib/cache';

import React from 'react'

import Container from '@/components/common/Container';

import ImageView from '@/app/pages/singleProduct/ImageView';
import ShareBadge from '../../../pages/singleProduct/ShareBadge'
import DetailsView from '@/app/pages/singleProduct/DetailsView';

// import ProductCharastiristics from '@/components/common/ProductCharastiristics'

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
    <div className=' '>

      <Container>
        <ShareBadge />
        <div className='flex flex-col md:flex-row gap-5 '>
          <div className=' w-full md:w-2/5'>
            <ImageView images={product?.images} />
          </div>
          <DetailsView product={product}/>
        </div>
      </Container>
    </div>
  )
}

export default SingleProduct