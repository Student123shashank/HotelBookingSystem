import React, { useEffect, useState } from "react";
import Hero from "../components/Home/Hero";
import RecentlyAdded from "../components/Home/RecentlyAdded";
import Chatbot from "../components/Chatbot/Chatbot";
import HomePageNav from "../components/HomePageNav/HomePageNav";
import Hotel from "../components/hotels/hotel";

const Home = () => {
  const [city, setCity] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
      )
        .then((res) => res.json())
        .then((data) => {
          setCity(
            data.city ||
              data.locality ||
              data.principalSubdivision ||
              "Unknown Location"
          );
        })
        .catch(() => setCity("Unknown Location"));
    });
  }, []);

  return (
    <>
      <HomePageNav />
      <div className="text-white px-10 py-8">
        <Hero />
        <Hotel city={city} />
        <RecentlyAdded />
        <Chatbot />
      </div>
    </>
  );
};

export default Home;
