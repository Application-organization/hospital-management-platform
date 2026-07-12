const { body } = require("express-validator");

/**
 * Validation Rules for Creating an Appointment
 */
const createAppointmentValidation = [
  body("patient")
    .notEmpty()
    .withMessage("Patient ID is required")
    .isMongoId()
    .withMessage("Invalid Patient ID"),

  body("doctor")
    .notEmpty()
    .withMessage("Doctor ID is required")
    .isMongoId()
    .withMessage("Invalid Doctor ID"),

  body("appointmentDate")
    .notEmpty()
    .withMessage("Appointment date is required")
    .isISO8601()
    .withMessage("Invalid appointment date"),

  body("appointmentTime")
    .trim()
    .notEmpty()
    .withMessage("Appointment time is required"),

  body("reason")
    .trim()
    .notEmpty()
    .withMessage("Reason is required")
    .isLength({ min: 5, max: 500 })
    .withMessage("Reason must be between 5 and 500 characters"),

  body("status")
    .optional()
    .isIn([
      "Scheduled",
      "Completed",
      "Cancelled",
    ])
    .withMessage("Invalid appointment status"),
];

/**
 * Validation Rules for Updating an Appointment
 */
const updateAppointmentValidation = [
  body("patient")
    .optional()
    .isMongoId()
    .withMessage("Invalid Patient ID"),

  body("doctor")
    .optional()
    .isMongoId()
    .withMessage("Invalid Doctor ID"),

  body("appointmentDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid appointment date"),

  body("appointmentTime")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Appointment time cannot be empty"),

  body("reason")
    .optional()
    .trim()
    .isLength({ min: 5, max: 500 })
    .withMessage("Reason must be between 5 and 500 characters"),

  body("status")
    .optional()
    .isIn([
      "Scheduled",
      "Completed",
      "Cancelled",
    ])
    .withMessage("Invalid appointment status"),
];

module.exports = {
  createAppointmentValidation,
  updateAppointmentValidation,
};