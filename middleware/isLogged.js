
const { apiResponses } = require("../utils/apiResponses")

exports.isLogged = (req,res,next)=>{
 
if(req.session.user?.LoginStatus){
   next()
}else{
    apiResponses(res,401,"Not logged in, kindly login initially")
}

}

