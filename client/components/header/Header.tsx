import Link from "next/link"
import Container from "../common/Container"

const Header = () => {
  return (
    <header className="bg-black text-white/80 sticky top-0 z-50 backdrop:blur-md">
      <Container className="flex items-center justify-between py-4">
        <div className="flex items-center gap-4 ">
          <p className="xl:hidden">
            mobile Menu
          </p>
          <Link href={'/'} className="text-2xl font-bold text-blue-400 whitespace-nowrap">SED-Store</Link>
        </div>
        <div className="flex lg:flex-1 items-center gap-5">
          <p>SearchBar</p>
        <p>Offers</p>
        <p>Deal</p>
        <p>CartIcon</p>
        <p>Account</p>
        </div>
      </Container>
    </header>
  )
}

export default Header