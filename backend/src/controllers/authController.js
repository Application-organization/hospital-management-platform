const ApiResponse = require("../utils/ApiResponse");
const authService = require("../services/authService");
const asyncHandler = require("../middleware/asyncHandler");

/**
 * Register User
 */
const register = asyncHandler(async (req, res) => {
  const result = await authService.registerUser(req.body);

  return ApiResponse.success(
    res,
    result.message,
    result.data,
    201
  );
});

/**
 * Login User
 */
const login = asyncHandler(async (req, res) => {
  const result = await authService.loginUser(req.body);

  return ApiResponse.success(
    res,
    result.message,
    result.data
  );
});

module.exports = {
  register,
  login,
};