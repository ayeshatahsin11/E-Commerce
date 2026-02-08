const categoryModel = require("../models/category.model");
const subCategoryModel = require("../models/subCategory.model");
const { apiResponses } = require("../utils/apiResponses");
const { asyncHandler } = require("../utils/asyncHandler");
const path = require("path");
const fs = require("fs");
const slugify = require("slugify");

exports.subcategoryController = asyncHandler(async (req, res, next) => {
  let { Name, category } = req.body;
  let slug = slugify(Name, {
    replacement: "-", // replace spaces with replacement character, defaults to `-`
    remove: undefined, // remove characters that match regex, defaults to `undefined`
    lower: true, // convert to lower case, defaults to `false`
    trim: true, // trim leading and trailing replacement chars, defaults to `true`
  });
  let { filename } = req.file;
  let image = `${process.env.SERVER_URL}/${filename}`;
  let subcategory = new subCategoryModel({
    Name,
    category,
    image,
    slug,
  });

  await subcategory.save();

  await categoryModel.findOneAndUpdate(
    // this is called referencing
    { _id: category }, // je id diyechi subcategory te, ta giye khujbe and dekhbe je kon category er part
    { $push: { subcategory: subcategory._id } }, // khujar por oi category er subcategory field e elements gulo push krbe
    { new: true },
  );

  apiResponses(res, 200, "SubCategory Created", subcategory);
});

exports.updateSubcategoryController = asyncHandler(async (req, res, next) => {
  let { id } = req.params;
 let { Name, category } = req.body || {};

    let { filename } = req.file || {};  //access image through this, default vabe khali thakbe age
  
    // req.file = access for image, image update korar age ta delete kore nite hobe, then update hobe new img diye
  
    if (req.file) {
      let subcategory = await subCategoryModel.findOne({ _id: id });
      let filepath = subcategory.image.split("/"); // image's file location
      let imagepath = filepath[filepath.length - 1];
      let oldpath = path.join(__dirname, "../uploads"); // folder location
  
      fs.unlink(`${oldpath}/${imagepath}`, async (err) => {
        if (err) {
          apiResponses(res, 500, err.message);
        } else {
          let image = `${process.env.SERVER_URL}/${filename}`;
          subcategory.image = image;
          await subcategory.save();
          apiResponses(res, 200, "Image updated");
        }
      });
    } else {
      if (category) {
    await subCategoryModel.findOneAndUpdate(
      { _id: id }, // je id pass korechi ta subcategorymodel e khujbe
      { Name, category }, // req.body er moddhe je new info send krbo ta diye update krbe
      { new: true },
    );
    await categoryModel.findOneAndUpdate(
      { _id: category }, // subcategory err moddhe jei category er id pass korechi ta find krbe
      { $push: { subcategory: id } }, // find korar por oi category er subcategory te push krbe
      { new: true },
    );
    apiResponses(res, 200, "Sub Category Updated");
  } else {
    await subCategoryModel.findOneAndUpdate(
      // this will only update Name
      { _id: id },
      { Name },
      { new: true },
    );
    apiResponses(res, 200, "Subcategory's Name updated");
  }
    }
  });
   
exports.deleteSubCtaegoryController = asyncHandler(async (req, res, next) => {
  let { id } = req.params;

  let subcategory = await subCategoryModel.findOne({ _id: id });
  let filepath = subcategory.image.split("/"); // image's file location
  let imagepath = filepath[filepath.length - 1];
  let oldpath = path.join(__dirname, "../uploads"); // folder location

  fs.unlink(`${oldpath}/${imagepath}`, async (err) => {
    if (err) {
      apiResponses(res, 500, err.message);
    } else {
      await subCategoryModel.findOneAndDelete({ _id: id });
      await categoryModel.findOneAndUpdate(
        { subcategory: id },      // je id pass korechi shei subcategory khujbo
        { $pull: { subcategory: id } },      // khuje then eta dlt kore dibo, pull = delete
      );

      apiResponses(res, 200, "Sub-Category deleted successfully");
    }
  });
});


exports.getSubCategoryControllerr = asyncHandler(async(req,res,next)=>{
  let allSubCategory = await subCategoryModel.find({})  

  apiResponses(res,200, "Sub Category fetched", allSubCategory)

})

