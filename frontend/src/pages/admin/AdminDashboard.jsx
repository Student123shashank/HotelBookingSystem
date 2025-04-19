import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaHotel, FaUsers, FaClipboardList } from "react-icons/fa";

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

  const stats = [
    {
      title: "Total Hotels",
      count: totalHotels,
      icon: <FaHotel className="text-3xl text-indigo-600" />,
      color: "from-indigo-100 to-indigo-50",
    },
    {
      title: "Total Users",
      count: totalUsers,
      icon: <FaUsers className="text-3xl text-green-600" />,
      color: "from-green-100 to-green-50",
    },
    {
      title: "Total Bookings",
      count: totalBookings,
      icon: <FaClipboardList className="text-3xl text-pink-600" />,
      color: "from-pink-100 to-pink-50",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`bg-gradient-to-br ${stat.color} shadow-lg rounded-xl p-6 flex items-center gap-4 hover:scale-105 transform transition-all duration-300 ease-in-out`}
            >
              <div className="p-4 bg-white rounded-full shadow-inner">{stat.icon}</div>
              <div>
                <p className="text-sm font-semibold text-gray-500">{stat.title}</p>
                <h2 className="text-3xl font-bold text-gray-800">{stat.count}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
