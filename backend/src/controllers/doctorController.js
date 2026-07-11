const doctorService = require("../services/doctorService");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../middleware/asyncHandler");

/**
 * Create Doctor
 */
const createDoctor = asyncHandler(async (req, res) => {
    const doctor = await doctorService.createDoctor(req.body);

    return ApiResponse.success(
        res,
        "Doctor created successfully",
        doctor,
        201
    );
});

/**
 * Get All Doctors
 */
const getAllDoctors = asyncHandler(async (req, res) => {
    const doctors = await doctorService.getAllDoctors();

    return ApiResponse.success(
        res,
        "Doctors retrieved successfully",
        doctors
    );
});

/**
 * Get Doctor By ID
 */
const getDoctorById = asyncHandler(async (req, res) => {
    const doctor = await doctorService.getDoctorById(req.params.id);

    return ApiResponse.success(
        res,
        "Doctor retrieved successfully",
        doctor
    );
});

/**
 * Update Doctor
 */
const updateDoctor = asyncHandler(async (req, res) => {
    const doctor = await doctorService.updateDoctor(
        req.params.id,
        req.body
    );

    return ApiResponse.success(
        res,
        "Doctor updated successfully",
        doctor
    );
});

/**
 * Delete Doctor
 */
const deleteDoctor = asyncHandler(async (req, res) => {
    await doctorService.deleteDoctor(req.params.id);

    return ApiResponse.success(
        res,
        "Doctor deleted successfully",
        null
    );
});

module.exports = {
    createDoctor,
    getAllDoctors,
    getDoctorById,
    updateDoctor,
    deleteDoctor,
};