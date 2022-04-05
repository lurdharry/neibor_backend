const RequisitionService = require("../services/requisitionService");

// const { id } = req.payload;
exports.createRequisition = async (req, res) => {
  const { id } = req.payload;
  const { merchantId, currencyFrom, currencyTo, amount } = req.body;

  let reqService = new RequisitionService();
  try {
    let requisition = await reqService.createRequisition({
      merchantId,
      currencyFrom,
      currencyTo,
      amount,
      user: id,
    });
    res.status(200).json({ success: true, requisition });
  } catch (error) {
    res.status(200).json({ success: false, error });
  }
};

exports.acceptRequisition = async (req, res) => {
  const { id } = req.payload;
  const { requisitionId, accept } = req.body;

  let reqService = new RequisitionService();
  try {
    let requisition = await reqService.acceptRequisition({
      requisitionId,
      accept,
      user: id,
    });
    res.status(200).json({ success: true, requisition });
  } catch (error) {
    console.log(error, "the erro");
    res.status(200).json({ success: false, error });
  }
};

exports.userCompletesRequisitionWithMerchant = async (req, res) => {
  const { id } = req.payload;
  const { requisitionId, completed } = req.body;

  let reqService = new RequisitionService();
  try {
    let requisition = await reqService.userCompletesRequisitionWithMerchant({
      requisitionId,
      completed,
      user: id,
    });
    res.status(200).json({ success: true, requisition });
  } catch (error) {
    console.log(error, "the erro");
    res.status(200).json({ success: false, error });
  }
};

exports.rateMerchant = async (req, res) => {
  const { id } = req.payload;
  const { requisitionId, rating, merchantId, fromUserToMerchant } = req.body;

  let reqService = new RequisitionService();
  try {
    let ratings = await reqService.rateMerchant({
      requisitionId,
      rating,
      merchantId,
      fromUserToMerchant,
      userId: id,
    });
    res.status(200).json({ success: true, ratings });
  } catch (error) {
    console.log(error, "the erro");
    res.status(200).json({ success: false, error });
  }
};

exports.commentMerchant = async (req, res) => {
  const { id } = req.payload;
  const { requisitionId, comment, merchantId, fromUserToMerchant } = req.body;

  let reqService = new RequisitionService();
  try {
    let comments = await reqService.commentMerchant({
      requisitionId,
      comment,
      merchantId,
      fromUserToMerchant,
      userId: id,
    });
    res.status(200).json({ success: true, comments });
  } catch (error) {
    console.log(error, "the erro");
    res.status(200).json({ success: false, error });
  }
};

// commentMerchant
