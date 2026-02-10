const { default: mongoose, Mongoose } = require("mongoose");

const productSchema = new mongoose.Schema({
    title : {
        type : String,
        required : [true, "Title is required"],
        trim : true
    },
    photo:{
type: String
    },
   description : {
    type :String,
    required : [true, "Description is required"]
   },
   price : {
    type : Number,
    required : [true, "Price is required"]
   },
   discountPrice : {
    type : Number
   },
   variantType : {
    type : String,
    enum : ["singlevariant", "multivaraint"],
    default : "singlevariant"
   },
   category : {
    type : mongoose.Types.ObjectId,
    ref : "category"
   }
}, {
    timestamps :true
})

module.exports = mongoose.model("Product", productSchema)


