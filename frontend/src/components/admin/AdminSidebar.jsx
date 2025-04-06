import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";

const AdminSidebar = ({ onClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.clear();
    dispatch(authActions.logout());
    navigate("/");
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 h-full bg-gray-900 text-white w-60 p-4 z-50 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Admin Panel</h2>
        <button
          onClick={onClose}
          className="text-white text-2xl font-bold hover:text-red-500"
        >
          ×
        </button>
      </div>
      <nav className="flex flex-col gap-2">
        <Link to="/admin/dashboard" onClick={onClose}>Dashboard</Link>
        <Link to="/admin/add-hotel" onClick={onClose}>Add Hotel</Link>
        <Link to="/admin/manage-hotels" onClick={onClose}>Manage Hotels</Link>
        <Link to="/admin/manage-users" onClick={onClose}>Manage Users</Link>
        <Link to="/admin/view-bookings" onClick={onClose}>View Bookings</Link>
        <Link to="/admin/view-reviews" onClick={onClose}>View Reviews</Link>
        <button
          onClick={handleLogout}
          className="mt-4 p-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </nav>
    </div>
  );
};

export default AdminSidebar;
