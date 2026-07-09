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

const login = async (req, res) => {
  ApiResponse.success(
    res,
    "Login endpoint is under development"
  );
};

module.exports = {
  register,
  login,
};