const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
require("./conn/conn");

app.use(express.json());
app.use(cors());
const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));





const User = require("./routes/userRoutes");
const Hotel = require("./routes/hotel");
const Booking = require("./routes/BookingTransaction");
const Favourite = require("./routes/favourites");
const Payment = require("./routes/payment");
const Transaction = require("./routes/booking");
const Review = require("./routes/hotelReviewRoutes");
const Chat = require("./routes/chat");


app.use("/api/v1", User);
app.use("/api/v1", Hotel);
app.use("/api/v1", Booking);
app.use("/api/v1", Favourite);
app.use("/api/v1", Payment);
app.use("/api/v1", Transaction);
app.use("/api/v1", Review);
app.use("/api/v1", Chat);

app.listen(process.env.PORT, () => {
  console.log(`Server started at port ${process.env.PORT}`);
});
