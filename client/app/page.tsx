import Footer from "@/components/common/Footer";
import Header from "@/components/header/Header";
import Image from "next/image";
import Banner from "./pages/home/Banner";
import { prisma } from "@/lib/prisma";
import HomeCategories from "./pages/home/HomeCategories";


export default async function Home() {

  return (
    <div >
       
      <Header/>
      <div className="flex justify-evenly" >
      </div>
    <div className="bg-gray-100 pb-10">
     <Banner/>
     <HomeCategories/>
   
     {/* <h1>product grid</h1>*/}
     {/* <h1>shop by brands </h1>*/}
    {/*  <h1>latest blogs</h1> */}
    </div>
    <Footer/>

    </div>
  );
}
  