const mongoose = require("mongoose");

const requisitionSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: "Amount is required!",
    },
    currencyFrom: {
      type: String,
      required: "currencyFrom is required",
    },
    currencyTo: {
      type: String,
      required: "currencyTo is required",
    },
    merchantAccept: {
      type: Boolean,
      default: false,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    merchantId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    merchant: { type: String, required: true },
    user: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Requisition", requisitionSchema);
