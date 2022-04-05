const router = require("express").Router();
let auth = require("../middlewares/auth");
let requisitionController = require("../controllers/requisition");
const { catchErrors } = require("../handlers/errorHandler");

router.post(
  "/create_requisition",
  auth,
  catchErrors(requisitionController.createRequisition)
);

router.post(
  "/merchant_accept_reject_requisition",
  auth,
  catchErrors(requisitionController.acceptRequisition)
);

router.post(
  "/user_complete_requisition_with_merchant",
  auth,
  catchErrors(requisitionController.userCompletesRequisitionWithMerchant)
);

router.post(
  "/rate_merchant",
  auth,
  catchErrors(requisitionController.rateMerchant)
);

router.post(
  "/comment_merchant",
  auth,
  catchErrors(requisitionController.commentMerchant)
);
//rate_merchant
//https://documenter.getpostman.com/view/9680596/UVyuTFG8

module.exports = router;
