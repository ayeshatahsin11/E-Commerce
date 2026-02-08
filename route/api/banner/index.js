const express = require("express");

const upload = require("../../../utils/upload");
const { addBannerController, getAllBannerController, updateBannerController, deleteBannerController } = require("../../../controllers/banner.controller");
const { isLogged } = require("../../../middleware/isLogged");
const { isAuthorRole } = require("../../../middleware/isAuthorRole");

const  bannerrouter = express.Router();
// const multer  = require('multer')             // will use here so required here
// const upload = multer({ dest: 'uploads/' })     // used to upload any file, video and gotta mention the location here as well


bannerrouter.post("/add-banner",isLogged,isAuthorRole("admin","merchant"),upload.single("Image"),addBannerController)

bannerrouter.get("/getbanners",getAllBannerController)

bannerrouter.patch("/update-banner/:id",isLogged,isAuthorRole("admin","merchant"),upload.single("Image"),updateBannerController)

bannerrouter.delete("/delete-banner/:id",isLogged,isAuthorRole("admin","merchant"),deleteBannerController)

module.exports = bannerrouter 



