const Review = require("../models/Review");

const addReview = async (req, res) => {
    const { hotelId, rating, review } = req.body;
    const userId = req.user.id;
    const username = req.user.username;

    try {
        const newReview = new Review({
            hotelId,
            userId,
            username,
            rating,
            review,
        });

        await newReview.save();
        res.status(201).json({ message: "Review added successfully", review: newReview });
    } catch (error) {
        res.status(500).json({ message: "Error adding review", error });
    }
};

const getReviews = async (req, res) => {
    const { hotelId } = req.params;

    try {
        const reviews = await Review.find({ hotelId });
        res.status(200).json({ reviews });
    } catch (error) {
        res.status(500).json({ message: "Error fetching reviews", error });
    }
};

module.exports = {
    addReview,
    getReviews,
};
