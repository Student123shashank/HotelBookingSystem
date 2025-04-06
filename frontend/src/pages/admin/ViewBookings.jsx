import React, { useEffect, useState } from "react";
import axios from "axios";

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
      fetchBookings(); 
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  if (loading) return <div className="text-center mt-10">Loading bookings...</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">All Bookings</h2>

      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border">Username</th>
                <th className="py-2 px-4 border">Email</th>
                <th className="py-2 px-4 border">Address</th>
                <th className="py-2 px-4 border">Hotel</th>
                <th className="py-2 px-4 border">Check-In</th>
                <th className="py-2 px-4 border">Check-Out</th>
                <th className="py-2 px-4 border">Guests</th>
                <th className="py-2 px-4 border">Amount</th>
                <th className="py-2 px-4 border">Status</th>
                <th className="py-2 px-4 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id} className="text-center">
                  <td className="py-2 px-4 border">{booking.user?.username}</td>
                  <td className="py-2 px-4 border">{booking.user?.email}</td>
                  <td className="py-2 px-4 border">{booking.user?.address}</td>
                  <td className="py-2 px-4 border">{booking.hotel?.name}</td>
                  <td className="py-2 px-4 border">{booking.checkInDate?.split("T")[0]}</td>
                  <td className="py-2 px-4 border">{booking.checkOutDate?.split("T")[0]}</td>
                  <td className="py-2 px-4 border">{booking.guests}</td>
                  <td className="py-2 px-4 border">₹{booking.totalAmount}</td>

                  
                  <td className="py-2 px-4 border font-semibold">{booking.status}</td>

                  
                  <td className="py-2 px-4 border">
                    <select
                      onChange={(e) => updateStatus(booking._id, e.target.value)}
                      defaultValue="" 
                      className="border px-2 py-1 rounded"
                    >
                      <option value="" disabled>Update</option>
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
