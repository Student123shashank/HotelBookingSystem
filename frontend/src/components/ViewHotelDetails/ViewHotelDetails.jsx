import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { useParams, useNavigate } from "react-router-dom";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const ViewHotelDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [roomsAvailable, setRoomsAvailable] = useState(0);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:1000/api/v1/get-hotel-by-id/${id}`);
        setHotel(response.data.data);
        setRoomsAvailable(response.data.data.roomsAvailable);
      } catch (error) {
        console.error("Error fetching hotel details:", error);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:1000/api/v1/get-reviews/${id}`);
        setReviews(response.data.reviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchHotelDetails();
    fetchReviews();
  }, [id]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    hotelid: id,
  };

  const showSuccessMessage = (message) => {
    Swal.fire({ title: "Success!", text: message, icon: "success", confirmButtonText: "OK" });
  };

  const handleFavourite = async () => {
    try {
      const response = await axios.put("http://localhost:1000/api/v1/add-hotel-to-favourites", {}, { headers });
      showSuccessMessage(response.data.message);
    } catch (error) {
      Swal.fire({ title: "Error!", text: error.response.data.message, icon: "error", confirmButtonText: "OK" });
    }
  };

  return (
    <>
      {hotel ? (
        <div className="px-4 md:px-12 py-8 bg-white dark:bg-zinc-900 flex flex-col md:flex-row gap-8">
          <div className="bg-zinc-800 rounded px-4 py-12 h-[60vh] lg:h-[88vh] w-full lg:w-3/6 flex flex-col items-center justify-around">
            <img src={hotel.images[0]} alt={hotel.name} className="h-[35vh] lg:h-[40vh] rounded" />
            {isLoggedIn && role === "user" && (
              <div className="mt-4 w-full flex justify-center gap-4">
                <button className="bg-white rounded-full text-3xl p-2 text-red-500 hover:bg-yellow-400 transition-all duration-300" onClick={handleFavourite}>
                  <FaHeart />
                </button>
                <button
                  className="bg-white rounded-full text-3xl p-2 text-blue-500 hover:bg-green-400 transition-all duration-300"
                  onClick={() => navigate(`/buy-hotel/${id}`)}
                >
                  <FaShoppingCart />
                </button>
              </div>
            )}
          </div>
          <div className="p-4 w-full lg:w-3/6">
            <h1 className="text-4xl text-zinc-800 dark:text-white font-semibold">{hotel.name}</h1>
            <p className="text-zinc-800 dark:text-gray-300 mt-1">Location: {hotel.location}</p>
            <p className="text-black dark:text-white mt-4 text-xl">{hotel.description}</p>
            <p className="mt-4 text-zinc-800 dark:text-gray-300 text-3xl font-semibold">Price per Night: ₹{hotel.pricePerNight}</p>
            <p className="mt-4 text-xl font-semibold">
              Rooms Available: <span className={roomsAvailable === 0 ? "text-red-500" : "text-green-500"}>
                {roomsAvailable === 0 ? "Hotel room not available" : roomsAvailable}
              </span>
            </p>
          </div>
        </div>
      ) : (
        <div className="h-screen bg-zinc-900 flex items-center justify-center">
          <Loader />
        </div>
      )}

      {reviews.length > 0 && (
        <div className="mt-8 bg-white dark:bg-zinc-900 p-4 rounded shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-zinc-700 dark:text-white">Reviews</h2>
          {reviews.map((review) => (
            <div key={review._id} className="mb-4 pb-4 flex items-start gap-4">
              <img src={review.userImage || "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"} alt={review.username} className="h-10 w-10 rounded-full" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">{review.username} rated it {review.rating} stars</p>
                <p className="text-lg text-gray-800 dark:text-white">{review.review}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ViewHotelDetails;