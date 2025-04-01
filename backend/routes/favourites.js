const router = require("express").Router();
const User = require("../models/user");
const { authenticateToken } = require("./userAuth");

// Add hotel to favourites
router.put("/add-hotel-to-favourites", authenticateToken, async (req, res) => {
    try {
        const { hotelid, id } = req.headers;
        const userData = await User.findById(id);

        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        const isHotelFavourite = userData.favourites.includes(hotelid);

        if (isHotelFavourite) {
            return res.status(200).json({ message: "Hotel is already in favourites" });
        }

        await User.findByIdAndUpdate(id, { $push: { favourites: hotelid } });
        return res.status(200).json({ message: "Hotel added to favourites" });
    } catch (error) {
        console.error("Error adding hotel to favourites:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// Remove hotel from favourites
router.put("/remove-hotel-from-favourites", authenticateToken, async (req, res) => {
    try {
        const { hotelid, id } = req.headers;
        const userData = await User.findById(id);

        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        const isHotelFavourite = userData.favourites.includes(hotelid);

        if (isHotelFavourite) {
            await User.findByIdAndUpdate(id, { $pull: { favourites: hotelid } });
            return res.status(200).json({ message: "Hotel removed from favourites" });
        } else {
            return res.status(400).json({ message: "Hotel not found in favourites" });
        }
    } catch (error) {
        console.error("Error removing hotel from favourites:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// Get favourite hotels of a particular user
router.get('/get-favourite-hotels', authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const userData = await User.findById(id).populate('favourites');
        const favouriteHotels = userData.favourites;
        return res.json({ status: 'Success', data: favouriteHotels });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'An error occurred' });
    }
});

module.exports = router;
