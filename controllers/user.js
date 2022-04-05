const UserService = require("../services/userService");

exports.register = async (req, res) => {
  let userService = new UserService();
  let userData = req.body;

  try {
    let user = await userService.registerUser(userData);
    console.log(user, "UUU");
    res.redirect('/')
  } catch (error) {
    console.log(error, "yyy");
    res.send('error registering a user')
  }
};
//vendor_registration
exports.vendor_registration = async (req, res) => {
  let userService = new UserService();
  let userData = req.body;
  try {
    let vendorRegistration = await userService.vendorRegistration(userData);
    res.status(200).json({
      success: true,
      vendorRegistration,
      message: "Vendor successfully registered",
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, error });
  }
};

exports.view_all_vendors = async (req, res) => {
  //viewAllVendors
  let userService = new UserService();
  try {
    let vendors = await userService.viewAllVendors();
    res.status(200).json({
      success: true,
      vendors,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, error });
  }
};

exports.login = async (req, res) => {
  let userService = new UserService();
  let userData = req.body;
  try {
    let loginUser = await userService.loginUser(userData);
    let { token, name, referralId } = loginUser;
    res.status(200).json({
      success: true,
      token,
      name,
      referralId,
      message: "Login successful",
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, error });
  }
};

exports.updateUserDetail = async (req, res) => {
  let userService = new UserService();
  const { id } = req.payload;
  console.log(req.body, id, "controller");
  let userData = req.body; //_id, //howMuchBudget, //location

  try {
    let userDetails = await userService.updateMerchantProfile(id, userData);
    res
      .status(200)
      .json({ success: true, user: userDetails, message: "Update successful" });
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, error });
  }
};

exports.updateDeviseToken = async (req, res) => {
  let userService = new UserService();
  const { id } = req.payload;
  let userData = req.body; //_id, //howMuchBudget, //location

  try {
    let userDetails = await userService.updateDeviseToken(id, userData);
    res
      .status(200)
      .json({ success: true, user: userDetails, message: "Update successful" });
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, error });
  }
};

exports.allMerchant = async (req, res) => {
  const limit = parseInt(req.query.limit); // Make sure to parse the limit to number
  const skip = parseInt(req.query.skip); // Make sure to parse the skip to number
  let userService = new UserService();
  try {
    let merchants = await userService.getMerchants(skip, limit);
    res.status(200).json({ success: true, merchants });
  } catch (error) {
    console.log(error);
    res.statusText = error;
    res.status(401).json({ success: false, error });
  }
};

exports.allUsers = async (req, res) => {
  const limit = parseInt(req.query.limit); // Make sure to parse the limit to number
  const skip = parseInt(req.query.skip); // Make sure to parse the skip to number
  let userService = new UserService();
  try {
    let merchants = await userService.getUsers(skip, limit);
    res.status(200).json({ success: true, merchants });
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, error });
  }
};

