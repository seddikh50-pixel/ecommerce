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
    <div className='w-64 pt-5 flex flex-col space-y-5 border border-gray-700 border-t-0 bg-black/90' style={{ height: "calc(100vh - 56px)" }}>
     
      <div className='space-y-5 px-4'>
        {dashLinks.map((link, index) => {
          return (
            <div key={index} className='' >
              <Link className={`flex justify-between border-gray-300 gap-2 px-2 ${link.href === pathname ? "bg-blue-300 text-black " : "bg-black text-white"}`} href={link.href}>
                <div className={`flex justify-between gap-2 p-2 w-full`}>
                  <h1 className='flex gap-2 items-center'>{link.icon}{link.link}</h1>
                  <ChevronRight />
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