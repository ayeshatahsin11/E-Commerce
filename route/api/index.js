const express = require("express");
const router = require("./auth");
const productsRouter = require("./products");
const categoryrouter = require("./category");
const subcategoryrouter = require("./subCategory");


const  _ = express.Router();

_.use("/auth", router)

_.use("/products", productsRouter)

_.use("/category",categoryrouter)

_.use("/subcategory", subcategoryrouter

)
module.exports = _ 

