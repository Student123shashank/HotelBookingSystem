import React from "react";
import { Link } from "react-router-dom";


const HotelCard = ({ data, favourite, onRemove }) => {
  const hotelImage = data.images?.length > 0 ? data.images[0] : placeholderImg;

  return (
    <div className="bg-zinc-800 rounded p-4 flex flex-col hover:bg-yellow-500 transition duration-300">
      <Link to={`/view-hotel-details/${data._id}`} className="block">
        <div className="bg-zinc-900 rounded flex items-center justify-center">
          <img 
            src={hotelImage} 
            alt={data.name || "Hotel Image"} 
            className="h-[25vh] w-full object-cover rounded"
            onError={(e) => (e.target.src = placeholderImg)} 
          />
        </div>
        <h2 className="mt-4 text-xl text-white font-semibold">{data.name}</h2>
        <p className="mt-2 text-white font-semibold">{data.location}</p>
        <p className="mt-2 text-zinc-200 font-semibold text-lg">{data.category}</p>
        <p className="mt-2 text-zinc-200 font-semibold text-lg">{data.facilities?.join(", ")}</p>
        <p className="mt-2 text-zinc-200 font-semibold text-xl">₹{data.pricePerNight} / Night</p>
        <p className="mt-2 text-yellow-300 font-semibold">{data.rating} ⭐</p>
      </Link>
      {favourite && (
        <button
          className="bg-yellow-50 px-4 py-2 rounded border border-yellow-500 text-yellow-500 mt-4"
          onClick={() => onRemove(data._id)}
        >
          Remove from Favourites
        </button>
      )}
    </div>
  );
};

export default HotelCard;
