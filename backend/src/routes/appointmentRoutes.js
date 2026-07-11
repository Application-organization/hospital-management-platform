const express = require("express");
const router = express.Router();

const {
    createAppointment,
    getAllAppointments,
    getAppointmentById,
    updateAppointment,
    deleteAppointment,
} = require("../controllers/appointmentController");

const authMiddleware = require("../middleware/authMiddleware");

// Create Appointment
router.post("/", authMiddleware, createAppointment);

// Get All Appointments
router.get("/", authMiddleware, getAllAppointments);

// Get Appointment By ID
router.get("/:id", authMiddleware, getAppointmentById);

// Update Appointment
router.put("/:id", authMiddleware, updateAppointment);

// Delete Appointment
router.delete("/:id", authMiddleware, deleteAppointment);

module.exports = router;