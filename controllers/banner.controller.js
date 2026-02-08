const bannerModel = require("../models/banner.model");
const { apiResponses } = require("../utils/apiResponses");
const { asyncHandler } = require("../utils/asyncHandler");
const path = require("path");
const fs = require("fs");

exports.addBannerController = asyncHandler(async(req,res,next)=>{
    let { url } = req.body;
     let { filename } = req.file;
     let image = `${process.env.SERVER_URL}/${filename}`;
   
    
   
     let banner = new bannerModel({
      url,
       image,
     });
     await banner.save();
   
     apiResponses(res, 201, "Banner Created", banner);
   });

exports.getAllBannerController = asyncHandler(async(req,res,next)=>{
    let banners = await bannerModel
        .find({})
        .populate().select("_id image url"); // will show all the info inside subcategory
    
      apiResponses(res, 200, "Banners fetched", banners);
   });

exports.updateBannerController = asyncHandler(async(req,res,next)=>{
     let { id } = req.params; // route theke jei id pass krbo ta req er parameter theke access krbo
      let { url } = req.body || {};
      let { filename } = req.file || {}; //access image through this
    
      // req.file = access for image, image update korar age ta delete kore nite hobe, then update hobe new img diye
    
      if (req.file) {
        let banner = await bannerModel.findOne({ _id: id });
        let filepath = banner.image.split("/"); // image's file location
        let imagepath = filepath[filepath.length - 1];
        let oldpath = path.join(__dirname, "../uploads"); // folder location
    
        fs.unlink(`${oldpath}/${imagepath}`, async (err) => {
          if (err) {
            apiResponses(res, 500, err.message);
          } else {
            let image = `${process.env.SERVER_URL}/${filename}`;
            banner.image = image;
            await banner.save();
            apiResponses(res, 200, "Image updated");
          }
        });
      } else {
        let updatedBannerModel = await bannerModel.findOneAndUpdate(
          { _id: id }, // route e je id pass krbo ta database e ache kina check korbe
          { url }, // will update name and discount field
          { new: true },
        );
        apiResponses(res, 200, "Category Updated Successful", updatedBannerModel);
      }
});

exports.deleteBannerController = asyncHandler(async (req, res, next) => {
  let { id } = req.params;

  let banner = await bannerModel.findOne({ _id: id });
  let filepath = banner.image.split("/"); // image's file location
  let imagepath = filepath[filepath.length - 1];
  let oldpath = path.join(__dirname, "../uploads"); // folder location

  fs.unlink(`${oldpath}/${imagepath}`, async (err) => {
    if (err) {
      apiResponses(res, 500, err.message);
    } else {
      await bannerModel.findOneAndDelete({ _id: id });
      apiResponses(res, 200, "Banner deleted successfully");
    }
  });
});


