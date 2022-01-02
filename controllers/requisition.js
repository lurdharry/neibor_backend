const RequisitionService = require("../services/requisitionService");

// const { id } = req.payload;
exports.createRequisition = async (req, res) => {
    const { id } = req.payload;
    const { amount, merchantId } = req.body;
 
    let reqService = new RequisitionService()
    try {
        let requisition = await reqService.createRequisition({merchant:merchantId, user:id, amount})
        res.status(200).json({success:true, requisition})
    }
    catch(error){
        res.status(200).json({success:false, error})
    }
}
// post route
exports.initializeCurrencyRequisition = async (req, res) => {
    const { id } = req.payload;
    const { currency, latitude, longitude, amount } = req.body;
 
    let reqService = new RequisitionService()
    try {
        let requisition = await reqService.initializeCurrencyRequisition(currency, latitude, longitude, amount)
        res.status(200).json({success:true, requisition})
    }
    catch(error){
        res.status(200).json({success:false, error})
    }
}