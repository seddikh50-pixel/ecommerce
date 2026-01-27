
import Header from "@/components/header/Header";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import FooterTop from "@/components/foooter/FooterTop";
import Footer from "@/components/foooter/Footer";
import CartMenu from "@/components/common/CartMenu";
import HomeCategories from "../pages/home/HomeCategories";
import Banner from "../pages/home/Banner";
import Text from "../pages/home/Text";
import ProductGrid from "../pages/home/ProductGrid";
import ShopByBrand from "../pages/home/ShopByBrand";
import LatestBlog from "../pages/home/LatestBlog";


export default async  function Home() {

  return (
    <div className="relative"  >
  
      {/* <div className="flex justify-evenly" >
      </div> */}
      <div className="bg-gray-100 pb-10">
        
        <Banner />
        <HomeCategories />
        <div className="py-10">
          <Text className="text-center flex flex-col gap-3 tracking-widest">
            <h1 className="font-semibold text-xl">Featured Products</h1>
            <p>Check & Get Your Desired Product!</p>
          </Text>
          <ProductGrid />
        </div>
        <ShopByBrand />
        <LatestBlog />
      </div>
    </div>
  );
}
