import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const updateImage = () => {
      setFade(false);

      const timestamp = new Date().getTime();
      const newUrl = `https://picsum.photos/800/600?random=${timestamp}`;
      const img = new Image();
      img.src = newUrl;

      img.onload = () => {
        setTimeout(() => {
          setImageUrl(newUrl);
          setFade(true);
        }, 200);
      };
    };

    updateImage();
    const interval = setInterval(updateImage, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-[79vh] flex flex-col md:flex-row items-center justify-between px-6 md:px-16 font-sans">
      <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
        <h1 className="text-5xl md:text-7xl font-black text-blue-600 leading-snug tracking-tight drop-shadow-lg">
          Find Your Perfect Stay
        </h1>
        <p className="text-lg md:text-2xl text-gray-500 font-medium leading-relaxed">
          Discover the best hotels, enjoy luxury stays, and book hassle-free.
        </p>
        <div>
          <Link
            to="/all-hotel"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-lg md:text-xl font-semibold px-10 py-3 rounded-full shadow-lg transition-transform duration-300 transform hover:scale-105"
          >
            Browse Hotels
          </Link>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center mt-10 md:mt-0 relative">
        {fade && (
          <div className="absolute top-4 left-4 w-[80%] md:w-[80%] h-full bg-blue-600 opacity-30 rounded-xl blur-2xl z-0 transition-opacity duration-700" />
        )}
        {imageUrl && (
          <img
            src={imageUrl}
            alt="hero"
            className={`relative z-10 rounded-xl shadow-2xl w-full md:w-[80%] h-auto object-cover transition-opacity duration-700 ease-in-out ${
              fade ? "opacity-100" : "opacity-0"
            }`}
          />
        )}
      </div>
    </div>
  );
};

export default Hero;
