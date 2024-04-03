const AppError = require("../utils/AppError");

// ['admin', 'customer', 'sale'].includes('sale)

function verifyUserAuthorization(roleToVerify) {
  return (request, response, next) => {
    const {role} = request.user;

    if(roleToVerify.includes(role)) {
      return next();
    };
    
    throw new AppError("Unauthorized", 401);
  };
};

module.exports = verifyUserAuthorization;