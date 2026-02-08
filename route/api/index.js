const express = require("express");
const router = require("./auth");
const productsRouter = require("./products");
const categoryrouter = require("./category");
const subcategoryrouter = require("./subCategory");
const bannerrouter = require("./banner");
const merchantrouter = require("./merchant");

const _ = express.Router();

_.use("/auth", router);

_.use("/products", productsRouter);

_.use("/category", categoryrouter);

_.use("/subcategory", subcategoryrouter);

_.use("/banner",bannerrouter)

_.use("/merchant",merchantrouter)

module.exports = _;


