const CurrencyService = require("../services/currencyService");

exports.create_currency_pair = async (req, res) => {
  let currencyService = new CurrencyService();
  let currencyData = req.body;
  const { id } = req.payload;
  try {
    let userCurrency = await currencyService.createUserCurrency(
      id,
      currencyData
    );
    res.status(200).json({
      success: true,
      userCurrency,
      message: "Currency Update successful",
    });
  } catch (error) {
    console.log(error, "yyy");
    res.status(400).json({ success: false, error });
  }
};

exports.remove_currency_pair = async (req, res) => {
  let currencyService = new CurrencyService();
  let currencyPairId = req.params.id;
  const { id } = req.payload;
  try {
    let userCurrency = await currencyService.removeUserCurrency({
      user: id,
      currencyPairId,
    });
    res.status(200).json({
      success: true,
      userCurrency,
      message: "Currency remove successful",
    });
  } catch (error) {
    console.log(error, "yyy");
    res.status(400).json({ success: false, error });
  }
};
//removeUserCurrency

exports.get_user_currency_pairs = async (req, res) => {
  console.log("the controller");
  let currencyService = new CurrencyService();
  const { id } = req.payload;
  console.log("the controller", id);
  try {
    let userCurrencies = await currencyService.getUserCurrency(id);
    res.status(200).json({ success: true, userCurrencies });
  } catch (error) {
    console.log(error);
    res.statusText = error;
    res.status(401).json({ success: false, error });
  }
};

exports.get_all_currencies = async (req, res) => {
  console.log("the controller");
  let currencyService = new CurrencyService();
  const { id } = req.payload;
  try {
    let userCurrencies = await currencyService.getAllCurrencies(id);
    res.status(200).json({ success: true, userCurrencies });
  } catch (error) {
    res.statusText = error;
    res.status(401).json({ success: false, error });
  }
};

exports.filter_currency_by_merchant_price = async (req, res) => {
  let { currencyFrom, currencyTo, maxPrice, minPrice } = req.body;
};

//getAllMerchantsWithCurrency

exports.get_all_merchants_with_currency = async (req, res) => {
  let currencyService = new CurrencyService();
  const { id } = req.payload;
  try {
    let merchant = await currencyService.getAllMerchantsWithCurrency(id);
    res.status(200).json({ success: true, merchant });
  } catch (error) {
    res.statusText = error;
    res.status(401).json({ success: false, error });
  }
};

exports.filter_currency_by_merchant_distance = async (req, res) => {
  let { currencyFrom, currencyTo, latitude, longitude, limit, skip } = req.body;
  let currencyService = new CurrencyService();
  const { id } = req.payload;
  try {
    let data = await currencyService.getMerchantCurrencyByDistance({
      user: id,
      currencyFrom,
      currencyTo,
      latitude,
      longitude,
      limit,
      skip,
    });
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.log(error, "the data");
    res.statusText = error;
    res.status(401).json({ success: false, error });
  }
};
