import React from 'react'
import { FaFacebookMessenger } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { MdAddToPhotos } from "react-icons/md";


const SharePage = () => {
  return (
    <div className='flex justify-between border rounded-full px-4 py-4 items-center mb-5'>

      <div className='flex justify-center items-center gap-1.5'>
        <p>Share:</p>
        <div className='flex justify-center items-center gap-1.5'>
          <FaFacebookMessenger />
          <FaPinterest />
          <IoLogoWhatsapp />

        </div>
      </div>
      <div className='flex group justify-center items-center gap-1.5'>
        <button className=''>
          <MdAddToPhotos className='group-hover:text-store hoverEffect ' />
        </button>
        <p className='group-hover:text-store hoverEffect '>Add to compare</p>
      </div>
    </div>
  )
}

export default SharePage