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
    <div className="py-12 px-8 text-center max-w-5xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-extrabold text-black tracking-wide leading-snug">
        Discover the <span className="italic">best hotels & stays</span> in{" "}
        <span className="text-blue-600 italic font-extrabold">
          {city || "your location"}
        </span>
      </h2>
    </div>
  );
}

export default Geolocation;
