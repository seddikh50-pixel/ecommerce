"use client"
import Link from "next/link"
import Container from "../common/Container"
import Searchbar from "./Searchbar"
import Offers from "./Offers"
import Deal from "./Deal"
import Carticon from "./Carticon"
import Account from "./Account"
import MobileMenu from "./MobileMenu"
import Image from "next/image"
import { getAllProducts } from "@/lib/cache"
import SearchProducts from "./SearchProducts"
import { usePathname } from "next/navigation"



interface category {
    id: string
    name: string
    image: string
}

interface brand {
    id: string
    name: string
    image: string
}


interface Products {
    isStocked: boolean;
    name: string;
    id: string;
    category: category
    images: string[];
    price: string;
    description: string;
    categoryId: string;
    brandId: string;
    brand: brand
    stripeProductId: string | null; // ✅ أضف | null هنا
    stripePriceId: string | null;
};

interface ListProducts {
    products: Products[]
}

const Header =  ({ products }: ListProducts) => {
  const pathName = usePathname()

  

  return (
    <header className={`bg-black  text-white/80 sticky top-0 z-49 backdrop:blur-md ${pathName === "/login" ? "hidden" : "block"}`}>
     
      <Container className="flex gap-3 relative items-center justify-between py-4 ">
         <SearchProducts products={products} />
        <div className="flex items-center justify-start gap-2 ">
          <MobileMenu />
          <Link href={'/'} className="text-2xl relative w-15 h-12 font-bold text-store whitespace-nowrap mr-5   ">
            <Image src={'/storelogo.png'} fill alt="logo" />
          </Link>
        </div>
        <div className="flex lg:flex-1 items-center gap-5">
        
          <Searchbar products={products} />
          <Offers />
          <Deal />
          <Carticon />
          <Account />
        </div>
      </Container>
    </header>
  )
}

export default Header