import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import { FiMenu } from "react-icons/fi";

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex min-h-screen bg-gray-50">
      
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-40 p-2 rounded-md bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 transition-all lg:hidden"
        aria-label="Toggle sidebar"
      >
        <FiMenu className="w-5 h-5" />
      </button>

     
      <div className={`fixed inset-y-0 left-0 z-30 w-60 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out`}>
        <AdminSidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
      </div>

      
      <div className="flex-1 flex flex-col min-h-screen lg:ml-60">
        <main className="flex-1 p-6 pb-16"> 
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
