const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    pricePerNight: { type: Number, required: true },
    facilities: [{ type: String, required: true }],
    images: [{ type: String }],
    roomsAvailable: { type: Number, required: true },
    category: { type: String, enum: ["Luxury", "Standard", "Budget"], required: true },
    owner: { type: String, ref: "user", required: true },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviews: [{ type: mongoose.Types.ObjectId, ref: "reviews" }]
}, { timestamps: true });

module.exports = mongoose.model("hotels", hotelSchema);

