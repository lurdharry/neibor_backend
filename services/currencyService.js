const User = require("../models/User");
const UserCurrency = require("../models/UserCurrency");
const Rating = require("../models/Rating");
const Requisition = require("../models/Requisition");
const Comment = require("../models/Comment");
const fieldIsEmpty = require("../utils/fieldIsEmpty");
const allCurrencies = require("../utils/allCurrencies");
const fullCurrencyName = require("../utils/fullCurrencyName");

var geodist = require("geodist");

function CurrencyService() {}

CurrencyService.prototype.filterMerchantsByUserRatings = async function (
  user
) {};

CurrencyService.prototype.pairWithMerchantAndNotifyMerchant = async function ({
  user,
  merchant,
}) {
  //here we create a requisition
};

CurrencyService.prototype.finishTransactionAndSaveCommentAndRating =
  async function (user) {};

CurrencyService.prototype.viewCurrencyHistory = async function ({
  user,
  currency,
}) {
  fieldIsEmpty({ field: currency, name: "currency" });
};

CurrencyService.prototype.getAllCurrencies = async function (user) {
  return fullCurrencyName;
};

CurrencyService.prototype.getUserCurrency = async function (user) {
  let userCurrencies = await UserCurrency.find({ user: user });
  return userCurrencies;
};

CurrencyService.prototype.getMerchantCurrencyByDistance = async function ({
  user,
  currencyFrom,
  currencyTo,
  latitude,
  longitude,
  limit,
  skip,
}) {
  fieldIsEmpty({ field: currencyFrom, name: "currency from" });
  fieldIsEmpty({ field: currencyTo, name: "currency to" });
  fieldIsEmpty({ field: latitude, name: "latitude" });
  fieldIsEmpty({ field: longitude, name: "longitude" });
  let userCurrencies = await UserCurrency.find({
    currencyFrom,
    currencyTo,
  })
    .populate({
      path: "user",
      model: "User",
      select: "-password -vendorPackages -currencyPairs",
    })
    .skip(skip || 0) // Always apply 'skip' before 'limit'
    .limit(limit || 5);

  let selectedCurrencies = [];

  for (var i = 0; i < userCurrencies.length; i++) {
    var currentUser = { lat: latitude, lon: longitude };
    if (!!userCurrencies[i].user.latitude) {
      var currencies = {
        lat: userCurrencies[i].user.latitude,
        lon: userCurrencies[i].user.longitude,
      };

      let distance = geodist(currentUser, currencies, {
        exact: true,
        unit: "km",
      });

      let newFormat = userCurrencies[i];
      let newObj = {
        currency: newFormat,
        distance: distance,
      };

      selectedCurrencies.push(newObj);
    }
  }

  let sortedDist = selectedCurrencies.sort(
    (a, b) => parseFloat(a.distance) - parseFloat(b.distance)
  );
  return sortedDist;
};

CurrencyService.prototype.removeUserCurrency = async function ({
  user,
  currencyPairId,
}) {
  let existingCurrency = await UserCurrency.findOne({
    userId: user,
    _id: currencyPairId,
  });
  if (existingCurrency) {
    let deleted = await UserCurrency.findByIdAndDelete(existingCurrency._id);
    let allCurrencies = await UserCurrency.find({ user: user });
    return allCurrencies;
  } else {
    throw "currency pair does not exist in your list of currency";
  }
};

/* A service to create a User currency pair*/
CurrencyService.prototype.getUserCurrency = async function (user) {
  let userCurrencies = await UserCurrency.find({ user: user });
  return userCurrencies;
};

/*
}).populate({
    path: 'owner',
    model: 'User',
    select: '-password',
    populate: { path: 'profile', model: 'Profile' },
  });
*/

CurrencyService.prototype.getAllMerchantsWithCurrency = async function (user) {
  let userCurrencies = await UserCurrency.find().populate({
    path: "user",
    model: "User",
    select: "-password -vendorPackages -currencyPairs",
  });
  console.log(userCurrencies, "the user currencies");
  return userCurrencies;
};

CurrencyService.prototype.createUserCurrency = async function (
  user,
  currencyData
) {
  const { currencyFrom, rateTo, currencyTo, rateFrom } = currencyData;
  fieldIsEmpty({ field: currencyFrom, name: "currency from" });
  fieldIsEmpty({ field: currencyTo, name: "currency to" });
  fieldIsEmpty({ field: rateFrom, name: "rate from" });
  fieldIsEmpty({ field: rateTo, name: "rate to" });
  //lets check if the currencyFrom and currencyTo Exists in our system
  if (!allCurrencies.includes(currencyFrom)) {
    throw "currencyFrom not valid";
  }

  if (!allCurrencies.includes(currencyTo)) {
    throw "currencyTo not valid";
  }

  let existingCurrency = await UserCurrency.findOne({
    user,
    currencyFrom: currencyFrom,
    currencyTo: currencyTo,
  });
  if (existingCurrency) {
    let options = {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
      omitUndefined: true,
    };
    update = { ...currencyData, user, userId: user };
    let savedUserCurrency = await UserCurrency.findOneAndUpdate(
      { _id: existingCurrency._id },
      update,
      options
    );

    let allCurrencies = await UserCurrency.find({ user: user }).select(
      "-userId -createdAt -updatedAt"
    );
    //return an array of all currencies
    return allCurrencies;
  } else {
    const userCurrency = new UserCurrency({
      currencyFrom,
      rateTo,
      currencyTo,
      rateFrom,
      user,
      userId: user,
    });

    let savedUserCurrency = await userCurrency.save();

    let allCurrencies = await UserCurrency.find({ user: user }).select(
      "-userId -createdAt -updatedAt"
    );
    //return an array of all currencies
    return allCurrencies;
  }
};

module.exports = CurrencyService;
