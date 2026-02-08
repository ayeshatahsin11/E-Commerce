const { sendEmail } = require("../helpers/sendEmail");
const merchantModel = require("../models/merchant.model");
const { apiResponses } = require("../utils/apiResponses");
const { asyncHandler } = require("../utils/asyncHandler");

exports.applyMerchantController = asyncHandler(async (req, res, next) => {
  let { user, storename, logo, phone } = req.body; // status hobe na cause ota just admin handle korbe

  let merchant = await merchantModel.findOne({ _id: user });

  if (merchant) {
    apiResponses(res, 400, "Your role is already set as Merchant");
  } else {
    let merchantapply = new merchantModel({
      user,
      storename,
      logo,
      phone,
    });

    await merchantapply.save();
   sendEmail(process.env.AUTH_EMAIL)
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

