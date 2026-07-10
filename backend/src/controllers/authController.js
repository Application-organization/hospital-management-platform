const ApiResponse = require("../utils/ApiResponse");
const authService = require("../services/authService");

const register = async (req, res, next) => {
  try {
    const result = await authService.registerUser(req.body);

    return ApiResponse.success(
      res,
      result.message,
      result.data,
      201
    );
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await authService.loginUser(req.body);

    return ApiResponse.success(
      res,
      result.message,
      result.data
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
};