const { sendEmail } = require("../helpers/sendEmail");
const merchantModel = require("../models/merchant.model");
const { apiResponses } = require("../utils/apiResponses");
const { asyncHandler } = require("../utils/asyncHandler");
const userModel = require("../models/user.model");
const { sendMerchantRequestEmail } = require("../helpers/sendEmailtoAdminforMerchantreq");
const { sendMerchantStatusEmail } = require("../helpers/sendMerchantStatusEmail");

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

    // 1. Update the Merchant Status
    let merchant = await merchantModel.findOneAndUpdate(
        { _id: id },
        { status },
        { new: true, runValidators: true }
    );

    // 2. Check if Merchant exists BEFORE trying to find the user
    if (!merchant) {
        return apiResponses(res, 404, "Merchant not found");
    }

    // 3. Find the User using the ID stored IN the merchant document
    // logic: The merchant document contains the link to the user (merchant.user)
    let userdata = await userModel.findById(merchant.user);

    // Safety check: ensure user actually exists
    if (!userdata) {
        return apiResponses(res, 404, "Linked User not found");
    }

    try {
        await sendMerchantStatusEmail(
            userdata.email,  // This will now work because userdata is found
            userdata.Name,   // Make sure this matches your User Schema (e.g., name, fullName, username)
            status,
            merchant.storename // Make sure this matches your Schema (storename vs storeName)
        );
    } catch (error) {
        console.error("Failed to send status email:", error.message);
    }

    apiResponses(res, 200, `Merchant status updated to ${status} and user notified.`, merchant);
});


