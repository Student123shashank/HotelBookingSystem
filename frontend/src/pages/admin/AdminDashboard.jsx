import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [totalHotels, setTotalHotels] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalBookings, setTotalBookings] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [hotelsRes, usersRes, bookingsRes] = await Promise.all([
          axios.get("http://localhost:1000/api/v1/total-hotels"),
          axios.get("http://localhost:1000/api/v1/total-users"),
          axios.get("http://localhost:1000/api/v1/total-bookings"),
        ]);

        setTotalHotels(hotelsRes.data.count);
        setTotalUsers(usersRes.data.count);
        setTotalBookings(bookingsRes.data.count);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Total Hotels</h2>
          <p className="text-2xl">{totalHotels}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Total Users</h2>
          <p className="text-2xl">{totalUsers}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Total Bookings</h2>
          <p className="text-2xl">{totalBookings}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
