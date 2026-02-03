const userModel = require("../models/user.model");
const { apiResponses } = require("../utils/apiResponses");
const bcrypt = require('bcrypt');
const { asyncHandler } = require("../utils/asyncHandler");
const { sendEmail } = require("../helpers/sendEmail");
const { otp } = require("../helpers/otp");
const { validChecker } = require("../helpers/validEmailChecker");
// const jwt = require('jsonwebtoken');   //this for stateless authentication

exports.signUpcontroller = asyncHandler(async (req, res, next) => {
    let { Name, email, password, phone, role } = req.body;
    let emailChecker = validChecker(email);
    if (!emailChecker) {
        return apiResponses(res, 401, "Invalid Email Address")
    }

    // ১. Bcrypt call korar agei check korun password ache kina
    if (!password) {
        // Ekhane apni manually error throw korte paren jeta globalErrorHandler dhorbe
        const error = new Error("Password is required");
        error.statusCode = 400;
        return next(error);
    }
    const hashedpass = await bcrypt.hash(password, 12);
    let OTP = otp();
    let user = new userModel({
        Name, email, password: hashedpass, phone, role, otp: OTP, otpExpire: Date.now() + 1*60*1000, 
    })
    await user.save();
    sendEmail(email, Name, OTP);    // je registration korche tar email e verification code send korbo
    apiResponses(res, 201, "Account Created", user)
});

exports.loginController = asyncHandler(async (req, res) => {
    let { email, password } = req.body;

    let emailChecker = validChecker(email);
    if (!emailChecker) {
        return apiResponses(res, 401, "Invalid Email Address")
    }

    let existingUser = await userModel.findOne({ email: email })
    if (!existingUser) {
        apiResponses(res, 404, "Invalid Credentials")
    } else {
        bcrypt.compare(password, existingUser.password, function (err, result) {  // we have the current user's info in existingUser variable, so it'll compare the given password (password) with the saved pw(existingUser.password)
            if (err) {
                apiResponses(res, 500, "Internal Server Error")
            } else {
                if (!result) {
                    apiResponses(res, 404, "Invalid Credentials")
                } else {
                    let user = {              // an object that'll show the user only the selected fields.
                        id: existingUser._id,
                        Name: existingUser.Name,
                        email: existingUser.email,
                        Role: existingUser.role,
                        LoginStatus: true
                    }
                    if (existingUser.role == "admin" || existingUser.role == "merchant") {

                        req.session.cookie.maxAge = 60000 * 20     //will expire in 30sec,place it initially
                        req.session.user = user     //passing user info in req.session, jkhn e login kora hobe tkhn e session(cookie) generate hoye jabe, then next time onno route e jawar age jkhn session middleware cross krbe tkhn user info pawa jabe,cookie delete korle user info r pawa jabe na,means logged out
                        // let token = jwt.sign({ user }, process.env.JWT_TOKEN,  { expiresIn: '5m' });  // token for stateless auth
                        apiResponses(res, 200, "Login Successful", user)
                    } else {
                        req.session.cookie.maxAge = 7 * 24 * 60 * 60 * 1000;
                        req.session.user = user
                        apiResponses(res, 200, "login succesful", user)
                    }
                }
            }
        });

    }


})

exports.userController = asyncHandler(async (req, res) => {
    let users = await userModel.find({}).select("Name email role") // if we give (-) sign in front of field name, it won't show up as response
    apiResponses(res, 200, "Fetched all users successfully", users)
});

exports.otpVerifyController = asyncHandler(async(req,res)=>{
  let {email,otp} = req.body;
  let existingUser = await userModel.findOne({email})

  if(!existingUser){
   return  apiResponses(res,404,"Invalid Email")
  }
    

     if(existingUser.otpExpire < Date.now()){
    existingUser.otp=null
    existingUser.otpExpire = null
    await existingUser.save()
   return  apiResponses(res,400, "Otp session expired")
  }else if(existingUser.otp != otp){
    return apiResponses(res,401,"Invalid Otp")
  }
  else{
       existingUser.verifyOtp = true
        existingUser.otp=null
    existingUser.otpExpire = null
    await existingUser.save()
    apiResponses(res,200, "Otp verified Successfully")
  }

})
exports.resendOtpController = asyncHandler(async(req,res)=>{
    let {email} = req.body;

    let existingUser = await userModel.findOne({email})
     
    if(existingUser.verifyOtp){
        apiResponses(res,409,"This Email is already verified")
    }else{
            let OTP = otp();
            existingUser.otp = OTP
            existingUser.otpExpire = Date.now() + 1*60*1000
            await existingUser.save()

            sendEmail(email,existingUser.fullname,otp)
            apiResponses(res,200, "Otp sent again")
    }
})


