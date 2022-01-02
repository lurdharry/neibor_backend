const CurrencyService = require("../services/currencyService");

exports.create_currency_pair = async (req, res) => {
 
    let currencyService = new CurrencyService()
    let currencyData = req.body
    const { id } = req.payload;
    try {
        let userCurrency = await currencyService.createUserCurrency(id, currencyData)
        res.status(200).json({success:true, userCurrency, message:"Currency Update successful"})
    }
    catch(error){
        console.log(error,"yyy")
        res.status(400).json({success:false, error})
    }
}

exports.remove_currency_pair = async (req, res) => {
 
    let currencyService = new CurrencyService()
    let currencyData = req.body
    const { id } = req.payload;
    try {
        let userCurrency = await currencyService.removeUserCurrency(id, currencyData)
        res.status(200).json({success:true, userCurrency, message:"Currency Update successful"})
    }
    catch(error){
        console.log(error,"yyy")
        res.status(400).json({success:false, error})
    }
}
//removeUserCurrency

exports.get_user_currency_pairs = async (req, res) => {
    console.log("the controller")
    let currencyService = new CurrencyService();
    const { id } = req.payload;
    console.log("the controller",id)
    try {
        let userCurrencies = await currencyService.getUserCurrency(id)
        res.status(200).json({success:true, userCurrencies})
    }
    catch(error){
        console.log(error)
        res.statusText = error
        res.status(401).json({success:false, error})
    }
}