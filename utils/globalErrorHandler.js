const { apiResponses } = require("./apiResponses");

exports.globalErrorHandiling = (error,req,res,next)=>{
    if (error.name === 'ValidationError') {
    // Handle the validation error
    const errors = {};
    Object.keys(error.errors).forEach((key) => {
      errors[key] = error.errors[key].message;
    });

    apiResponses(res,400,Object.values(errors)[0])
  }else if(error.message){
    apiResponses(res,500,error.message)

  }else{
    apiResponses(res,500,"Server Error")
 
  }
    
}

