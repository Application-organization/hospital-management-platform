const ApiResponse = require("../utils/ApiResponse");

const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      return ApiResponse.error(
        res,
        "Validation failed",
        400,
        error.details.map((detail) => detail.message)
      );
    }

    // Replace the request body with the validated and sanitized data
    req.body = value;

    next();
  };
};

module.exports = validate;