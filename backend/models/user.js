const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    avatar: { type: String, default: "https://cdn-icons-png.flaticon.com/128/3177/3177440.png" },
    role: { type: String, default: "user", enum: ["user", "admin"] },
    favourites: [{ type: mongoose.Schema.Types.ObjectId, ref: "hotels" }], 
    savedHotels: [{ type: mongoose.Types.ObjectId, ref: "hotels" }],
    bookings: [{ type: mongoose.Types.ObjectId, ref: "bookings" }]
}, { timestamps: true });

module.exports = mongoose.model("user", userSchema);
