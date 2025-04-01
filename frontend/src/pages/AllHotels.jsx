import React, { useEffect, useState } from "react";
import axios from "axios";
import HotelCard from "../components/HotelCard/HotelCard";
import Loader from "../components/Loader/Loader";

const AllHotel = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterRating, setFilterRating] = useState(null);

  useEffect(() => {
    const fetchHotels = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get("http://localhost:1000/api/v1/get-all-hotels");
        if (response.data?.data) {
          setHotels(response.data.data);
        } else {
          setError("Failed to fetch hotels.");
        }
      } catch (error) {
        console.error("Error fetching hotels:", error);
        setError("Error fetching hotels. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);


  const filteredHotels = filterRating
    ? hotels.filter((hotel) => hotel.rating === filterRating)
    : hotels;

  return (
    <div className="bg-white dark:bg-zinc-900 min-h-screen p-4">
      <h4 className="text-3xl text-yellow-400 font-semibold">All Hotels</h4>


      <div className="my-4 flex gap-4">
        <button
          className={`px-4 py-2 border rounded ${filterRating === null ? "bg-yellow-500 text-white" : "bg-gray-200 dark:bg-gray-700"}`}
          onClick={() => setFilterRating(null)}
        >
          All
        </button>
        <button
          className={`px-4 py-2 border rounded ${filterRating === 5 ? "bg-yellow-500 text-white" : "bg-gray-200 dark:bg-gray-700"}`}
          onClick={() => setFilterRating(5)}
        >
          ⭐⭐⭐⭐⭐ (5 Star)
        </button>
        <button
          className={`px-4 py-2 border rounded ${filterRating === 4 ? "bg-yellow-500 text-white" : "bg-gray-200 dark:bg-gray-700"}`}
          onClick={() => setFilterRating(4)}
        >
          ⭐⭐⭐⭐ (4 Star)
        </button>
        <button
          className={`px-4 py-2 border rounded ${filterRating === 3 ? "bg-yellow-500 text-white" : "bg-gray-200 dark:bg-gray-700"}`}
          onClick={() => setFilterRating(3)}
        >
          ⭐⭐⭐ (3 Star)
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center my-8">
          <Loader />
        </div>
      ) : error ? (
        <div className="text-red-500 text-lg my-8 flex justify-center">{error}</div>
      ) : (
        <div className="my-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredHotels.length > 0 ? (
            filteredHotels.map((hotel, i) => (
              <div key={i}>
                <HotelCard data={hotel} />
              </div>
            ))
          ) : (
            <div className="text-gray-400 text-center col-span-full">No hotels available.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default AllHotel;
