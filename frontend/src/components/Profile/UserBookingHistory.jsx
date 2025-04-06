import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const UserBookingHistory = () => {
  const [bookingHistory, setBookingHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookingHistory = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/get-booking-history",
          { headers }
        );
        setBookingHistory(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching booking history:", error);
        setLoading(false);
      }
    };
    fetchBookingHistory();
  }, []);

  const showSuccessMessage = (message) => {
    Swal.fire({
      title: "Success!",
      text: message,
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  const showErrorMessage = (message) => {
    Swal.fire({
      title: "Error!",
      text: message,
      icon: "error",
      confirmButtonText: "OK",
    });
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      const response = await axios.put(
        `http://localhost:1000/api/v1/update-status/${bookingId}`,
        { status: "Canceled" },
        { headers }
      );
      setBookingHistory((prevBookings) =>
        prevBookings.map((booking) =>
          booking._id === bookingId
            ? { ...booking, status: "Canceled" }
            : booking
        )
      );
      showSuccessMessage(response.data.message);
    } catch (error) {
      console.error("Error canceling booking:", error);
      showErrorMessage("Error canceling booking");
    }
  };

  const handleReview = (hotelId) => {
    navigate(`/profile/add-review/${hotelId}`);
  };

  const handleViewHotelDetails = (hotelId) => {
    navigate(`/view-hotel-details/${hotelId}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[100%]">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex-grow p-4 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white flex flex-col">
      {bookingHistory.length === 0 ? (
        <div className="text-5xl font-semibold h-full text-zinc-900 dark:text-white flex items-center justify-center flex-col">
          <h1 className="text-5xl font-semibold mt-40 mb-0">No Booking History</h1>
          <img src="/Empty.png" alt="No bookings" className="h-[20vh] my-8" />
        </div>
      ) : (
        <div className="overflow-auto max-h-[100vh]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookingHistory.map((item) => (
              <div key={item._id} className="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-4 flex flex-col gap-4">
                <img
                  src={item.hotel.images || "/placeholder-hotel.png"}
                  alt={item.hotel.name}
                  className="w-full h-48 object-cover rounded-md cursor-pointer"
                  onClick={() => handleViewHotelDetails(item.hotel._id)}
                />
                <div>
                  <h1 className="text-lg font-semibold text-zinc-900 dark:text-white">
                    {item.hotel.name}
                  </h1>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {item.hotel.description.slice(0, 100)}...
                  </p>
                  <p className="text-sm text-zinc-700 dark:text-zinc-300">
                    Location: {item.hotel.location}
                  </p>
                  <p className="text-lg font-bold text-yellow-500">
                    ₹{item.hotel.pricePerNight} per night
                  </p>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
                    <span
                      className={`font-semibold ${
                        item.status === "Canceled"
                          ? "text-red-500"
                          : item.status === "Pending"
                          ? "text-yellow-600"
                          : item.status === "Confirmed"
                          ? "text-blue-500"
                          : "text-green-600"
                      }`}
                    >
                      Status: {item.status}
                    </span>

                    <button
                      onClick={() => handleCancelBooking(item._id)}
                      className={`py-1 px-3 rounded-lg transition-all ${
                        item.status === "Pending"
                          ? "bg-red-500 text-white hover:bg-red-600"
                          : "bg-gray-300 text-gray-700 cursor-not-allowed"
                      }`}
                      disabled={item.status !== "Pending"}
                    >
                      Cancel
                    </button>
                  </div>

                  <button
                    onClick={() => handleReview(item.hotel._id)}
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all"
                  >
                    Review
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserBookingHistory;
