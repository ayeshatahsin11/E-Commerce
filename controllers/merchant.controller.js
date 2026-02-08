const { sendEmail } = require("../helpers/sendEmail");
const merchantModel = require("../models/merchant.model");
const { apiResponses } = require("../utils/apiResponses");
const { asyncHandler } = require("../utils/asyncHandler");
const userModel = require("../models/user.model");
const { sendMerchantRequestEmail } = require("../helpers/sendEmailtoAdminforMerchantreq");

exports.applyMerchantController = asyncHandler(async (req, res, next) => {
  let { user, storename, logo, phone } = req.body; // status hobe na cause ota just admin handle korbe

  let merchant = await merchantModel.findOne({ user : user });

  let userdata = await userModel.findOne({_id : user})
         
  if (merchant) { 
    console.log(merchant);
    
    apiResponses(res, 400, "Your request has already been sent");
  } else {
 let merchantapply = new merchantModel({
      user,
      storename,
      logo,
      phone,
    });

    await merchantapply.save();
  
    await sendMerchantRequestEmail(
      process.env.AUTH_EMAIL, // Admin Email
        "Rafa",          // Admin Name
        userdata.Name,          // Applicant Name
         req.body.storename,  // Store Name
               
    );

  
   
    apiResponses(res, 200, "Your request for merchant post has been sent");
  }
});

exports.merchantApporovalController = asyncHandler(async (req, res, next) => {
  let { id } = req.params;

  let { status } = req.body;

  let merchant = await merchantModel.findOneAndUpdate(
    { _id: id },          // route e jei id pass krbo ta database e khujbo
    { status },           // admin je status dibe ta update hobe
    { new: true , runValidators: true},
  );
 
  apiResponses(res,200, "Checked and updated by Admin",merchant)



});

