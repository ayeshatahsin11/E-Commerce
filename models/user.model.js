const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    Name : {
        type : String,
        required : [true, "name is required"],
        trim : true
    },
    email: {
        type : String,
    required : [true, "email is required"],
    unique : [true, "This Email is already in use"]
    
    },
    password : {
        type : String,
      required : [true, "password is required"],
    },
    phone : {
        type : String,
     
    },
    role:{
        type : String,
required : [true, "role is required"],
        enum : ["user", "admin","merchant"]   , // only these fixed values are allowed to use
        default : "user"
    },
    photo:{
type: String
    },
    otp : {
        type : String
    },
    otpExpire:{
        type: Date
    },
    verifyOtp :{
        type: Boolean,
        default: false
    }

}, {
    timestamps :true
})

module.exports = mongoose.model("user", userSchema)
