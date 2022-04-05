const mongoose = require("mongoose");
// when a neighbour asks for a money, he makes a requisition
// same thing as deals
const RatingSchema = new mongoose.Schema(
  {
    rating: {
      type: String,
      required: "rating is required!",
    },
    requisitionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Requisition",
    },
    userId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    merchantId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    user: String,
    requisition: String,
    merchant: String,
    fromUserToMerchant: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Rating", RatingSchema);
