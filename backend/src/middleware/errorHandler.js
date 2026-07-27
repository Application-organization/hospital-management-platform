const ApiResponse = require("../utils/ApiResponse");

/**
 * Handles requests to routes that don't exist.
 */
const notFoundHandler = (req, res) => {
  return ApiResponse.error(
    res,
    `Route ${req.originalUrl} not found`,
    404
  );
};

/**
 * Global error handling middleware.
 */
const errorHandler = (error, req, res) => {
  console.error(error);

  const statusCode = error.statusCode || 500;

  return ApiResponse.error(
    res,
    error.message || "Internal Server Error",
    statusCode
  );
};

module.exports = {
  notFoundHandler,
  errorHandler,
};