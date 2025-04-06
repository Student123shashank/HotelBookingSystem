const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, ref: "user", required: true },
    hotel: { type: mongoose.Types.ObjectId, ref: "hotels", required: true },
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    guests: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    status: {
        type: String,
        default: "Pending",
        enum: ["Pending", "Confirmed", "Checked In", "Completed", "Canceled"]
    },
}, { timestamps: true });

module.exports = mongoose.model("bookings", bookingSchema);
