import React from 'react'

const Footer = () => {
    const date = Date.now()
    const year = new Date(date).getFullYear();
  return (
    <div className='text-center py-5 border'>
        <h1>© {year} <span className='text-store font-bold'>Sed-Store</span>. All rights reserved.</h1>
    </div>
  )
}

export default Footer