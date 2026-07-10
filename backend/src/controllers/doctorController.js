const doctorService = require("../services/doctorService");

// Create Doctor
const createDoctor = async (req, res) => {
    try {
        const doctor = await doctorService.createDoctor(req.body);

        res.status(201).json({
            success: true,
            message: "Doctor created successfully",
            data: doctor,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get All Doctors
const getAllDoctors = async (req, res) => {
    try {
        const doctors = await doctorService.getAllDoctors();

        res.status(200).json({
            success: true,
            message: "Doctors retrieved successfully",
            data: doctors,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get Doctor By ID
const getDoctorById = async (req, res) => {
    try {
        const doctor = await doctorService.getDoctorById(req.params.id);

        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Doctor retrieved successfully",
            data: doctor,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Update Doctor
const updateDoctor = async (req, res) => {
    try {
        const doctor = await doctorService.updateDoctor(req.params.id, req.body);

        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Doctor updated successfully",
            data: doctor,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Delete Doctor
const deleteDoctor = async (req, res) => {
    try {
        const doctor = await doctorService.deleteDoctor(req.params.id);

        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Doctor deleted successfully",
            data: null,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createDoctor,
    getAllDoctors,
    getDoctorById,
    updateDoctor,
    deleteDoctor,
};