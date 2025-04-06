import React, { useEffect, useState } from "react";
import axios from "axios";

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
      <h2 className="text-2xl font-bold mb-4">All Hotel Reviews</h2>
      {loading ? (
        <p>Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p>No reviews found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Username</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Hotel Name</th>
                <th className="px-4 py-2 border">Rating</th>
                <th className="px-4 py-2 border">Review</th>
                <th className="px-4 py-2 border">Date</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((rev) => (
                <tr key={rev._id} className="text-center">
                  <td className="px-4 py-2 border">{rev.userId?.username}</td>
                  <td className="px-4 py-2 border">{rev.userId?.email}</td>
                  <td className="px-4 py-2 border">{rev.hotelId?.name}</td>
                  <td className="px-4 py-2 border">{rev.rating}</td>
                  <td className="px-4 py-2 border">{rev.review}</td>
                  <td className="px-4 py-2 border">
                    {new Date(rev.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ViewReviews;
