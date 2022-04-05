const mongoose = require("mongoose");
// when a neighbour asks for a money, he makes a requisition
// same thing as deals
const CommentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: "comment is required!",
    },
    requisition: {
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
    merchant: String,
    fromUserToMerchant: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Comment", CommentSchema);
