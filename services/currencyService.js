const User = require("../models/User");
const UserCurrency = require("../models/UserCurrency");
const Rating = require("../models/Rating");
const Requisition = require("../models/Requisition");
const Comment = require("../models/Comment");
const fieldIsEmpty = require("../utils/fieldIsEmpty");
const allCurrencies = require("../utils/allCurrencies");

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
    user: user,
    currencyFrom: currencyFrom,
    currencyTo: currencyTo,
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
    update = { ...currencyData, user, userId: user };
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
      currencyFrom,
      rateTo,
      currencyTo,
      rateFrom,
      user,
      userId: user,
    });

    let savedUserCurrency = await userCurrency.save();

    let allCurrencies = await UserCurrency.find({ user: user });
    //return an array of all currencies
    return allCurrencies;
  }
};

CurrencyService.prototype.createUserCurrency = async function (
  user,
  currencyData
) {};
module.exports = CurrencyService;
