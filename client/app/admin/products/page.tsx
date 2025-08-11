import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div>
      <div>
          <Link href={"products/add"} className='text-white'>Add Product</Link>
      </div>
    </div>
  )
}

export default page