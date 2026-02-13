const categoryModel = require("../models/category.model");
const { apiResponses } = require("../utils/apiResponses");
const { asyncHandler } = require("../utils/asyncHandler");
const path = require("path");
const fs = require("fs");
const slugify = require("slugify");

exports.categoryController = asyncHandler(async (req, res, next) => {
  let { Name, discount, subcategory , products } = req.body;
  let { filename } = req.file;
  let image = `${process.env.SERVER_URL}/${filename}`;

  let slug = slugify(Name, {
    replacement: "-", // replace spaces with replacement character, defaults to `-`
    remove: undefined, // remove characters that match regex, defaults to `undefined`
    lower: true, // convert to lower case, defaults to `false`
    trim: true, // trim leading and trailing replacement chars, defaults to `true`
  });

  let category = new categoryModel({
    Name,
    slug,
    discount,
    subcategory,
    image,
    products,
  });
  await category.save();

  apiResponses(res, 201, "Category Created", category);
});

exports.getAllCategories = asyncHandler(async (req, res, next) => {
  let allCategory = await categoryModel
    .find({})
    .populate(
      { path: "subcategory", select: "_id Name slug image" }, // to select that which fields of subcategory we want to show at UI
    )
    .select("_id image Name subcategory slug"); // will show all the info inside subcategory

  apiResponses(res, 200, "Categories fetched", allCategory);
});

exports.singleCategoryController = asyncHandler(async (req, res, next) => {
  let { slug } = req.params;
  let singlecategory = await categoryModel.findOne({ slug });

  if (singlecategory) {
    apiResponses(res, 200, "Single Category fetched", singlecategory);
  } else {
    apiResponses(res, 404, "Category not found");
  }
});

exports.updateCategoryController = asyncHandler(async (req, res, next) => {
  let { id } = req.params; // route theke jei id pass krbo ta req er parameter theke access krbo
  let { Name, discount } = req.body;
  let { filename } = req.file; //access image through this

  // req.file = access for image, image update korar age ta delete kore nite hobe, then update hobe new img diye

  if (req.file) {
    let category = await categoryModel.findOne({ _id: id });
    let filepath = category.image.split("/"); // image's file location
    let imagepath = filepath[filepath.length - 1];
    let oldpath = path.join(__dirname, "../uploads"); // folder location

    fs.unlink(`${oldpath}/${imagepath}`, async (err) => {
      if (err) {
        apiResponses(res, 500, err.message);
      } else {
        let image = `${process.env.SERVER_URL}/${filename}`;
        category.image = image;
        await category.save();
        apiResponses(res, 200, "Image updated");
      }
    });
  } else {
    let updatedModel = await categoryModel.findOneAndUpdate(
      { _id: id }, // route e je id pass krbo ta database e ache kina check korbe
      { Name, discount }, // will update name and discount field
      { new: true },
    );
    apiResponses(res, 200, "Category Updated Successful", updatedModel);
  }
});

exports.deleteCategoryController = asyncHandler(async (req, res, next) => {
  let { id } = req.params;

  let category = await categoryModel.findOne({ _id: id });
  let filepath = category.image.split("/"); // image's file location
  let imagepath = filepath[filepath.length - 1];
  let oldpath = path.join(__dirname, "../uploads"); // folder location

  fs.unlink(`${oldpath}/${imagepath}`, async (err) => {
    if (err) {
      apiResponses(res, 500, err.message);
    } else {
      await categoryModel.findOneAndDelete({ _id: id });
      apiResponses(res, 200, "Category deleted successfully");
    }
  });
});


