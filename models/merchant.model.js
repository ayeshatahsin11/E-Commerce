const { default: mongoose } = require("mongoose");

const merchantSchema = new mongoose.Schema({
   user : {
    type : mongoose.Types.ObjectId,
    ref : "user"
   },
   storename : {
        type : String,
        require : [true, "Store Name is required"]
   },
   logo : {
       type : String
   },
    phone : {
        type : String,
     required : [true, "Cell number is required"]
    },
  status : {
    type : String,
    enum : ["pending", "rejected" , "approved"],
    default : "pending"
  }
   
 

}, {
    timestamps :true
})

module.exports = mongoose.model("Merchant", merchantSchema)
