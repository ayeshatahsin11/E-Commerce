
// ============= STATELESS AUTHENTICATION, TOKEN GENERATE ======================

// const jwt = require('jsonwebtoken');
// const { apiResponses } = require('../utils/apiResponses');

// exports.validTokenChecker = (req,res,next)=>{
//     let {token} = req.headers;        // place the token in header's value to check it's validity
//     jwt.verify(token, process.env.JWT_TOKEN, function(err, decoded) {
//  if(err){
//     apiResponses(res,401,err.message)
    
//  }else{
//    if(decoded.user.Role == "admin"){
//     next();
//    }else{
//     apiResponses(res,401, "Cannot Access this route")
//    }
  
    
//  }
// });
    
// }

