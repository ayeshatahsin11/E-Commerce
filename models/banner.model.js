const { default: mongoose } = require("mongoose");

const bannerSchema = new mongoose.Schema({
   
    image:{
type: String,
required : [true, "Image is required"]

    },
   url : {
    type : String,
    trim : true
   }

   

}, {
    timestamps :true
})

module.exports = mongoose.model("Banner", bannerSchema)
