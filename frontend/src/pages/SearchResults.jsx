import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import HotelCard from "../components/HotelCard/HotelCard";
import Navbar from "../components/Navbar/Navbar";

const SearchResults = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    const fetchHotels = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(
          `http://localhost:1000/api/v1/search?query=${query}`
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setHotels(data.hotels || []);
        if (data.hotels.length === 0) {
          setError("No hotels found.");
        }
      } catch (error) {
        console.error("Error fetching hotels:", error);
        setError("No hotels found.");
      } finally {
        setLoading(false);
      }
    };

    if (query) fetchHotels();
  }, [query]);

  useEffect(() => {
    const updateDarkMode = () => {
      const isDark = localStorage.getItem("darkMode") === "true";
      setDarkMode(isDark);
      if (isDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };

    window.addEventListener("dark-mode-change", updateDarkMode);

    updateDarkMode();

    return () => {
      window.removeEventListener("dark-mode-change", updateDarkMode);
    };
  }, []);

  const handleSort = (e) => {
    const option = e.target.value;
    setSortOption(option);

    let sortedHotels = [...hotels];

    if (option === "low-to-high") {
      sortedHotels = sortedHotels.sort(
        (a, b) => a.pricePerNight - b.pricePerNight
      );
    } else if (option === "high-to-low") {
      sortedHotels = sortedHotels.sort(
        (a, b) => b.pricePerNight - a.pricePerNight
      );
    }

    setHotels([...sortedHotels]);
  };

  if (loading) return <Loader />;
  if (error)
    return (
      <div
        className={`flex-grow flex flex-col items-center justify-center ${
          darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
        } min-h-screen`}
      >
        <p className="text-2xl font-bold mt-16">{error}</p>
        <img src="/Empty.png" alt="No hotels found" className="h-[20vh] mt-4" />
      </div>
    );

  return (
    <>
      <Navbar />
      <div
        className={`flex flex-col ${
          darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
        } min-h-screen`}
      >
        <div className="flex justify-between items-center mb-4 p-4">
          <h1 className="text-2xl font-bold">Search Results for "{query}"</h1>
          <select
            value={sortOption}
            onChange={handleSort}
            className="p-2 border border-gray-900 rounded bg-gray-600 text-white transition-all hover:bg-yellow-500"
          >
            <option value="default">Sort by</option>
            <option value="low-to-high">Price: Low to High</option>
            <option value="high-to-low">Price: High to Low</option>
          </select>
        </div>
        <div className="flex-grow p-4">
          {hotels.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {hotels.map((hotel) => (
                <HotelCard key={hotel._id} data={hotel} />
              ))}
            </div>
          ) : (
            <p className="text-center text-xl">No hotels found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchResults;
