import { Suspense } from "react";
import Header from "@/components/header/Header";
import FooterTop from "@/components/foooter/FooterTop";
import Footer from "@/components/foooter/Footer";
import CartMenu from "@/components/common/CartMenu";
import MobileLinks from "@/components/mobileLinks/MobileLinks";
import SearchProducts from "@/components/header/SearchProducts";
import { getAllProducts } from "@/lib/cache";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const products = await getAllProducts()

  return (
    <div className="relative">

      {/* ✅ الحل هنا */}
      <Suspense fallback={null}>
        <MobileLinks />
      </Suspense>

      <Suspense fallback={null}>
        <SearchProducts products={products} />
      </Suspense>
      {children}

      <Suspense fallback={null}>
        <FooterTop />
      </Suspense>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      <Suspense fallback={null}>

        <CartMenu />
      </Suspense>
    </div>
  );
}