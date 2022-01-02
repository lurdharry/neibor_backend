const User = require("../models/User");
const UserCurrency = require("../models/UserCurrency");
const Rating = require("../models/Rating");
const Requisition = require("../models/Requisition");
const Comment = require("../models/Comment");

function CurrencyService() {}

/* A service to get user currency*/
CurrencyService.prototype.getUserCurrency = async function (user) {
  console.log(user, "the service");
  let userCurrencies = await UserCurrency.find({ user: user });
  return userCurrencies;
};

/*
A service to delete currency pair
*/
CurrencyService.prototype.removeUserCurrency = async function (
  user,
  currencyData
) {
  const { currencyPair, rateTo } = currencyData;

  let existingCurrency = await UserCurrency.findOne({
    user: user,
    currencyPair: currencyPair,
  });
  if (existingCurrency) {
    //if it exists we remove it
    let deleted = await UserCurrency.findByIdAndDelete(existingCurrency._id);

    let allCurrencies = await UserCurrency.find({ user: user });
    //return an array of all currencies
    return allCurrencies;
  }
};

/* A service to create a User currency pair*/

CurrencyService.prototype.createUserCurrency = async function (
  user,
  currencyData
) {
  const { currencyPair, rateTo } = currencyData;

  let existingCurrency = await UserCurrency.findOne({
    user: user,
    currencyPair: currencyPair,
  });
  if (existingCurrency) {
    console.log("EXist");
    //its existing already, so we do the update
    let options = {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
      omitUndefined: true,
    };
    update = { ...currencyData, user };
    let savedUserCurrency = await UserCurrency.findOneAndUpdate(
      { _id: existingCurrency._id },
      update,
      options
    );

    let allCurrencies = await UserCurrency.find({ user: user });
    //return an array of all currencies
    return allCurrencies;
  } else {
    console.log("New");
    //its not available, so we create a new one for the user
    const userCurrency = new UserCurrency({
      currencyPair,
      rateTo,
      user,
    });

    let savedUserCurrency = await userCurrency.save();

    let allCurrencies = await UserCurrency.find({ user: user });
    //return an array of all currencies
    return allCurrencies;
  }
};

module.exports = CurrencyService;
