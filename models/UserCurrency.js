const mongoose = require("mongoose");
// user currency pair instance, he sets it to his taste
const userCurrency = new mongoose.Schema({
    currencyPair: {
       type:String,
       enum: ["NGN to USD", "USD to NGN", "EUR to NGN", 
       "NGN to EUR", "GBP to NGN", "NGN to GBP", 
       "CAD to NGN", "NGN to CAD", "NGN to AED", 
       "NGN to SEK", "SEK to NGN", "CNY to NGN",
       "NGN to CNY", "AUD to NGN", "NGN to AUD",
       "CZK to NGN", "NGN to CZK", "DKK to NGN",
       "NGN to DKK", "BTC to NGN", "NGN to BTC"
        ]
    },
    rateFrom: {
        type: Number,
        default:1
    },
    rateTo: {
        type: Number,
        required: 'to is required!'
    },
    latitude: String,
    longitude: String,
    user: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],

}, {
    timestamps: true
}

)

module.exports = mongoose.model('UserCurrency', userCurrency);
