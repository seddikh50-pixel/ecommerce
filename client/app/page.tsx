import Footer from "@/components/common/Footer";
import Header from "@/components/header/Header";
import Image from "next/image";
import Banner from "./pages/home/Banner";

export default function Home() {
  return (
    <div >
      <Header/>
    <div className="bg-gray-100 pb-10">
     <Banner/>
     {/* <h1>home categories</h1>*/}
     {/* <h1>product grid</h1>*/}
     {/* <h1>shop by brands </h1>*/}
    {/*  <h1>latest blogs</h1> */}
    </div>
    <Footer/>
    </div>
  );
}
  