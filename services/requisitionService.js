const User = require("../models/User");
const UserCurrency = require("../models/UserCurrency");
const Requisition = require("../models/Requisition");
var geodist = require('geodist')
var getSymbolFromCurrency = require('currency-symbol-map').getSymbolFromCurrency;

function RequisitionService() {
    
}
/*
Setraco Lifecamp: 9.0728, 7.4048 
Gwarinpa Estate: 9.1099, 7.4042
Utako: 9.0679, 7.4464
Efab Metropolice: 9.1231, 7.3773
Jabi Lake Mall: 9.0764, 7.4254
AEDC KAtampe: 9.1241, 7.4319
Lokogoma: 8.9786, 7.4582
Durunmi: 9.0223, 7.4671
Mabuchi: 9.0831, 7.4482
Jahi Badmiton Club: 9.0864, 7.4448
Apo: 9.0081, 7.4751

*/ 

//initializeCurrencyRequisition
RequisitionService.prototype.initializeCurrencyRequisition = async function(currency, latitude, longitude, amount){
   //here we only do filteration of merchants that have that
    let userCurrency = await UserCurrency.find({currencyPair:currency}).populate('user', '-password')
    console.log(userCurrency)
    let userCurr = []
    
    for(var i=0; i<userCurrency.length; i++){
        let merchantLatitude = userCurrency[i].user[0].location.latitude
        let merchantLongitude = userCurrency[i].user[0].location.longitude

        let merchantConvertionRate = amount * userCurrency[i].rateTo 
               
        
        let userLatitude = latitude
        let userLongitude = longitude
        
        var merchant = {lat: merchantLatitude, lon: merchantLongitude}    
        var user = {lat: userLatitude, lon: userLongitude}

        let distance = geodist(merchant, user, {exact: true, unit: 'km'})
        userCurr.push({userDetails:userCurrency, distance:distance, merchantConvertionRate})
       
    }
    console.log(userCurr,"YYY")
    return userCurr
}


RequisitionService.prototype.checkRequisition = async function(requisitionId){
    const singleRequisition = await Requisition.findOne({_id:requisitionId})
    return Boolean(singleRequisition)
}

RequisitionService.prototype.clientComplete = async function(_id){
    let update = {clientComplete:true}
    let options = {
        new: true,
        omitUndefined: true
    }
    let updated = await Requisition.findByIdAndUpdate(_id, update, options)
    return updated
}

RequisitionService.prototype.checkComplete = async function(_id){
    let requisitionComplete = await Requisition.findOne({_id:_id, clientComplete:true, merchantComplete:true})
    return Boolean(requisitionComplete)
}


RequisitionService.prototype.merchantComplete = async function(_id){
    let update = {merchantComplete:true}
    let options = {
        new: true,
        omitUndefined: true
    }
    let updated = await Requisition.findByIdAndUpdate(_id, update, options)
    return updated
}

RequisitionService.prototype.createRequisition = async function({merchant, user, amount}){
    console.log(user,"ser", amount, merchant)
    const requisition = new Requisition({ 
        merchant, user, amount
    });

    let savedRequisition = await requisition.save();
    return savedRequisition
}

RequisitionService.prototype.RequisitionUsers = async function(requisitionId){
    const singleRequisition = await Requisition.findOne({_id:requisitionId})
    if(singleRequisition==null){
        return []
    }
    else {
        let {merchant, user} = singleRequisition
        return {merchant:merchant[0], user:user[0]}
    }
}


RequisitionService.prototype.completeRequisition = async function({merchant, user}){

}

RequisitionService.prototype.cancelRequisition = async function({merchant, user}){

}

module.exports = RequisitionService;