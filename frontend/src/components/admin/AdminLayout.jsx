import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="relative min-h-screen">
      
      {!isSidebarOpen && (
        <button
          onClick={openSidebar}
          className="fixed top-1 left-1 z-40 text-white bg-gray-800 px-2 py-1 rounded text-base font-semibold"
        >
          ☰
        </button>
      )}

      
      {isSidebarOpen && <AdminSidebar onClose={closeSidebar} />}

      
      <div className="ml-0 p-4">{children}</div>
    </div>
  );
};

export default AdminLayout;
