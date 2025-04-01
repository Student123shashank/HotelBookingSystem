import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="h-[79vh] flex flex-col md:flex-row items-center justify-center">
      <div className="w-full mb-12 md:mb-0 lg:w-3/6 flex flex-col items-center lg:items-start justify-center">
        <h1 className="text-4xl lg:text-6xl font-semibold text-blue-500 text-center lg:text-left">
          Find Your Perfect Stay
        </h1>
        <p className="mt-4 text-xl text-blue-400 text-center lg:text-left">
          Discover the best hotels, enjoy luxury stays, and book hassle-free.
        </p>
        <div className="mt-8">
          <Link
            to="/all-hotel"
            className="text-blue-400 text-xl lg:text-2xl font-semibold border border-blue-600 px-10 py-2 hover:bg-blue-900 rounded-full"
          >
            Browse Hotels
          </Link>
        </div>
      </div>
      <div className="w-full lg:w-3/6 h-auto lg:h-[100%] flex items-center justify-center">
      <img src="./Hotel.jpg" alt="hero" className="rounded-lg shadow-lg w-full h-auto lg:w-[90%] lg:h-[80%]" />

      </div>
    </div>
  );
};

export default Hero;
