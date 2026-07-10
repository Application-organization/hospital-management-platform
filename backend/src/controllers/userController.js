const ApiResponse = require("../utils/ApiResponse");

const getProfile = async (req, res) => {
  return ApiResponse.success(
    res,
    "Profile retrieved successfully",
    req.user
  );
};

const getAdminDashboard = async (req, res) => {
  return ApiResponse.success(
    res,
    "Welcome to the Admin Dashboard",
    {
      user: req.user,
      statistics: {
        totalPatients: 0,
        totalDoctors: 0,
        totalAppointments: 0,
      },
    }
  );
};

module.exports = {
  getProfile,
  getAdminDashboard,
};