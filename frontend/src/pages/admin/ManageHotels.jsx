import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaTrashAlt, FaEdit } from "react-icons/fa";

const ManageHotel = () => {
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [formData, setFormData] = useState({});

  const token = localStorage.getItem("token");

  const fetchHotels = async () => {
    try {
      const res = await axios.get("http://localhost:1000/api/v1/get-all-hotels");
      setHotels(res.data.data);
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to fetch hotels.", "error");
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const handleDelete = async (hotelId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!"
    });

    if (result.isConfirmed) {
      try {
        await axios.delete("http://localhost:1000/api/v1/delete-hotel", {
          headers: { hotelid: hotelId, token },
        });
        Swal.fire("Deleted!", "Hotel has been deleted.", "success");
        fetchHotels();
      } catch (error) {
        console.error(error);
        Swal.fire("Error", "Failed to delete hotel.", "error");
      }
    }
  };

  const handleEditClick = (hotel) => {
    setSelectedHotel(hotel);
    setFormData({ ...hotel });
  };

  const handleUpdate = async () => {
    try {
      await axios.put("http://localhost:1000/api/v1/update-hotel", formData, {
        headers: {
          hotelid: selectedHotel._id,
          token,
        },
      });
      Swal.fire("Updated!", "Hotel updated successfully.", "success");
      setSelectedHotel(null);
      fetchHotels();
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Update failed!", "error");
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100">
      <h1 className="text-3xl font-bold text-center text-indigo-700 mb-8">
        Manage Hotels
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map((hotel) => (
          <div
            key={hotel._id}
            className="bg-white shadow-lg hover:shadow-xl transition-shadow p-5 rounded-xl border border-gray-200"
          >
            <h2 className="text-xl font-bold text-gray-800">{hotel.name}</h2>
            <p className="text-sm text-gray-500">{hotel.location}</p>
            <p className="mt-2 text-gray-700">{hotel.description}</p>
            <p className="mt-2 font-medium text-indigo-600">
              ₹{hotel.pricePerNight} / night
            </p>
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => handleEditClick(hotel)}
                className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded shadow"
              >
                <FaEdit /> Edit
              </button>
              <button
                onClick={() => handleDelete(hotel._id)}
                className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded shadow"
              >
                <FaTrashAlt /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for updating */}
      {selectedHotel && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white rounded-lg p-8 shadow-xl w-[90%] max-w-xl animate-fadeIn">
            <h2 className="text-2xl font-bold mb-4 text-indigo-700">Update Hotel</h2>
            <div className="flex flex-col gap-3">
              <input
                className="border p-2 rounded focus:outline-indigo-500"
                type="text"
                placeholder="Name"
                value={formData.name || ""}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <input
                className="border p-2 rounded focus:outline-indigo-500"
                type="text"
                placeholder="Location"
                value={formData.location || ""}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
              <textarea
                className="border p-2 rounded focus:outline-indigo-500"
                placeholder="Description"
                value={formData.description || ""}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              ></textarea>
              <input
                className="border p-2 rounded focus:outline-indigo-500"
                type="number"
                placeholder="Price Per Night"
                value={formData.pricePerNight || ""}
                onChange={(e) => setFormData({ ...formData, pricePerNight: e.target.value })}
              />
              <input
                className="border p-2 rounded focus:outline-indigo-500"
                type="text"
                placeholder="Category"
                value={formData.category || ""}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              />
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setSelectedHotel(null)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageHotel;
