const { validationResult } = require("express-validator");
const ApiResponse = require("../utils/ApiResponse");

/**
 * Global Request Validation Middleware
 *
 * Collects validation errors from express-validator
 * and returns a standardized API response.
 */
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  return ApiResponse.error(
    res,
    "Validation failed",
    400,
    errors.array().map((error) => ({
      field: error.path,
      message: error.msg,
    }))
  );
};

module.exports = validateRequest;