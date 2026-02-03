const express = require("express");
const { productsInfo } = require("../../../controllers/products.controller");


const  productsRouter = express.Router();

productsRouter.get("/allproducts", productsInfo)


module.exports = productsRouter 

