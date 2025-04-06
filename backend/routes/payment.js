const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();
const Booking = require('../models/booking');

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

// Create Razorpay order
router.post('/create-order', async (req, res) => {
  try {
    const { amount } = req.body;
    const options = {
      amount: amount * 100,
      currency: 'INR',
      receipt: uuidv4(),
    };
    const order = await razorpayInstance.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating order' });
  }
});

// Capture Razorpay payment
router.post('/capture-payment', async (req, res) => {
  try {
    const { paymentId, bookingId, amount } = req.body;
    await razorpayInstance.payments.capture(paymentId, amount * 100, 'INR');
    await Booking.findByIdAndUpdate(bookingId, { paymentStatus: 'paid' });
    res.json({ message: 'Payment captured successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error capturing payment' });
  }
});

// Create booking for Cash on Delivery (COD)
router.post('/create-booking-for-cod', async (req, res) => {
  try {
    const { user, hotel, checkInDate, checkOutDate, guests, totalAmount } = req.body;
    const booking = new Booking({
      user,
      hotel,
      checkInDate,
      checkOutDate,
      guests,
      totalAmount,
      paymentMethod: 'cod',
      paymentStatus: 'pending',
    });
    await booking.save();
    res.json({ message: 'Booking created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating booking' });
  }
});

module.exports = router;
