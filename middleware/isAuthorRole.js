const { apiResponses } = require("../utils/apiResponses")

exports.isAuthorRole = (...role)=>{
  return(req,res,next)=>{
    if(role.includes(req.session.user.Role)){
    next()
  }else{
    apiResponses(res,403, "Not allowed for this route")
  }
  }
}
