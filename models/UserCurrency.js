const mongoose = require("mongoose");
// user currency pair instance, he sets it to his taste
const userCurrency = new mongoose.Schema(
  {
    currencyFrom: Object, //must not be the same thing
    currencyTo: Object,
    userId: String,
    rateFrom: {
      type: Number,
      default: 1,
    },
    rateTo: {
      type: Number,
      required: "to is required!",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("UserCurrency", userCurrency);
