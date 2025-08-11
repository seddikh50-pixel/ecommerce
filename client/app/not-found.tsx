import Link from 'next/link'
import React from 'react'

const NotFound = () => {
  return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center bg-store" >
      <h1 className="text-9xl text-white font-bold mb-4">404</h1>
      <h2 className="text-3xl mb-2 font-bold"> Page Not Found </h2>
      {/* <p className="mb-6"> Page Not Reachable </p> */}
      <Link href="/">
        <h1 className=" text-white">  Back To Page</h1>
      </Link>
    </div>
  )
}

export default NotFound