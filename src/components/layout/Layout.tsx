
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4 pt-20 lg:pl-64 md:p-6 md:pt-20">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
