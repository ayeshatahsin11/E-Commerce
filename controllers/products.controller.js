const { apiResponses } = require("../utils/apiResponses");
const { asyncHandler } = require("../utils/asyncHandler");
const path = require("path");
const fs = require("fs");
const slugify = require("slugify");
const productModel = require("../models/product.model");

exports.addProdcutsController = asyncHandler(async (req, res, next) => {
  let { title, description, price, discountPrice, variantType, category } =
    req.body;
  let { filename } = req.file;
  let image = `${process.env.SERVER_URL}/${filename}`;

  let slug = slugify(title, {
    replacement: "-", // replace spaces with replacement character, defaults to `-`
    remove: undefined, // remove characters that match regex, defaults to `undefined`
    lower: true, // convert to lower case, defaults to `false`
    trim: true, // trim leading and trailing replacement chars, defaults to `true`
  });

  let addedProdcuts = new productModel({
    title,
    slug,
    description,
    price,
    discountPrice,
    variantType,
    category,
    image,
  });
  await addedProdcuts.save();

  apiResponses(res, 201, "Product Created", addedProdcuts);
});
