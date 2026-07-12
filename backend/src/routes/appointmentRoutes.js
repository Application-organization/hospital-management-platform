const express = require("express");

const router = express.Router();

const appointmentController = require("../controllers/appointmentController");


// Create Appointment
router.post(
  "/",
  appointmentController.createAppointment
);


// Get All Appointments
router.get(
  "/",
  appointmentController.getAllAppointments
);


// Get Appointment By ID
router.get(
  "/:id",
  appointmentController.getAppointmentById
);


// Update Appointment
router.put(
  "/:id",
  appointmentController.updateAppointment
);


// Update Appointment Status
router.patch(
  "/:id/status",
  appointmentController.updateAppointmentStatus
);


// Delete Appointment
router.delete(
  "/:id",
  appointmentController.deleteAppointment
);


module.exports = router;