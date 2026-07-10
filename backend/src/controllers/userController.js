const ApiResponse = require("../utils/ApiResponse");

const getProfile = async (req, res) => {
  return ApiResponse.success(
    res,
    "Profile retrieved successfully",
    req.user
  );
};

module.exports = {
  getProfile,
};