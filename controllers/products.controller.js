const { apiResponses } = require("../utils/apiResponses");
const { asyncHandler } = require("../utils/asyncHandler");
const path = require("path");
const fs = require("fs");
const slugify = require("slugify");
const productModel = require("../models/product.model");
const categoryModel = require("../models/category.model");

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

  let addedProducts = new productModel({
    title,
    slug,
    description,
    price,
    discountPrice,
    variantType,
    category,
    image,
  });
  await addedProducts.save();

  await categoryModel.findOneAndUpdate(
    // this is called referencing
    { _id: category }, // je id diyechi subcategory te, ta giye khujbe and dekhbe je kon category er part
    { $push: { products: addedProducts._id } }, // khujar por oi category er subcategory field e elements gulo push krbe
    { new: true },
  );

  apiResponses(res, 201, "Product Created", addedProducts);
});
