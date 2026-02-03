const express = require("express");
const { categoryController, getAllCategories, updateCategoryController, deleteCategoryController, singleCategoryController } = require("../../../controllers/category.controller");
const upload = require("../../../utils/upload");
const { isLogged } = require("../../../middleware/isLogged");
const { isAuthorRole } = require("../../../middleware/isAuthorRole");
const  categoryrouter = express.Router();
// const multer  = require('multer')             // will use here so required here
// const upload = multer({ dest: 'uploads/' })     // used to upload any file, video and gotta mention the location here as well
// here upload is a middleware, and we can upload files single, array or in object form,then at postman's body(form data), we can send file's location aka value

categoryrouter.post("/add-category",isLogged,isAuthorRole("admin","merchant"),upload.single("Image"),categoryController)

categoryrouter.get("/getcategories",getAllCategories)

categoryrouter.get("/singlecategory/:slug",singleCategoryController)

categoryrouter.patch("/updatecategory/:id",isLogged,isAuthorRole("admin","merchant"),upload.single("Image"),updateCategoryController)

categoryrouter.delete("/deletecategory/:id",isLogged,isAuthorRole("admin","merchant"),deleteCategoryController)

module.exports = categoryrouter 

