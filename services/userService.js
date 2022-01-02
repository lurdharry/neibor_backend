const User = require("../models/User");
const MerchantProfile = require("../models/MerchantProfile");
const sha256 = require("js-sha256");
const jwt = require("jwt-then");

function UserService() {}

//vendorRegistration
UserService.prototype.vendorRegistration = async function (userData) {
  console.log(userData, "the user data");
  let {
    email,
    phoneNumber,
    firstName,
    lastName,
    password,
    vendorPackages,
    currencyPairs,
    longitude,
    latitude,
    location,
    platform,
  } = userData;
  if (!email) throw "email is required";
  if (!phoneNumber) throw "phoneNumber is required";
  if (!firstName) throw "firstName is required";
  if (!lastName) throw "lastName is required";
  if (!password) throw "password is required";
  if (!vendorPackages) throw "vendorPackages is required";
  if (!location) throw "location is required";
  if (!longitude) throw "longitude is required";
  if (!latitude) throw "latitude is required";
  if (!platform) throw "platform is required";

  const user = await User.findOne({
    email: email.toLowerCase(),
  });
  if (user) throw "User with same email already exists";
  const userPhoneExists = await User.findOne({
    phoneNumber,
  });
  if (userPhoneExists) throw "User with same Phone Number already exists";
  var randomValue = Math.floor(1000 + Math.random() * 9000);
  let referralId = `${firstName}${randomValue}`;
  const newUser = new User({
    firstName,
    lastName,
    email: email.toLowerCase(),
    phoneNumber,
    vendorPackages,
    currencyPairs,
    password: sha256(password + process.env.SALT),
    referralId,
    type: "vendor",
    longitude,
    latitude,
    platform,
    location,
  });

  let savedUser = await newUser.save();
  return savedUser;
};

UserService.prototype.viewAllVendors = async function () {
  let users = await User.find({ type: "vendor" }).select("-password");
  return users;
};

UserService.prototype.registerUser = async function (userData) {
  const { name, password, phone, email } = userData;
  console.log(userData, "from user");
  const required = ["name", "email", "password", "phone"];

  const emailRegex = /@gmail.com|@yahoo.com|@hotmail.com|@live.com/;

  if (name.length <= 8) throw "Name must be atleast 8 characters long";

  if (!emailRegex.test(email)) throw "Email is not supported from your domain.";

  if (password.length < 6) throw "Password must be atleast 6 characters long";

  if (phone.length < 11) throw "Phone number must be atleast 11 numbers long";

  const userEmailExists = await User.findOne({
    email: email.toLowerCase(),
  });
  if (userEmailExists) throw "User with same email already exists";

  const userPhoneExists = await User.findOne({
    phone,
  });
  if (userPhoneExists) throw "User with same Phone Number already exists";
  var randomValue = Math.floor(1000 + Math.random() * 9000);
  let referralId = `${name}${randomValue}`;
  const user = new User({
    name,
    email: email.toLowerCase(),
    phone,
    password: sha256(password + process.env.SALT),
    referralId,
  });

  let savedUser = await user.save();
  const token = await jwt.sign({ id: savedUser._id }, process.env.SECRET);
  let userObj = new Object();
  userObj.token = token;
  userObj.name = savedUser.name;
  userObj.phone = savedUser.phone;
  userObj.referralId = savedUser.referralId;
  return userObj;
};

UserService.prototype.loginUser = async function (userData) {
  const { email, password } = userData;
  console.log(email, password, "yyy");
  const user = await User.findOne({
    email: email.toLowerCase(),
    password: sha256(password + process.env.SALT),
  });
  if (!user) throw "Email Address and Password did not match.";
  let { name, _id, referralId } = user;

  const token = await jwt.sign({ id: _id }, process.env.SECRET);
  let userObj = new Object();
  userObj.token = token;
  userObj.name = name;
  userObj.referralId = referralId;
  return userObj;
};

//

UserService.prototype.updateDeviseToken = async function (user_id, details) {
  let options = {
    upsert: true,
    new: true,
    setDefaultsOnInsert: true,
    omitUndefined: true,
  };
  update = { deviseToken: details.devise_token };
  console.log(details, "YYYYYYYYYY");
  let savedUser = await User.findOneAndUpdate(
    { _id: user_id },
    update,
    options
  );
  let userObj = new Object();
  userObj.name = savedUser.name;
  userObj.howMuchBudget = savedUser.howMuchBudget;
  userObj.location = savedUser.location;
  userObj.referralId = savedUser.referralId;
  userObj.deviseToken = savedUser.deviseToken;
  return userObj;
};

UserService.prototype.updateMerchantProfile = async function (
  user_id,
  details
) {
  let options = {
    upsert: true,
    new: true,
    setDefaultsOnInsert: true,
    omitUndefined: true,
  };
  update = { ...details, user: user_id };
  let savedUser = await MerchantProfile.findOneAndUpdate(
    { user: user_id },
    update,
    options
  );
  let userObj = new Object();
  userObj.name = savedUser.name;
  userObj.howMuchBudget = savedUser.howMuchBudget;
  userObj.location = savedUser.location;
  userObj.referralId = savedUser.referralId;
  return userObj;
};

UserService.prototype.updateUser = async function (_id, userData) {
  console.log(_id, userData, "service");
  let options = {
    upsert: true,
    new: true,
    setDefaultsOnInsert: true,
    omitUndefined: true,
  };
  update = { ...userData };
  let savedUser = await User.findOneAndUpdate({ _id: _id }, update, options);
  let userObj = new Object();
  userObj.name = savedUser.name;
  userObj.howMuchBudget = savedUser.howMuchBudget;
  userObj.location = savedUser.location;
  userObj.referralId = savedUser.referralId;
  return userObj;
};

UserService.prototype.getMerchants = async function (skip, limit) {
  let users = await User.find({ isMerchant: true })
    .skip(skip) // Always apply 'skip' before 'limit'
    .limit(limit);
  return users;
};

UserService.prototype.getUsers = async function (skip, limit) {
  let users = await User.find({ isMerchant: false })
    .skip(skip) // Always apply 'skip' before 'limit'
    .limit(limit);
  return users;
};

UserService.prototype.banUser = async function ({ userId }) {};

module.exports = UserService;
