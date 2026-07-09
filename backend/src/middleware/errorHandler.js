const ApiResponse = require("../utils/ApiResponse");

const notFoundHandler = (req, res) => {
  ApiResponse.error(
    res,
    `Route ${req.originalUrl} not found`,
    404
  );
};

const errorHandler = (err, req, res, next) => {
  console.error(err);

  ApiResponse.error(
    res,
    err.message || "Internal Server Error",
    err.statusCode || 500
  );
};

module.exports = {
  notFoundHandler,
  errorHandler,
};