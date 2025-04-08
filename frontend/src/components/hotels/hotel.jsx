import React, { useEffect, useState } from "react";

export default function Hotel({ city }) {
  const [hotels, setHotels] = useState([]);
  const [data, setData] = useState([]);
  const [searchCity, setSearchCity] = useState(city || "");
  const [inputCity, setInputCity] = useState("");

  // Fetch data.json once
  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        if (city) {
          filterHotels(json, city);
        } else {
          const randomHotels = json.sort(() => 0.5 - Math.random()).slice(0, 12);
          setHotels(randomHotels);
        }
      });
  }, [city]);

  const filterHotels = (hotelData, targetCity) => {
    const filtered = hotelData.filter(
      (hotel) => hotel.City.toLowerCase() === targetCity.toLowerCase()
    );
    setHotels(filtered);
    setSearchCity(targetCity);
  };

  const handleSearch = () => {
    if (inputCity.trim()) {
      filterHotels(data, inputCity.trim());
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="w-full mt-10 md:mt-16 px-6 md:px-16">
      <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
        {searchCity ? `Hotels in ${searchCity}` : "Top Hotels"}
      </h1>

      <div className="flex justify-center mb-8 gap-2">
        <input
          type="text"
          placeholder="Enter city name..."
          value={inputCity}
          onChange={(e) => setInputCity(e.target.value)}
          onKeyDown={handleKeyDown}
          className="border border-gray-300 px-4 py-2 rounded-xl w-64 text-black"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {hotels.length === 0 ? (
        <p className="text-center text-gray-500">No hotels found in this city.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotels.map((hotel, index) => (
            <div
              key={index}
              className="border rounded-2xl p-5 shadow-md bg-white hover:shadow-lg transition duration-300"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                {hotel["Hotel Name"]}
              </h2>
              <p className="text-gray-600 mb-1">
                City: {hotel.City}, State: {hotel.State}
              </p>
              <p className="text-gray-600 mb-1">Rooms: {hotel["Total Rooms"]}</p>
              <p className="text-gray-600">Category: {hotel.Category}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
