const jwt = require('jwt-then');

module.exports = async (req, res, next) => {
    try {
        if(!req.headers.authorization) throw "Forbidden!!";

        //we get the token from the user
        const token = req.headers.authorization.split(' ')[1]

        const payload = await jwt.verify(token, process.env.SECRET);
        req.payload = payload
        //the payload should contain the id of the logged in user
        next();//whenever the next is called we get to the controller
    }
    catch(err) {
        res.status(401).json({
            message: "forbidden"
        })
    }
   
}