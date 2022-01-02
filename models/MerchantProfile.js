const mongoose = require("mongoose");

const merchantSchema = new mongoose.Schema({
    howMuchBudget: {
        type: Number,
        default:0
    },
    location: {
        type: Object,
        default: {latitude:"", longitude:""}
    },
    businessName: {
        type: String,
    },
    referralId: {
        type: String,
    },
    user: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    }],

}, {
    timestamps: true
}

)

module.exports = mongoose.model('MerchantProfile', merchantSchema);
