import { ReactNode } from "react";
import SideBar from "@/components/admin/SideBar";
import Admin from "@/components/admin/Admin";


type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return <>
    <div className="">
      <div className="h-14  w-full px-10   bg-white border-b border-gray-600">
          <Admin/>
      </div>
      <div className="flex" >
        <div className="xl:w-64 lg:w-64 w-48   ">
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