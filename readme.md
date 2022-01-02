# Authentication Tutorial

# Auth System

# Routes

Login
Registration

Forgot password

# Registration

email or username
password

client validation of details
from the client, what need is this

let {email, password} = req.body

# model

email: { type : String , unique : true, required : true, dropDups: true },
password: {type: String, required:true}

# controller

Recieve and Give out

We recieve the request body

let {email, password} = req.body
let authService = new AuthService()

exports.register = async (req, res) => {

try {
let registration = authService.registerUser(req.body)
res.status(200).json({success:true, registration, message:"user created, kindly verify your email"})
}
catch(error){
res.status(401).json({success:false, error})
}

}

function AuthService(){

}

AuthService.prototype.registerUser = async function(userObj){

let {email, password} = userObj

if(!email){
throw "no email present"
}

if(!password){
throw "no password present"
}

let existingUser = await User.findOne({email})//Array

if(existingUser){
throw "user email is already used"
}

const emailRegex = /@gmail.com|@yahoo.com|@hotmail.com|@live.com/;
if(!emailRegex.test(email)){
throw "we dont want this kind of email"
}

if(password.length<6){
throw "password length must be more than 6 characters"
}

//lets save it

const user = new User({
email: email.toLowerCase(),
password: sha256(password + process.env.SALT),
name:name,
});
let savedUser = await user.save();//returns saved data object

//email sending aspect

let emailToken = jwt.sign({ id: savedUser.\_id}, process.env.SECRET);
let BASEURL = "http://localhost:3000"

let finalUrl= `${BASEURL}/verify_user/${emailToken}`

let emailMessage = `
Your registration successfull, kindly click the link below to complete and verify your email and registration
${finalUrl}

`

let userObj = new Object;

userObj.name = savedUser.name;

let userObj = {
name: savedUser.name
}

return userObj

}

# Login

exports.login = async(req,res) {

    let authService = new AuthService()
    try {
        let loginUser = authService.loginUser(req.body)
        res.status(200).json({success:true, user:loginUser, message:"Login successful"})

    }
    catch(error) {
        res.status(400).json({success:false, message: error})
    }

}

AuthService.prototype.loginUser = async function({email, password}) {
if(!email){
throw "email is needed"
}
if(!password){
throw "password is needed"
}
let lowerCasedEmail = email.toLowerCase()
//lets check the existence of the email
let existingUser = await User.findOne({email: lowerCasedEmail})
if(!exitingUser){
throw "email is not in our system"
}
//email exist, lets now check if email and password are present in our record

    let user = await User.find({email:lowerCasedEmail, password: sha256(password)})
    if(!user) {
        throw "email and password not in sync with eachother"
    }

     const token = await jwt.sign({ id: user._id}, process.env.SECRET);
     return {
         name: user.name,
         token: token,
         email: user.email
     }

}

# Confirm Email

# user model

name: String,
email_verified: {default:false, type:Boolean}

within the routes
route.get("/verify_user/:emailToken, UserController.verifyUser)

exports.verifyUser = async function(req, res) {
let emailToken = req.params.emailToken
//lets decrypt to get user id
const userId = await jwt.verify(emailToken, process.env.SECRET);
let updatedUser = User.findOneAndUpdate({\_id:userId}, {email_verified:true}, options)
}

userType
Static usertypes
admin
superadmin
client
worker
lower_worker

userType: "worker"

if(user.userType!= "superadmin"){
res.json({success:false, msg:"you are not permitted to perform this task"})
}

Dynamic Role based management system

# Github Actions

CI and CD

CI => Continous Integration
CD => Continous Deployment
