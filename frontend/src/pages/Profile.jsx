import React, { useEffect, useState } from "react";
import Sidebar from "../components/Profile/Sidebar";
import { Outlet } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import axios from "axios";
import Navbar from "../components/Navbar/Navbar";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/get-user-information",
          { headers }
        );
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const updateProfile = (updatedProfile) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      ...updatedProfile,
    }));
  };

  return (
    <>
    <Navbar/>
    <div className="bg-white dark:bg-zinc-900 min-h-screen flex flex-col">
      {!profile ? (
        <div className="w-full h-full flex items-center justify-center flex-grow">
          <Loader />
        </div>
      ) : (
        <div className="flex flex-col md:flex-row flex-grow">

          <div className="w-full md:w-1/5 bg-zinc-100 dark:bg-zinc-800">
            <Sidebar data={profile} />
          </div>


          <div className="w-full md:w-4/5 p-6 overflow-auto text-zinc-900 dark:text-white">
            <Outlet context={{ profile, updateProfile }} />
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default Profile;


