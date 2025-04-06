const express = require("express");
const router = express.Router();
const { addReview, getReviews, getAllReviews } = require("../controllers/reviewController");
const { authenticateToken } = require("./userAuth");

// Add review (user)
router.post("/add-review", authenticateToken, addReview);

// Get reviews for a specific hotel (public)
router.get("/get-reviews/:hotelId", getReviews);

// Admin: Get all reviews
router.get("/all-reviews", authenticateToken, getAllReviews);

module.exports = router;
