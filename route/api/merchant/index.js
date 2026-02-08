const express = require("express");

const upload = require("../../../utils/upload");
const { isLogged } = require("../../../middleware/isLogged");
const { isAuthorRole } = require("../../../middleware/isAuthorRole");
const { applyMerchantController, merchantApporovalController } = require("../../../controllers/merchant.controller");
const merchantrouter = express.Router();

merchantrouter.post("/apply-merchant",applyMerchantController);

merchantrouter.post("/merchantapprove/:id",isLogged,isAuthorRole("admin"),merchantApporovalController)

module.exports = merchantrouter 



