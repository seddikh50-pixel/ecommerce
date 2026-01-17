"use client"
import React from 'react'
import Link from 'next/link'
import { ChartBarStacked, ChevronRight, Notebook, NotebookIcon, ShoppingBasket, ShoppingCart, Trello } from 'lucide-react'
import { useParams, usePathname } from 'next/navigation'



const SideBar = () => {
  const pathname = usePathname()

  const dashLinks = [
    {
      link: "Products",
      icon: <ShoppingCart />,
      href: '/admin/products'
    },
    {
      link: "Categories",
      icon: <ChartBarStacked />,
      href: '/admin/categories'
    },
    {
      link: "Banners",
      icon: <Notebook />,
      href: '/admin/banners'
    },
    {
      link: "Brands",
      icon: <Trello />,
      href: '/admin/brands'
    },
    {
      link: "Orders",
      icon: <ShoppingBasket />,
      href: '/admin/orders'
    },
    {
      link: "Blogs",
      icon: <NotebookIcon />,
      href: '/admin/blogs'
    }
  ]
  return (
    <div className='xl:w-64 lg:w-64 md:w-48 sm:w-48 pt-5 flex flex-col space-y-5 border-t-0 bg-white' style={{ height: "calc(100vh - 56px)" }}>
     
      <div className='space-y-5 px-4'>
        {dashLinks.map((link, index) => {
          return (
            <div key={index} className='' >
              <Link className={`flex justify-between border-gray-300 gap-2 px-2 ${link.href === pathname ? "bg-black text-white " : "bg-white "}`} href={link.href}>
                <div className={`flex xl:justify-between lg:justify-between justify-evenly gap-2 p-2 w-full`}>
                  <h1 className='flex gap-2 items-center text-sm'>{link.icon}{link.link}</h1>
                  <ChevronRight size={20}/>
                </div>
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SideBar