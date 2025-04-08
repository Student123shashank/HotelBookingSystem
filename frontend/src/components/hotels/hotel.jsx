import React, { useEffect, useState } from "react";

export default function Hotel() {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        // Shuffle and select 10 random hotels
        const randomHotels = data.sort(() => 0.5 - Math.random()).slice(0, 12);
        setHotels(randomHotels);
      });
  }, []);

  return (
    <div className="w-full mt-10 md:mt-16 px-6 md:px-16">
      <h1 className="text-3xl font-bold text-blue-700 mb-8 text-center">
        Top 10 Random Hotels
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map((hotel, index) => (
          <div
            key={index}
            className="border rounded-2xl p-5 shadow-md bg-white hover:shadow-lg transition duration-300"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              {hotel["Hotel Name"]}
            </h2>
            <p className="text-gray-600 mb-1">{hotel.Address}</p>
            <p className="text-gray-600 mb-1">
              City: {hotel.City}, State: {hotel.State}
            </p>
            <p className="text-gray-600 mb-1">Rooms: {hotel["Total Rooms"]}</p>
            <p className="text-gray-600">Category: {hotel.Category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

