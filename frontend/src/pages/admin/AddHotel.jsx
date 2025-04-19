import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FiPlus, FiImage, FiUpload } from "react-icons/fi";

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

  const removeImage = (index) => {
    setHotel(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const showSuccessMessage = () => {
    Swal.fire({
      title: "Success!",
      text: "Hotel added successfully!",
      icon: "success",
      confirmButtonText: "OK",
      confirmButtonColor: "#4f46e5",
    });
  };

  const showErrorMessage = (message) => {
    Swal.fire({
      title: "Error!",
      text: message,
      icon: "error",
      confirmButtonText: "OK",
      confirmButtonColor: "#4f46e5",
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
    <div className="p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Add New Hotel</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Hotel Name</label>
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Grand Hotel"
                  value={hotel.name}
                  onChange={(e) => setHotel({ ...hotel, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="City, Country"
                  value={hotel.location}
                  onChange={(e) => setHotel({ ...hotel, location: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 min-h-[120px]"
                  placeholder="Describe the hotel..."
                  value={hotel.description}
                  onChange={(e) => setHotel({ ...hotel, description: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Price Per Night ($)</label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="150"
                  value={hotel.pricePerNight}
                  onChange={(e) => setHotel({ ...hotel, pricePerNight: e.target.value })}
                  required
                  min="0"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Rooms Available</label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="50"
                  value={hotel.roomsAvailable}
                  onChange={(e) => setHotel({ ...hotel, roomsAvailable: e.target.value })}
                  required
                  min="0"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={hotel.category}
                  onChange={(e) => setHotel({ ...hotel, category: e.target.value })}
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Luxury">Luxury</option>
                  <option value="Standard">Standard</option>
                  <option value="Budget">Budget</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Rating (0-5)</label>
                <input
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="4.5"
                  value={hotel.rating}
                  onChange={(e) => setHotel({ ...hotel, rating: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Owner ID</label>
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Owner ID"
                  value={hotel.owner}
                  onChange={(e) => setHotel({ ...hotel, owner: e.target.value })}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Facilities (comma separated)</label>
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Pool, WiFi, Gym, Spa"
                  value={hotel.facilities.join(",")}
                  onChange={(e) => setHotel({ ...hotel, facilities: e.target.value.split(",") })}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Images</label>
                <div className="flex gap-2">
                  <input
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Image URL"
                    value={imageInput}
                    onChange={(e) => setImageInput(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={handleAddImage}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    <FiPlus /> Add
                  </button>
                </div>
              </div>

              {hotel.images.length > 0 && (
                <div className="md:col-span-2">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Added Images</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {hotel.images.map((img, index) => (
                      <div key={index} className="relative group">
                        <div className="bg-gray-100 p-2 rounded-lg flex items-center gap-2">
                          <FiImage className="text-indigo-500" />
                          <span className="text-sm truncate flex-1">{img}</span>
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            &times;
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
              >
                <FiUpload /> Add Hotel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddHotel;