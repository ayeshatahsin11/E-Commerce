const express = require("express");
const { categoryController, getAllCategories } = require("../../../controllers/category.controller");
const upload = require("../../../utils/upload");
const { subcategoryController, updateSubcategoryController, deleteSubCtaegoryController, getSubCategoryControllerr } = require("../../../controllers/subCategory.controller");
const { isLogged } = require("../../../middleware/isLogged");
const { isAuthorRole } = require("../../../middleware/isAuthorRole");
const  subcategoryrouter = express.Router();
// const multer  = require('multer')             // will use here so required here
// const upload = multer({ dest: 'uploads/' })     // used to upload any file, video and gotta mention the location here as well


subcategoryrouter.post("/add-subcategory",isLogged,isAuthorRole("admin","merchant"),upload.single("Image"),subcategoryController)

subcategoryrouter.get("/getsubcategory",getSubCategoryControllerr)

subcategoryrouter.patch("/updatesubcategory/:id",isLogged,isAuthorRole("admin","merchant"),upload.single("Image"),updateSubcategoryController)

subcategoryrouter.delete("/deletesubcategory/:id",isLogged,isAuthorRole("admin","merchant"),deleteSubCtaegoryController)

module.exports = subcategoryrouter 



