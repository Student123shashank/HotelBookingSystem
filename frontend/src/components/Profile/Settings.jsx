import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useOutletContext } from "react-router-dom";

const Settings = () => {
  const { profile, updateProfile } = useOutletContext(); 
  const [value, setValue] = useState({
    username: profile.username || "",
    email: profile.email || "",
    address: profile.address || "",
    currentPassword: "",
    newPassword: "",
  });

  const userId = localStorage.getItem("id");
  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const updateField = async (field) => {
    try {
      const response = await axios.put(
        `http://localhost:1000/api/v1/update-${field}`,
        { userId, [field]: value[field] },
        { headers }
      );
      Swal.fire("Success", `${field} updated successfully!`, "success");
      updateProfile({ [field]: value[field] }); 
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "Update failed", "error");
    }
  };

  const updatePassword = async () => {
    try {
      await axios.put(
        "http://localhost:1000/api/v1/update-password",
        {
          userId,
          currentPassword: value.currentPassword,
          newPassword: value.newPassword,
        },
        { headers }
      );
      Swal.fire("Success", "Password updated successfully!", "success");
      setValue({ ...value, currentPassword: "", newPassword: "" });
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "Password update failed", "error");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white dark:bg-white shadow-md rounded-md text-black">
      <h2 className="text-2xl font-bold mb-4">Settings</h2>
    
      <label className="block mb-2">Username</label>
      <input 
        type="text" 
        name="username" 
        value={value.username} 
        onChange={handleChange} 
        className="w-full p-2 border rounded text-black bg-white dark:bg-white"
      />
      <button onClick={() => updateField("username")} className="bg-blue-500 text-white px-4 py-2 mt-2 rounded">
        Update Username
      </button>
    
      <label className="block mt-4 mb-2">Email</label>
      <input 
        type="email" 
        name="email" 
        value={value.email} 
        onChange={handleChange} 
        className="w-full p-2 border rounded text-black bg-white dark:bg-white"
      />
      <button onClick={() => updateField("email")} className="bg-blue-500 text-white px-4 py-2 mt-2 rounded">
        Update Email
      </button>
    
      <label className="block mt-4 mb-2">Address</label>
      <input 
        type="text" 
        name="address" 
        value={value.address} 
        onChange={handleChange} 
        className="w-full p-2 border rounded text-black bg-white dark:bg-white"
      />
      <button onClick={() => updateField("address")} className="bg-blue-500 text-white px-4 py-2 mt-2 rounded">
        Update Address
      </button>
    
      <h3 className="text-xl font-bold mt-6">Change Password</h3>
      
      <label className="block mt-4 mb-2">Current Password</label>
      <input 
        type="password" 
        name="currentPassword" 
        value={value.currentPassword} 
        onChange={handleChange} 
        className="w-full p-2 border rounded text-black bg-white dark:bg-white"
      />
      
      <label className="block mt-4 mb-2">New Password</label>
      <input 
        type="password" 
        name="newPassword" 
        value={value.newPassword} 
        onChange={handleChange} 
        className="w-full p-2 border rounded text-black bg-white dark:bg-white"
      />
      
      <button onClick={updatePassword} className="bg-green-500 text-white px-4 py-2 mt-4 rounded">
        Update Password
      </button>
    </div>
  );
};

export default Settings;
