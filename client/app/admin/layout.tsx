import { ReactNode } from "react";
import SideBar from "@/components/admin/SideBar";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return <>
    <div className=" bg-black/90">
      <div className="h-14 p-4 w-full  bg-black/90 border-b border-gray-600">
        <h1 className='text-white w-full border-gray-400 '>SedTech Admin</h1>
      </div>
      <div className="flex" >
        <div className="w-64">
          <SideBar  />
        </div>
        <div className="flex-1">
          {children}
        </div>
      </div>
    </div>
  </>;
};

export default Layout;