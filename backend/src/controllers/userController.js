const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../middleware/asyncHandler");
const userService = require("../services/userService");

/**
 * Get User Profile
 */
const getProfile = asyncHandler(async (req, res) => {
  const profile = await userService.getProfile(req.user);

  return ApiResponse.success(
    res,
    "Profile retrieved successfully",
    profile
  );
});

/**
 * Get Admin Dashboard
 */
const getAdminDashboard = asyncHandler(async (req, res) => {
  const dashboard = await userService.getAdminDashboard(req.user);

  return ApiResponse.success(
    res,
    "Welcome to the Admin Dashboard",
    dashboard
  );
});

module.exports = {
  getProfile,
  getAdminDashboard,
};