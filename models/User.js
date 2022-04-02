const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: "firstName is required!",
    },
    lastName: {
      type: String,
      required: "lastName is required!",
    },
    platform: {
      type: String,
      required: "platform is required",
    },
    deviseToken: {
      type: String,
    },
    email: {
      type: String,
      required: "Email is required!",
    },
    password: {
      type: String,
      required: "Password is required!",
    },
    phoneNumber: {
      type: String,
      required: "Phone number is required",
    },
    referralId: {
      type: String,
    },
    location: {
      type: String,
    },
    latitude: {
      type: String,
    },
    longitude: {
      type: String,
    },
    isAgent: Boolean,
    isUser: Boolean,
    vendorPackages: {
      type: Array,
    },
    currencyPairs: Array,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);

/*
 firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: '',
    location: '',
    latitude: '',
    longitude: '',
    platForm: 'web',
    vendorPackage: [],
*/
