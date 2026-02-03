const { default: mongoose } = require("mongoose");

const categorySchema = new mongoose.Schema({
    Name : {
        type : String,
        required : [true, "name is required"],
        unique : [true, "This category already exists"],
        trim : true
    },
   slug:{
type : String,
required: [true, "Slug is required"],
trim : true
   },
    image:{
type: String,
required : [true, "image is required"],
    },
   discount :{
    type : Number
   },
   subcategory:[                           // ekhane array ache, ekta category er moddhe onkgulo subcategory thakte pare
    {
        type : mongoose.Types.ObjectId,  // to create relation with categories
        ref : "SubCategory"             // giving the reference to category model
    }
   ]

}, {
    timestamps :true
})

module.exports = mongoose.model("Category", categorySchema)
