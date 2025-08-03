import Footer from "@/components/common/Footer";
import Header from "@/components/header/Header";
import Image from "next/image";
import Banner from "./pages/home/Banner";

export default function Home() {
  return (
    <div >
      <Header/>
    <div className="bg-gray-100">
     <Banner/>
    </div>
    <Footer/>
    </div>
  );
}
  