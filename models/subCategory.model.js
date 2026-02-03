const { default: mongoose } = require("mongoose");

const subcategorySchema = new mongoose.Schema({
    Name : {
        type : String,
        required : [true, "name is required"],
        trim : true
    },
    slug:{
type : String,
required: [true, "Slug is required"],
trim : true
   },
    image:{
type: String,
required : [true, "Image is required"]

    },
   discount :{
    type : Number
   },
   category:                            // ekhane array hobe na cause subcategory gulo ekta matro category er under e thake
    {
        type : mongoose.Types.ObjectId,  // to create relation with schema fields
        ref : "Category"             // giving the reference to category model
    }
   

}, {
    timestamps :true
})

module.exports = mongoose.model("SubCategory", subcategorySchema)
