//console.log(req.headers["content-type"],"rrr")

const jwt = require('jwt-then');

module.exports = async (req, res, next) => {
    try {
        if(req.headers["content-type"]!="application/json") throw "content-type should be application/json";
        next();//whenever the next is called we get to the controller
    }
    catch(err) {
        res.status(415).json({
            message: "content-type should be application/json"
        })
    }
   
}