import React, { useEffect, useState } from "react";
import axios from "axios";
import { Star } from "lucide-react";

const ViewReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:1000/api/v1/all-reviews", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setReviews(res.data.reviews);
    } catch (error) {
      console.error("Error fetching reviews", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
        All Hotel Reviews
      </h2>

      {loading ? (
        <p className="text-center text-lg text-gray-500">Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p className="text-center text-gray-500">No reviews found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev._id}
              className="bg-white shadow-lg rounded-xl p-4 border border-gray-100 hover:shadow-xl transition duration-300"
            >
              <div className="mb-2">
                <h3 className="text-lg font-semibold text-gray-800">
                  {rev.hotelId?.name}
                </h3>
                <p className="text-sm text-gray-500">{rev.userId?.username} ({rev.userId?.email})</p>
              </div>

              <div className="flex items-center mb-2 text-yellow-500">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
                <span className="ml-2 text-sm text-gray-600">{rev.rating} Stars</span>
              </div>

              <p className="text-gray-700 text-sm mb-2 italic">"{rev.review}"</p>

              <p className="text-right text-xs text-gray-400">
                {new Date(rev.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewReviews;
