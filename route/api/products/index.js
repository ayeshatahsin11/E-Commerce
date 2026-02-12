const express = require("express");
const { addProdcutsController } = require("../../../controllers/products.controller");
const upload = require("../../../utils/upload");


const  productsRouter = express.Router();

productsRouter.post("/add-products", upload.single("Image") ,addProdcutsController)









module.exports = productsRouter ;

