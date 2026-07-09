const ApiResponse = require("../utils/ApiResponse");

/**
 * Handles requests to routes that don't exist.
 */
const notFoundHandler = (req, res, next) => {
  return ApiResponse.error(
    res,
    `Route ${req.originalUrl} not found`,
    404
  );
};

/**
 * Global error handling middleware.
 */
const errorHandler = (err, req, res, next) => {
  console.error(err);

  const statusCode = err.statusCode || 500;

  return ApiResponse.error(
    res,
    err.message || "Internal Server Error",
    statusCode
  );
};

module.exports = {
  notFoundHandler,
  errorHandler,
};