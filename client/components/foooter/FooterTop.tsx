import { Mail, Map, MapPin, Phone } from 'lucide-react'
import React from 'react'
import Container from '../common/Container'
import Image from 'next/image'
import { getAllCategories } from '@/lib/cache'
import Link from 'next/link'

const FooterTop =async () => {
    const categories = await getAllCategories()

    const links = [
        {
            name: "Home",
            href: "/"
        },
        {
            name: "Shop",
            href: "/shop"
        },
    
        {
            name: "Cart",
            href: "/cart"
        },
        {
            name: "Account",
            href: "/account"
        }
    ]
    const data = [
        {
            title: "Visit Us",
            subtitle: "Djelfa",
            icon: <Map />

        },

        {
            title: "Call Us",
            subtitle: "+213 664753237",
            icon: <Phone size={10} />
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
                <div className='grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 grid-cols-2 gap-8 border-b '>

                    {data.map((data, index) => {
                        return (
                            <div className='flex justify-start items-center gap-3 hover:bg-gray-100 py-4 hoverEffect' key={index}>
                                {data.icon}
                                <div >
                                    <h1 className='text-sm font-bold whitespace-nowrap'>{data.title} </h1>
                                    <h2 className='text-gray-700 text-[10px] whitespace-nowrap'>{data.subtitle} </h2>
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
                                Discover curated furniture collections at Sed-Store, blending style and comfort to elevate your living spaces.
                            </p>
                        </div>
                    </div>

                    <div className='flex flex-col gap-7 p-7'>
                        <div className=''>
                            <h1 className='font-bold text-lg text-gray-900'>Quick Links</h1>
                        </div>
                        <div className='flex flex-col gap-2'>
                            {links.map((link, index) => {
                                return (
                                    <Link key={index} href={link.href}  className='text-sm text-gray-700 hover:text-store hoverEffect'>{link.name}</Link>
                                )
                            }
                            )}
                        </div>
                    </div>


                    <div className='flex flex-col gap-7 p-7'>
                        <div className=''>
                            <h1 className='font-bold text-lg text-gray-900'>Categories</h1>
                        </div>
                        <div className='flex flex-col gap-2'>
                            {categories.slice(0, 6).map((category) => {
                                return (
                                    <h1 key={category.id} className='text-sm text-gray-700 hover:text-store hoverEffect'>{category.name}</h1>
                                )
                            })}
                        </div>
                    </div>
                </div>

            </Container>

        </div>
    )
}

export default FooterTop