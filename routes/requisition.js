const router = require("express").Router();
let auth = require("../middlewares/auth")
let requisitionController = require("../controllers/requisition")
const {catchErrors} = require("../handlers/errorHandler");

router.post("/create_requisition", auth, catchErrors(requisitionController.createRequisition))

//initializeCurrencyRequisition
router.post("/initialize_currency_requisition", auth, requisitionController.initializeCurrencyRequisition)


module.exports = router;
