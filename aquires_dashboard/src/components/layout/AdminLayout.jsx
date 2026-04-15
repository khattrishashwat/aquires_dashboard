import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "./AdminSidebar";
import { AdminHeader } from "./AdminHeader";
import { Outlet } from "react-router-dom";
import { AdminRightSidebar } from "./AdminRightSidebar";
import { useState } from "react";

const AdminLayout = () => {
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const [sidebarContent, setSidebarContent] = useState(null);

  const openRightSidebar = (content) => {
    setSidebarContent(content);
    setIsRightSidebarOpen(true);
  };

  const closeRightSidebar = () => {
    setIsRightSidebarOpen(false);
    setSidebarContent(null);
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-white">
        <AdminSidebar />
        <div className="flex-1 flex flex-col w-full overflow-hidden">
          <AdminHeader 
            onOpenRightSidebar={openRightSidebar}
          />
          <main className="flex-1 overflow-auto bg-[#fafafa]">
            <Outlet />
          </main>
        </div>
        <AdminRightSidebar 
          isOpen={isRightSidebarOpen}
          onClose={closeRightSidebar}
          content={sidebarContent}
        />
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout; 