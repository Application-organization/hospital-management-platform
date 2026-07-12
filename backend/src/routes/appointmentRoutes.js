const express = require("express");

const router = express.Router();

const appointmentController = require("../controllers/appointmentController");

const authMiddleware = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorize");
const validateRequest = require("../middleware/validateRequest");

const {
  createAppointmentValidation,
  updateAppointmentValidation,
} = require("../validators/appointmentValidation");

/*
|--------------------------------------------------------------------------
| Create Appointment
|--------------------------------------------------------------------------
*/
router.post(
  "/",
  authMiddleware,
  authorize("admin", "doctor"),
  createAppointmentValidation,
  validateRequest,
  appointmentController.createAppointment
);

/*
|--------------------------------------------------------------------------
| Get All Appointments
|--------------------------------------------------------------------------
*/
router.get(
  "/",
  authMiddleware,
  authorize("admin", "doctor"),
  appointmentController.getAllAppointments
);

/*
|--------------------------------------------------------------------------
| Get Appointment By ID
|--------------------------------------------------------------------------
*/
router.get(
  "/:id",
  authMiddleware,
  authorize("admin", "doctor"),
  appointmentController.getAppointmentById
);

/*
|--------------------------------------------------------------------------
| Update Appointment
|--------------------------------------------------------------------------
*/
router.put(
  "/:id",
  authMiddleware,
  authorize("admin", "doctor"),
  updateAppointmentValidation,
  validateRequest,
  appointmentController.updateAppointment
);

/*
|--------------------------------------------------------------------------
| Delete Appointment
|--------------------------------------------------------------------------
*/
router.delete(
  "/:id",
  authMiddleware,
  authorize("admin"),
  appointmentController.deleteAppointment
);

module.exports = router;