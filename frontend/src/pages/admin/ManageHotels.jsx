import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ManageHotel = () => {
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [formData, setFormData] = useState({});

  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");

  
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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Hotels</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {hotels.map((hotel) => (
          <div key={hotel._id} className="bg-white shadow p-4 rounded">
            <h2 className="text-xl font-semibold">{hotel.name}</h2>
            <p className="text-sm text-gray-600">{hotel.location}</p>
            <p className="text-sm mt-1">{hotel.description}</p>
            <p className="text-sm mt-1 font-semibold">
              ₹{hotel.pricePerNight} / night
            </p>
            <div className="flex gap-2 mt-4">
              <button
                className="bg-blue-600 text-white px-3 py-1 rounded"
                onClick={() => handleEditClick(hotel)}
              >
                Edit
              </button>
              <button
                className="bg-red-600 text-white px-3 py-1 rounded"
                onClick={() => handleDelete(hotel._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      
      {selectedHotel && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-[90%] max-w-lg">
            <h2 className="text-xl font-bold mb-4">Update Hotel</h2>
            <div className="flex flex-col gap-2">
              <input
                className="border p-2 rounded"
                type="text"
                placeholder="Name"
                value={formData.name || ""}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <input
                className="border p-2 rounded"
                type="text"
                placeholder="Location"
                value={formData.location || ""}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
              />
              <textarea
                className="border p-2 rounded"
                placeholder="Description"
                value={formData.description || ""}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              ></textarea>
              <input
                className="border p-2 rounded"
                type="number"
                placeholder="Price Per Night"
                value={formData.pricePerNight || ""}
                onChange={(e) =>
                  setFormData({ ...formData, pricePerNight: e.target.value })
                }
              />
              <input
                className="border p-2 rounded"
                type="text"
                placeholder="Category"
                value={formData.category || ""}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              />
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setSelectedHotel(null)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="bg-green-600 text-white px-4 py-2 rounded"
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

