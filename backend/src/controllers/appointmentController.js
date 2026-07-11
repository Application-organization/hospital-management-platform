const appointmentService = require("../services/appointmentService");
const asyncHandler = require("../middleware/asyncHandler");

// Create Appointment
const createAppointment = asyncHandler(async (req, res) => {
    const appointment = await appointmentService.createAppointment(req.body);

    res.status(201).json({
        success: true,
        message: "Appointment created successfully",
        data: appointment,
    });
});

// Get All Appointments
const getAllAppointments = asyncHandler(async (req, res) => {
    const appointments = await appointmentService.getAllAppointments();

    res.status(200).json({
        success: true,
        message: "Appointments retrieved successfully",
        data: appointments,
    });
});

// Get Appointment By ID
const getAppointmentById = asyncHandler(async (req, res) => {
    const appointment = await appointmentService.getAppointmentById(req.params.id);

    res.status(200).json({
        success: true,
        message: "Appointment retrieved successfully",
        data: appointment,
    });
});

// Update Appointment
const updateAppointment = asyncHandler(async (req, res) => {
    const appointment = await appointmentService.updateAppointment(
        req.params.id,
        req.body
    );

    res.status(200).json({
        success: true,
        message: "Appointment updated successfully",
        data: appointment,
    });
});

// Delete Appointment
const deleteAppointment = asyncHandler(async (req, res) => {
    await appointmentService.deleteAppointment(req.params.id);

    res.status(200).json({
        success: true,
        message: "Appointment deleted successfully",
        data: null,
    });
});

module.exports = {
    createAppointment,
    getAllAppointments,
    getAppointmentById,
    updateAppointment,
    deleteAppointment,
};