const dashboardService = require("../services/dashboardService");
const ApiResponse = require("../utils/ApiResponse");

const getDashboardStatistics = async (req, res, next) => {
    try {
        const dashboardData =
            await dashboardService.getDashboardStatistics();

        return ApiResponse.success(
            res,
            "Dashboard statistics retrieved successfully",
            dashboardData,
            200
        );

    } catch (error) {
        next(error);
    }
};

module.exports = {
    getDashboardStatistics,
};