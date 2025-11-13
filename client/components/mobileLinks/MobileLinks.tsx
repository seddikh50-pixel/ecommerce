"use client"
import React, { useEffect, useRef } from 'react'
import { useCartStore } from '@/app/store/store'
import { X } from 'lucide-react'
import { createClickOutsideHandler } from '../documentEvent/doumentEvent'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'


const MobileLinks = () => {
    const catchPath = usePathname()
    const blackBox = React.useRef<HTMLDivElement>(null)
    const { isMobileListOpen, setIsMobileListOpen } = useCartStore()
    useEffect(() => {
        const handler = createClickOutsideHandler(blackBox, () => setIsMobileListOpen(false))
        document.addEventListener('click', handler)
        return () => document.removeEventListener('click', handler)
    }, [isMobileListOpen]);


    const links = [
        {
            title: "Home",
            href: "/"
        },
        {
            title: "Shop",
            href: "/shop"
        },
        {
            title: "Blog",
            href: "/blog"
        },
        {
            title: "Hot deal",
            href: "/deal"
        },
    ]

    return (
        <div className={`absolute w-full h-full bg-black/30 z-50 top-0 block xl:hidden lg:hidden md:hidden  text-white ${isMobileListOpen ? "left-0" : "-left-full"} transition-all duration-500 `}>
            <div ref={blackBox} className=' absolute left-0 h-full w-[80%] bg-gray-900 border-r font-bold border-store flex flex-col p-10 gap-5'>
                <Link href={'/'} className="text-2xl flex gap-2  relative justify-start items-center      font-bold text-store whitespace-nowrap mr-5   ">
                    <h1>SedTech</h1>
                    <div className='relative w-15 h-10 '><Image src={'/storelogo.png'} fill alt="logo" /> </div>
                </Link>
                {
                    links.map((link , index)=> {
                       return ( <div key={index}>
                            <Link className={`hover:text-store hoverEffect ${link.href === catchPath && "text-store"}`} onClick={() => setIsMobileListOpen(false)}  href={link.href}>{link.title} </Link>
                        </div>)
                    })
                }
                {/* <Link className='hover:text-store hoverEffect' onClick={() => setIsMobileListOpen(false)} href={"/"}>Home</Link>
                <Link className='hover:text-store hoverEffect' onClick={() => setIsMobileListOpen(false)} href={"/shop"}>Shop</Link>
                <Link className='hover:text-store hoverEffect' onClick={() => setIsMobileListOpen(false)} href={"/blog"}>Blog</Link>
                <Link className='hover:text-store hoverEffect' onClick={() => setIsMobileListOpen(false)} href={"/deal"}>Hot Deal</Link> */}
                <X className='absolute right-10 top-10' onClick={() => setIsMobileListOpen(false)} />
            </div>
        </div>
    )
}

export default MobileLinks
