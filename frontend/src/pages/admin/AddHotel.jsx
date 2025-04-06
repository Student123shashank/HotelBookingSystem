import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const AddHotel = () => {
  const [hotel, setHotel] = useState({
    name: "",
    location: "",
    description: "",
    pricePerNight: "",
    facilities: [],
    images: [],
    roomsAvailable: "",
    category: "",
    owner: "",
    rating: 0,
  });

  const [imageInput, setImageInput] = useState("");

  const handleAddImage = () => {
    if (imageInput.trim() !== "") {
      setHotel((prevHotel) => ({
        ...prevHotel,
        images: [...prevHotel.images, imageInput.trim()],
      }));
      setImageInput("");
    }
  };

  const showSuccessMessage = () => {
    Swal.fire({
      title: "Success!",
      text: "Hotel added successfully!",
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  const showErrorMessage = (message) => {
    Swal.fire({
      title: "Error!",
      text: message,
      icon: "error",
      confirmButtonText: "OK",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const id = localStorage.getItem("id");

      const response = await axios.post(
        "http://localhost:1000/api/v1/add-hotel",
        [hotel],
        {
          headers: {
            Authorization: `Bearer ${token}`,
            id,
          },
        }
      );
      showSuccessMessage();
    } catch (err) {
      console.error(err);
      const message =
        err.response?.data?.message || "Failed to add hotel. Try again!";
      showErrorMessage(message);
    }
  };

  return (
    <div className="ml-64 p-6">
      <h1 className="text-2xl font-bold mb-4">Add Hotel</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          placeholder="Hotel Name"
          value={hotel.name}
          onChange={(e) => setHotel({ ...hotel, name: e.target.value })}
        />
        <input
          placeholder="Location"
          value={hotel.location}
          onChange={(e) => setHotel({ ...hotel, location: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={hotel.description}
          onChange={(e) => setHotel({ ...hotel, description: e.target.value })}
        />
        <input
          placeholder="Price Per Night"
          type="number"
          value={hotel.pricePerNight}
          onChange={(e) =>
            setHotel({ ...hotel, pricePerNight: e.target.value })
          }
        />
        <input
          placeholder="Facilities (comma separated)"
          value={hotel.facilities.join(",")}
          onChange={(e) =>
            setHotel({ ...hotel, facilities: e.target.value.split(",") })
          }
        />
        <input
          placeholder="Rooms Available"
          type="number"
          value={hotel.roomsAvailable}
          onChange={(e) =>
            setHotel({ ...hotel, roomsAvailable: e.target.value })
          }
        />
        <select
          value={hotel.category}
          onChange={(e) => setHotel({ ...hotel, category: e.target.value })}
        >
          <option value="">Select Category</option>
          <option value="Luxury">Luxury</option>
          <option value="Standard">Standard</option>
          <option value="Budget">Budget</option>
        </select>
        <input
          placeholder="Owner ID"
          value={hotel.owner}
          onChange={(e) => setHotel({ ...hotel, owner: e.target.value })}
        />
        <input
          placeholder="Rating"
          type="number"
          min="0"
          max="5"
          value={hotel.rating}
          onChange={(e) => setHotel({ ...hotel, rating: e.target.value })}
        />

        
        <div className="flex items-center gap-2">
          <input
            placeholder="Image URL"
            value={imageInput}
            onChange={(e) => setImageInput(e.target.value)}
          />
          <button
            type="button"
            onClick={handleAddImage}
            className="bg-green-500 text-white p-2 rounded"
          >
            Add Image
          </button>
        </div>

        
        <div>
          {hotel.images.map((img, index) => (
            <div key={index} className="flex items-center gap-2">
              <span>{img}</span>
            </div>
          ))}
        </div>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Add Hotel
        </button>
      </form>
    </div>
  );
};

export default AddHotel;
