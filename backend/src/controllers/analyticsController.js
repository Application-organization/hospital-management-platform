const analyticsService = require("../services/analyticsService");
const ApiResponse = require("../utils/ApiResponse");

const getMonthlyAdmissions = async (req, res, next) => {
    try {
        const analyticsData = await analyticsService.getMonthlyAdmissions();

        return ApiResponse.success(
            res,
            "Monthly admission statistics retrieved successfully",
            analyticsData,
            200
        );
    } catch (error) {
        next(error);
    }
};

const getMonthlyRevenue = async (req, res, next) => {
    try {
        const revenueData = await analyticsService.getMonthlyRevenue();

        return ApiResponse.success(
            res,
            "Monthly revenue statistics retrieved successfully",
            revenueData,
            200
        );
    } catch (error) {
        next(error);
    }
};

const getBedOccupancyStatistics = async (req, res, next) => {
    try {
        const occupancyData =
            await analyticsService.getBedOccupancyStatistics();

        return ApiResponse.success(
            res,
            "Bed occupancy statistics retrieved successfully",
            occupancyData,
            200
        );
    } catch (error) {
        next(error);
    }
};

const getAppointmentStatistics = async (req, res, next) => {
    try {
        const statistics =
            await analyticsService.getAppointmentStatistics();

        return ApiResponse.success(
            res,
            "Appointment statistics retrieved successfully",
            statistics,
            200
        );
    } catch (error) {
        next(error);
    }
};

const getLaboratoryStatistics = async (req, res, next) => {
    try {
        const statistics =
            await analyticsService.getLaboratoryStatistics();

        return ApiResponse.success(
            res,
            "Laboratory statistics retrieved successfully",
            statistics,
            200
        );
    } catch (error) {
        next(error);
    }
};

const getDoctorStatistics = async (req, res, next) => {
    try {
        const statistics =
            await analyticsService.getDoctorStatistics();

        return ApiResponse.success(
            res,
            "Doctor statistics retrieved successfully",
            statistics,
            200
        );
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getMonthlyAdmissions,
    getMonthlyRevenue,
    getBedOccupancyStatistics,
    getAppointmentStatistics,
    getLaboratoryStatistics,
    getDoctorStatistics,
};