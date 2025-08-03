import Link from "next/link"
import Container from "../common/Container"
import Searchbar from "./Searchbar"
import Offers from "./Offers"
import Deal from "./Deal"
import Carticon from "./Carticon"
import Account from "./Account"
import { Menu, MenuIcon, MenuSquare, MenuSquareIcon } from "lucide-react"
import MobileMenu from "./MobileMenu"

const Header = () => {
  return (
    <header className="bg-black text-white/80 sticky top-0 z-50 backdrop:blur-md">
      <Container className="flex gap-3 items-center justify-between py-4">
        <div className="flex items-center justify-start gap-2 ">
        
            <MobileMenu/>
        
          <Link href={'/'} className="text-2xl font-bold text-store whitespace-nowrap">SED-Store</Link>
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