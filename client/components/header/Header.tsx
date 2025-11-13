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

const Header = async () => {
  const products = await getAllProducts()

  return (
    <header className="bg-black  text-white/80 sticky top-0 z-49 backdrop:blur-md">
     
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