const mongoose = require("mongoose");

const WatchlistItemSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  movieId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["planned", "watching", "completed"],
    default: "planned",
  },
  imageUrl: {
    type: String,
    default: "",
  },
  notes: {
    type: String,
    default: "",
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: null,
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("WatchlistItem", WatchlistItemSchema);
