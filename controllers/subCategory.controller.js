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
    let { Name, category } = req.body;

    // ১. প্রথমেই বর্তমান সাব-ক্যাটাগরি ডাটা খুঁজে বের করুন (Old Category ID জানার জন্য)
    let subcategory = await subCategoryModel.findById(id);
    if (!subcategory) {
        return apiResponses(res, 404, "Subcategory not found");
    }

    const oldCategoryId = subcategory.category;

    // ২. ইমেজ আপডেট লজিক (যদি নতুন ফাইল থাকে)
    if (req.file) {
        const { filename } = req.file;
        const oldImagePath = subcategory.image.split("/").pop();
        const fullOldPath = path.join(__dirname, "../uploads", oldImagePath);

        // পুরনো ফাইল ডিলিট
        if (fs.existsSync(fullOldPath)) {
            fs.unlinkSync(fullOldPath);
        }
        subcategory.image = `${process.env.SERVER_URL}/${filename}`;
    }

    // ৩. নাম আপডেট
    if (Name) subcategory.Name = Name;

    // ৪. ক্যাটাগরি পরিবর্তন লজিক (সবচেয়ে গুরুত্বপূর্ণ অংশ)
    if (category && category.toString() !== oldCategoryId.toString()) {
        
        // ধাপ এ: পুরনো ক্যাটাগরি থেকে এই সাব-ক্যাটাগরির ID মুছে ফেলুন
        await categoryModel.findByIdAndUpdate(oldCategoryId, {
            $pull: { subcategory: id }
        });

        // ধাপ বি: নতুন ক্যাটাগরিতে এই সাব-ক্যাটাগরির ID যোগ করুন
        // $addToSet ব্যবহার করা ভালো যাতে ডুপ্লিকেট না হয়
        await categoryModel.findByIdAndUpdate(category, {
            $addToSet: { subcategory: id }
        });

        // সাব-ক্যাটাগরি মডেলে নতুন ক্যাটাগরি সেট করুন
        subcategory.category = category;
    }

    // ৫. সব পরিবর্তন সেভ করুন
    const updatedData = await subcategory.save();

    return apiResponses(res, 200, "Subcategory Updated Successfully", updatedData);
});
   
exports.deleteSubCtaegoryController = asyncHandler(async (req, res, next) => {
  let { id } = req.params;

  let subcategory = await subCategoryModel.findOne({ _id: id });
  let filepath = subcategory.image.split("/"); // image's file location
  let imagepath = filepath[filepath.length - 1];
  let oldpath = path.join(__dirname, "../uploads"); // folder location

  fs.unlink(`${oldpath}/${imagepath}`, async (err) => {
    if (err) {
      apiResponses(res, 500, "err.message");
    } else {
      await subCategoryModel.findOneAndDelete({ _id: id });
      await categoryModel.updateMany(
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

