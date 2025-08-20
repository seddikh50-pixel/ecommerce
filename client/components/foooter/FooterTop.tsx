import { Mail, Map, MapPin, Phone } from 'lucide-react'
import React from 'react'
import Container from '../common/Container'
import Image from 'next/image'

const FooterTop = () => {
    const data = [
        {
            title: "Visit Us",
            subtitle: "Djelfa",
            icon: <Map />

        },

        {
            title: "Call Us",
            subtitle: "+213 664753237",
            icon: <Phone />
        },
        {
            title: "Working Hours",
            subtitle: "Daily",
            icon: <MapPin />

        },
        {
            title: "Email Us",
            subtitle: "seddikh49@gmail.com",
            icon: <Mail />

        }

    ]
    return (
        <div className='border-t  '>
            <Container className=''>
                <div className='grid lg:grid-cols-4 gap-8 border-b '>
                    {data.map((data, index) => {
                        return (
                            <div className='flex justify-center items-center gap-3 hover:bg-gray-100 py-4 hoverEffect' key={index}>
                                {data.icon}
                                <div >
                                    <h1 className='text-md font-bold'>{data.title} </h1>
                                    <h2 className='text-gray-700'>{data.subtitle} </h2>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className='grid lg:grid-cols-3 '>

                    <div className='flex flex-col gap-4 p-5' >
                        <div className='w-20 h-15 relative'>
                            <Image src={'/storelogo.png'} fill alt='storelogo' />
                        </div>
                        <div>
                            <p className='text-sm text-gray-700'>
                                Discover curated furniture collections at Shoptech, blending style and comfort to elevate your living spaces.
                            </p>
                        </div>
                    </div>

                    <div className='flex flex-col gap-7 p-7'>
                        <div className=''>
                            <h1 className='font-bold text-lg text-gray-900'>Quick Links</h1>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <h1 className='text-sm text-gray-700 hover:text-store hoverEffect'>About us</h1>
                            <h1 className='text-sm text-gray-700 hover:text-store hoverEffect'>Contact us</h1>
                            <h1 className='text-sm text-gray-700 hover:text-store hoverEffect'>Terms & Conditions</h1>
                            <h1 className='text-sm text-gray-700 hover:text-store hoverEffect'>Privacy Policy</h1>
                            <h1 className='text-sm text-gray-700 hover:text-store hoverEffect'>FAQs</h1>
                            <h1 className='text-sm text-gray-700 hover:text-store hoverEffect'>Help</h1>
                        </div>
                    </div>


                    <div className='flex flex-col gap-7 p-7'>
                        <div className=''>
                            <h1 className='font-bold text-lg text-gray-900'>Categories</h1>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <h1 className='text-sm text-gray-700 hover:text-store hoverEffect'>Mobiles</h1>
                            <h1 className='text-sm text-gray-700 hover:text-store hoverEffect'>Smartphones</h1>
                            <h1 className='text-sm text-gray-700 hover:text-store hoverEffect'>Washing Machine</h1>
                            <h1 className='text-sm text-gray-700 hover:text-store hoverEffect'>gadget accessories</h1>
                            <h1 className='text-sm text-gray-700 hover:text-store hoverEffect'>Air Conditioners</h1>
                            <h1 className='text-sm text-gray-700 hover:text-store hoverEffect'>Gaming Console</h1>
                        </div>
                    </div>
                </div>

            </Container>

        </div>
    )
}

export default FooterTop