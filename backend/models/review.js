const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  hotelId: {
    type: Schema.Types.ObjectId,
    ref: 'hotels',
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  review: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('reviews', ReviewSchema);
