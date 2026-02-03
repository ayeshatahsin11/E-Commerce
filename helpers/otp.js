const otpGenerator = require('otp-generator');


exports.otp = ()=>{
    return otpGenerator.generate(6,
     {
         upperCaseAlphabets: false,
          specialChars: false 
        });
}


