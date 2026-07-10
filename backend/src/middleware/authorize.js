const ApiResponse = require("../utils/ApiResponse");

const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    // User is attached by authenticate middleware
    if (!req.user) {
      return ApiResponse.error(
        res,
        "Authentication required",
        401
      );
    }

    // Check whether the user's role is allowed
    if (!allowedRoles.includes(req.user.role)) {
      return ApiResponse.error(
        res,
        "You do not have permission to perform this action",
        403
      );
    }

    next();
  };
};

module.exports = authorize;