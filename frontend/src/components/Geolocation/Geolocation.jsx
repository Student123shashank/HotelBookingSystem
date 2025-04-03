import React, { useEffect, useState } from "react";

function Geolocation() {
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
        .catch(() => setCity("Unable to fetch city"));
    });
  }, []);
  return (
    <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 py-12 px-8 text-center rounded-xl shadow-2xl border border-gray-700 max-w-5xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-extrabold text-gray-100 tracking-wide leading-snug">
        Find the best hotels & stays in{" "}
        <span className="text-yellow-400 italic">
          {city || "your location"}
        </span>
      </h2>
    </div>
  );
}

export default Geolocation;
