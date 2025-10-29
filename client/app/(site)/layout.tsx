import Header from "@/components/header/Header";
import FooterTop from "@/components/foooter/FooterTop";
import Footer from "@/components/foooter/Footer";
import CartMenu from "@/components/common/CartMenu";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <FooterTop />
      <Footer />
      <CartMenu />
    </>
  );
}