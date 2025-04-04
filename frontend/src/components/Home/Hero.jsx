import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <>
      <div className="h-[79vh] flex flex-col md:flex-row items-center justify-center px-6 md:px-12">
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold text-blue-600 leading-tight drop-shadow-lg">
            Find Your Perfect Stay
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-400 font-medium">
            Discover the best hotels, enjoy luxury stays, and book hassle-free.
          </p>
          <div className="mt-8">
            <Link
              to="/all-hotel"
              className="bg-blue-600 hover:bg-blue-700 text-white text-lg md:text-xl font-semibold px-10 py-3 rounded-full shadow-lg transition-transform transform hover:scale-105"
            >
              Browse Hotels
            </Link>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex items-center justify-center mt-10 md:mt-0">
          <img
            src="./Hotel.jpg"
            alt="hero"
            className="rounded-lg shadow-2xl w-full md:w-[80%] h-auto"
          />
        </div>
      </div>
    </>
  );
};

export default Hero;
