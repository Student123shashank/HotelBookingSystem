const Review = require("../models/Review");

// Add a review
const addReview = async (req, res) => {
  const { hotelId, rating, review } = req.body;
  const userId = req.user.id;

  try {
    const newReview = new Review({
      hotelId,
      userId,
      rating,
      review,
    });

    await newReview.save();
    res.status(201).json({ message: "Review added successfully", review: newReview });
  } catch (error) {
    res.status(500).json({ message: "Error adding review", error });
  }
};

// Get reviews for a specific hotel
const getReviews = async (req, res) => {
  const { hotelId } = req.params;

  try {
    const reviews = await Review.find({ hotelId })
      .populate("userId", "username email")
      .populate("hotelId", "name");

    res.status(200).json({ reviews });
  } catch (error) {
    res.status(500).json({ message: "Error fetching reviews", error });
  }
};

// Admin: Get all reviews
const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("userId", "username email")
      .populate("hotelId", "name");

    res.status(200).json({ reviews });
  } catch (error) {
    res.status(500).json({ message: "Error fetching all reviews", error });
  }
};

module.exports = {
  addReview,
  getReviews,
  getAllReviews,
};
