const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema(
  {
    overallRating: {
      type: Number,
      required: "overall rating is required!",
    },
    fastness: {
      type: Number,
    },
    accommodation: {
      type: Number,
    },
    trust: {
      type: Number,
    },
    requisition: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Requisition",
    },
    user: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Rating", ratingSchema);
