"use client"
import React, { useEffect, useState } from 'react'

const Footer = () => {
  const [year, setYear] = useState<number | null>(null)

  useEffect(() => {
    setYear(new Date().getFullYear())
  }, [])

  if (!year) return null

  return (
    <div className='text-center py-5 border'>
      <h1>
        © {year} <span className='text-store font-bold'>Sed-Store</span>. All rights reserved.
      </h1>
    </div>
  )
}

export default Footer