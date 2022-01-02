const mongoose = require("mongoose");

const requisitionSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: "Amount is required!",
    },
    clientCompleted: {
      type: Boolean,
      default: false,
    },
    merchantCompleted: {
      type: Boolean,
      default: false,
    },
    location: {
      type: Object,
      default: { latitude: "", longitude: "" },
    },
    merchant: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
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
