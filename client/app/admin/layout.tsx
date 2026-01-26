import { ReactNode, Suspense } from "react";
import SideBar from "@/components/admin/SideBar";

import Admin from "@/components/admin/Admin";


type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <Suspense fallback={null}>
      <div>
        {/* Top Bar */}
        <div className="h-14 w-full px-10 bg-white border-b border-gray-600">
          <Suspense fallback={null}>
            <Admin />
          </Suspense>
        </div>

        {/* Body */}
        <div className="flex">
          {/* Sidebar */}
          <div className="xl:w-64 lg:w-64 w-48">
            <Suspense fallback={null}>
              <SideBar />
            </Suspense>
          </div>

          {/* Content */}
          <div className="flex-1">
            {children}
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default Layout;
