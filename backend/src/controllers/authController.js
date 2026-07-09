const ApiResponse = require("../utils/ApiResponse");

const register = async (req, res) => {
  ApiResponse.success(
    res,
    "Register endpoint is under development"
  );
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