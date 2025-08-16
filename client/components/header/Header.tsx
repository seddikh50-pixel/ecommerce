import Link from "next/link"
import Container from "../common/Container"
import Searchbar from "./Searchbar"
import Offers from "./Offers"
import Deal from "./Deal"
import Carticon from "./Carticon"
import Account from "./Account"
import { Menu, MenuIcon, MenuSquare, MenuSquareIcon } from "lucide-react"
import MobileMenu from "./MobileMenu"
import Image from "next/image"

const Header = () => {
  return (
    <header className="bg-black h-20 text-white/80 sticky top-0 z-50 backdrop:blur-md">
      <Container className="flex gap-3 items-center justify-between py-4">
        <div className="flex items-center justify-start gap-2 ">
            <MobileMenu/>
          <Link href={'/'} className="text-2xl font-bold text-store whitespace-nowrap mr-5 bg-amber-50   ">
          <Image src={'/storelogo.png'} width={65} alt="logo" height={65}/> </Link>
        </div>
        <div className="flex lg:flex-1 items-center gap-5">
          <Searchbar />
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