let homeController = require("../controllers/home");
const router = require("express").Router();

router.get("/", homeController.home);

module.exports = router