import React, { useState, useEffect } from "react";
import axios from "axios";
import HotelCard from "../HotelCard/HotelCard";  
import Swal from "sweetalert2";

const Favourites = () => {
  const [favouriteHotels, setFavouriteHotels] = useState([]);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/get-favourite-hotels",
          { headers }
        );
        setFavouriteHotels(response.data.data);
      } catch (error) {
        console.error("Error fetching favourite hotels:", error);
      }
    };
    fetchFavourites();
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

  const handleRemoveHotel = async (hotelId) => {
    try {
      const response = await axios.put(
        "http://localhost:1000/api/v1/remove-hotel-from-favourites",
        {},
        { headers: { ...headers, hotelid: hotelId } }
      );
      setFavouriteHotels((prevHotels) =>
        prevHotels.filter((hotel) => hotel._id !== hotelId)
      );
      showSuccessMessage(response.data.message);
    } catch (error) {
      console.error("Error removing hotel from favourites:", error);
      showErrorMessage("Error removing hotel from favourites");
    }
  };

  return (
    <div className="w-full h-full flex flex-col p-4 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white">
      {favouriteHotels.length === 0 && (
        <div className="text-5xl font-semibold h-full flex items-center justify-center flex-col">
          No Favourite Hotels
          <img
            src="/Empty.png"
            alt="No favourites"
            className="h-[20vh] my-8"
          />
        </div>
      )}
      {favouriteHotels.length > 0 && (
        <div className="max-h-[100vh] overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {favouriteHotels.map((hotel, i) => (
              <div key={i}>
                <HotelCard data={hotel} favourite={true} onRemove={handleRemoveHotel} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Favourites;
