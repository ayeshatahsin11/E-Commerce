const express = require("express");
const { signUpcontroller, loginController, userController, otpVerifyController, resendOtpController } = require("../../../controllers/auth.controller");
const { isLogged } = require("../../../middleware/isLogged");
const { isAuthorRole } = require("../../../middleware/isAuthorRole");

// const { validTokenChecker } = require("../../../helpers/validToken");  // stateless auth er jnno created route middleware

const  router = express.Router();

router.post("/signup",signUpcontroller)

router.post("/login",loginController)

router.get("/alluser",isLogged,isAuthorRole("admin")  // passing roles to catch them in middleware func
    ,userController)  // route middleware, no need to call it initially

router.post("/verifyotp",otpVerifyController)  

router.post("/resendotp",resendOtpController)

module.exports = router 

