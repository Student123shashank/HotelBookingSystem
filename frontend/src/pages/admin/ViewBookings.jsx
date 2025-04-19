import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";

const ViewBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const statusOptions = ["Pending", "Confirmed", "Checked In", "Completed", "Canceled"];

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get("http://localhost:1000/api/v1/get-all-bookings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBookings(response.data.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error("Failed to load bookings.");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (bookingId, newStatus) => {
    try {
      await axios.put(
        `http://localhost:1000/api/v1/update-status/${bookingId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Booking status updated!");
      fetchBookings();
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40 text-blue-600 text-lg">
        <FaSpinner className="animate-spin mr-2" /> Loading bookings...
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">📄 All Bookings</h2>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">No bookings found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-6 py-3 text-left">Username</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Address</th>
                <th className="px-6 py-3 text-left">Hotel</th>
                <th className="px-6 py-3 text-left">Check-In</th>
                <th className="px-6 py-3 text-left">Check-Out</th>
                <th className="px-6 py-3 text-center">Guests</th>
                <th className="px-6 py-3 text-center">Amount</th>
                <th className="px-6 py-3 text-center">Status</th>
                <th className="px-6 py-3 text-center">Update</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr
                  key={booking._id}
                  className={`hover:bg-gray-50 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                >
                  <td className="px-6 py-4">{booking.user?.username}</td>
                  <td className="px-6 py-4">{booking.user?.email}</td>
                  <td className="px-6 py-4">{booking.user?.address}</td>
                  <td className="px-6 py-4">{booking.hotel?.name}</td>
                  <td className="px-6 py-4">{booking.checkInDate?.split("T")[0]}</td>
                  <td className="px-6 py-4">{booking.checkOutDate?.split("T")[0]}</td>
                  <td className="px-6 py-4 text-center">{booking.guests}</td>
                  <td className="px-6 py-4 text-center text-green-600 font-semibold">
                    ₹{booking.totalAmount}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-medium
                      ${booking.status === "Confirmed" ? "bg-blue-100 text-blue-800" :
                        booking.status === "Checked In" ? "bg-yellow-100 text-yellow-800" :
                        booking.status === "Completed" ? "bg-green-100 text-green-800" :
                        booking.status === "Canceled" ? "bg-red-100 text-red-800" :
                        "bg-gray-100 text-gray-800"}`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <select
                      onChange={(e) => updateStatus(booking._id, e.target.value)}
                      defaultValue=""
                      className="bg-white border border-gray-300 text-sm rounded-md px-3 py-1 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="" disabled>
                        Update
                      </option>
                      {statusOptions
                        .filter((status) => status !== booking.status)
                        .map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ViewBookings;
