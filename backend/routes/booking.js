const router = require("express").Router();
const { authenticateToken } = require("./userAuth");
const Booking = require("../models/booking");
const User = require("../models/user");
const Hotel = require("../models/hotel");

// Place booking
router.post("/place-booking", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const { hotelId, checkInDate, checkOutDate, guests, totalAmount } = req.body;

    const newBooking = new Booking({
      user: id,
      hotel: hotelId,
      checkInDate,
      checkOutDate,
      guests,
      totalAmount,
    });

    const bookingDataFromDB = await newBooking.save();

    // Saving booking in user model
    await User.findByIdAndUpdate(id, {
      $push: { bookings: bookingDataFromDB._id },
    });

    return res.json({
      status: "Success",
      message: "Booking Placed Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "Error",
      message: "An error occurred while placing the booking",
    });
  }
});

// Get booking history of a particular user
router.get("/get-booking-history", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await User.findById(id).populate({
      path: "bookings",
      populate: { path: "hotel" },
    });
    const bookingsData = userData.bookings.reverse();
    return res.json({
      status: "Success",
      data: bookingsData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "An error occurred",
    });
  }
});

// Get all bookings (Admin)
router.get("/get-all-bookings", authenticateToken, async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate({ path: "hotel" })
      .populate({ path: "user" })
      .sort({ createdAt: -1 });
    return res.json({
      status: "Success",
      data: bookings,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "An error occurred",
    });
  }
});

// Update booking status (Admin)
router.put("/update-status/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    await Booking.findByIdAndUpdate(id, { status: req.body.status });
    return res.json({
      status: "Success",
      message: "Status Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occurred" });
  }
});


// Get total number of bookings
router.get("/total-bookings",  async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments();
    return res.json({ status: "Success", count: totalBookings });
  } catch (error) {
    console.error("Error fetching total bookings:", error);
    return res.status(500).json({ status: "Error", message: "An error occurred while fetching total bookings" });
  }
});

module.exports = router;


