import React, { useEffect, useState } from "react";
import axios from "axios";
import HotelCard from "../HotelCard/HotelCard"; 
import Loader from "../Loader/Loader";

const RecentlyAdded = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotels = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:1000/api/v1/get-recent-hotels");
        if (response.data.status === "Success") {
          setData(response.data.data);
        } else {
          console.error("Failed to fetch recent hotels");
        }
      } catch (error) {
        console.error("Error fetching recent hotels:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  return (
    <div className="mt-8 px-4">
      <h4 className="text-3xl text-blue-400">Recently Added Hotels</h4>
      {loading ? (
        <div className="flex items-center justify-center my-8">
          <Loader />
        </div>
      ) : (
        <div className="my-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.map((hotel, i) => (
            <div key={i} className="flex flex-col h-full">
              <HotelCard data={hotel} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentlyAdded;
