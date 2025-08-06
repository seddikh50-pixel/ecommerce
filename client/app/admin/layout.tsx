import { ReactNode } from "react";
import SideBar from "@/components/admin/SideBar";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return <>
    <div>
      <SideBar/>
      {children}
    </div>
  </>;
};

export default Layout;