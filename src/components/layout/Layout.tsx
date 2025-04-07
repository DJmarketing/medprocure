
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        <main className="flex-1 p-4 pt-20 lg:p-6 lg:pt-20 lg:pl-64">
          <div className="lg:hidden fixed left-4 top-[72px] z-50">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full shadow-md bg-white"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </div>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
