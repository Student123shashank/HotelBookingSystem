import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import { 
  FiHome, FiPlusSquare, FiGrid, FiUsers, 
  FiCalendar, FiStar, FiLogOut, FiX, FiChevronRight
} from "react-icons/fi";

const AdminSidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.clear();
    dispatch(authActions.logout());
    navigate("/");
    onClose();
  };

  const navItems = [
    { to: "/admin/dashboard", icon: <FiHome />, text: "Dashboard" },
    { to: "/admin/add-hotel", icon: <FiPlusSquare />, text: "Add Hotel" },
    { to: "/admin/manage-hotels", icon: <FiGrid />, text: "Manage Hotels" },
    { to: "/admin/manage-users", icon: <FiUsers />, text: "Manage Users" },
    { to: "/admin/view-bookings", icon: <FiCalendar />, text: "View Bookings" },
    { to: "/admin/view-reviews", icon: <FiStar />, text: "View Reviews" },
  ];

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-indigo-800 to-indigo-900 text-white w-full p-4 overflow-y-auto">
      
      <div className="flex justify-between items-center mb-8 p-2 border-b border-indigo-700">
        <h2 className="text-xl font-bold text-white flex items-center">
          <span className="bg-white text-indigo-600 rounded-lg p-1 mr-2">
            <FiHome />
          </span>
          <span>Hotel<span className="text-indigo-300">Admin</span></span>
        </h2>
        <button
          onClick={onClose}
          className="text-white hover:text-indigo-300 lg:hidden transition-colors"
          aria-label="Close sidebar"
        >
          <FiX className="w-6 h-6" />
        </button>
      </div>
      
     
      <nav className="flex-1">
        <ul className="flex flex-col gap-1">
          {navItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.to}
                onClick={onClose}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-indigo-700 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg group-hover:text-indigo-200 transition-colors">
                    {item.icon}
                  </span>
                  <span className="group-hover:text-white">{item.text}</span>
                </div>
                <FiChevronRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      
      <div className="mt-auto pt-4 border-t border-indigo-700">
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-3 w-full p-3 rounded-lg bg-indigo-900 hover:bg-indigo-950 transition-all"
        >
          <FiLogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
