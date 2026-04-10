import { SidebarProvider } from "@/components/ui/sidebar";
import {AdminSidebar}  from "./AdminSidebar";
import {AdminHeader}  from "./AdminHeader";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AdminSidebar />
        <div className="flex-1 flex flex-col w-full overflow-hidden">
          <AdminHeader />
          <main className="flex-1 overflow-auto bg-[#fafafa]">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;