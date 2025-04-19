import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import Swal from 'sweetalert2';

const Sidebar = ({ data }) => {
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState(data.avatar);

  const showLogoutMessage = () => {
    Swal.fire({
      title: 'Logged Out',
      text: 'You have logged out successfully.',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    showLogoutMessage();
    navigate("/");
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("avatar", file);

      try {
        const response = await fetch("http://localhost:1000/api/v1/upload-avatar", {
          method: "POST",
          headers: {
            id: localStorage.getItem("id"),
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formData,
        });

        const result = await response.json();
        if (result.success) {
          setAvatar(result.avatarUrl);
        } else {
          alert(result.message || "Failed to upload avatar.");
        }
      } catch (error) {
        console.error("Error uploading avatar:", error);
      }
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded flex flex-col items-center justify-between h-[100%] mb-6">
      <div className="flex items-center flex-col justify-center">
      <div className="relative">
  <img
    src={avatar}
    className="w-24 h-24 rounded-full object-cover border-2 border-white cursor-pointer"
    alt="User Avatar"
    onClick={() => document.getElementById("avatarInput").click()}
  />
  <input
    id="avatarInput"
    type="file"
    accept="image/*"
    className="hidden"
    onChange={handleFileChange}
  />
</div>
        <p className="mt-3 text-lg text-white font-semibold">{data.username}</p>
        <p className="mt-1 text-normal text-gray-300">{data.email}</p>
        <div className="w-full mt-4 h-[1px] bg-gray-500"></div>
      </div>

      <div className="w-full flex flex-col items-center justify-start mt-4 space-y-4">
        <Link
          to="/profile/bookingHistory"
          className="text-white font-semibold w-full py-2 text-center hover:bg-gray-900 rounded transition-all duration-300"
        >
          Booking History
        </Link>
        <Link
          to="/profile"
          className="text-white font-semibold w-full py-2 text-center hover:bg-gray-900 rounded transition-all duration-300"
        >
          Favourites
        </Link>
        <Link
          to="/profile/settings"
          className="text-white font-semibold w-full py-2 text-center hover:bg-gray-900 rounded transition-all duration-300"
        >
          Settings
        </Link>
      </div>

      <button
        onClick={handleLogout}
        className="bg-red-600 w-full mt-4 text-white font-semibold flex items-center justify-center py-2 rounded hover:bg-red-700 transition-all duration-300"
      >
        Log Out
        <FaSignOutAlt className="ms-4" />
      </button>
    </div>
  );
};

export default Sidebar;