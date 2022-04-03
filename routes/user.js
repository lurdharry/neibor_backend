const router = require("express").Router();
let auth = require("../middlewares/auth");
let content_type = require("../middlewares/content_type");
let userController = require("../controllers/user");
let currencyController = require("../controllers/currency");
const { catchErrors } = require("../handlers/errorHandler");

router.post("/register", content_type, userController.register);

router.post(
  "/vendor_registration",
  catchErrors(userController.vendor_registration)
);

router.get("/view_all_vendors", catchErrors(userController.view_all_vendors));

router.post("/login", content_type, userController.login);
router.post("/update_user", auth, catchErrors(userController.updateUserDetail));

router.post(
  "/create_currency_pair",
  auth,
  catchErrors(currencyController.create_currency_pair)
);

router.get(
  "/remove_currency_pair/:id",
  auth,
  catchErrors(currencyController.remove_currency_pair)
);

router.post("/update_devise_token", auth, userController.updateDeviseToken);

router.get(
  "/get_user_currency_pairs",
  auth,
  currencyController.get_user_currency_pairs
);

router.get("/merchants", auth, catchErrors(userController.allMerchant));
router.get("/users", auth, catchErrors(userController.allUsers));

router.get(
  "/get_all_currencies",
  auth,
  catchErrors(currencyController.get_all_currencies)
);

router.get(
  "/get_all_merchants_with_currency",
  auth,
  catchErrors(currencyController.get_all_merchants_with_currency)
);

router.post(
  "/filter_currency_by_merchant_price",
  auth,
  catchErrors(currencyController.filter_currency_by_merchant_price)
);
router.post(
  "/filter_currency_by_merchant_distance",
  auth,
  catchErrors(currencyController.filter_currency_by_merchant_distance)
);

module.exports = router;
