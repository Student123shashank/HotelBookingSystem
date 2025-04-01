const express = require("express");
const router = express.Router();
const { addReview, getReviews } = require("../controllers/reviewController");
const { authenticateToken } = require("./userAuth");

// Route to add a review for a hotel
router.post("/add-review", authenticateToken, addReview);

// Route to get reviews for a specific hotel
router.get("/get-reviews/:hotelId", getReviews);

module.exports = router;
