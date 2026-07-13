const { body } = require("express-validator");

/**
 * ===========================================
 * CREATE MEDICAL RECORD VALIDATION
 * ===========================================
 */
const createMedicalRecordValidation = [

  body("patient")
    .notEmpty()
    .withMessage("Patient is required")
    .isMongoId()
    .withMessage("Invalid patient ID"),

  body("doctor")
    .notEmpty()
    .withMessage("Doctor is required")
    .isMongoId()
    .withMessage("Invalid doctor ID"),

  body("visitDate")
    .optional()
    .isISO8601()
    .withMessage("Visit date must be a valid date"),

  body("diagnosis")
    .trim()
    .notEmpty()
    .withMessage("Diagnosis is required")
    .isLength({
      min: 5,
      max: 500,
    })
    .withMessage(
      "Diagnosis must be between 5 and 500 characters"
    ),

  body("symptoms")
    .trim()
    .notEmpty()
    .withMessage("Symptoms are required")
    .isLength({
      min: 5,
      max: 1000,
    })
    .withMessage(
      "Symptoms must be between 5 and 1000 characters"
    ),

  body("treatment")
    .trim()
    .notEmpty()
    .withMessage("Treatment is required")
    .isLength({
      max: 1000,
    })
    .withMessage(
      "Treatment cannot exceed 1000 characters"
    ),

  body("prescription")
    .optional()
    .trim()
    .isLength({
      max: 1000,
    })
    .withMessage(
      "Prescription cannot exceed 1000 characters"
    ),

  body("allergies")
    .optional()
    .trim()
    .isLength({
      max: 500,
    })
    .withMessage(
      "Allergies cannot exceed 500 characters"
    ),

  body("vitalSigns.bloodPressure")
    .optional()
    .trim(),

  body("vitalSigns.heartRate")
    .optional()
    .isNumeric()
    .withMessage(
      "Heart rate must be a number"
    ),

  body("vitalSigns.temperature")
    .optional()
    .isFloat({
      min: 30,
      max: 45,
    })
    .withMessage(
      "Temperature must be between 30 and 45°C"
    ),

  body("vitalSigns.weight")
    .optional()
    .isFloat({
      min: 0,
    })
    .withMessage(
      "Weight must be greater than 0"
    ),

  body("vitalSigns.height")
    .optional()
    .isFloat({
      min: 0,
    })
    .withMessage(
      "Height must be greater than 0"
    ),

  body("labResults")
    .optional()
    .trim()
    .isLength({
      max: 3000,
    })
    .withMessage(
      "Lab results cannot exceed 3000 characters"
    ),

  body("clinicalNotes")
    .optional()
    .trim()
    .isLength({
      max: 3000,
    })
    .withMessage(
      "Clinical notes cannot exceed 3000 characters"
    ),

  body("followUpDate")
    .optional()
    .isISO8601()
    .withMessage(
      "Follow-up date must be a valid date"
    ),

  body("status")
    .optional()
    .isIn([
      "Open",
      "Closed",
      "Follow-up Required",
    ])
    .withMessage(
      "Invalid medical record status"
    ),

];

/**
 * ===========================================
 * UPDATE MEDICAL RECORD VALIDATION
 * ===========================================
 */
const updateMedicalRecordValidation = [

  body("patient")
    .optional()
    .isMongoId()
    .withMessage("Invalid patient ID"),

  body("doctor")
    .optional()
    .isMongoId()
    .withMessage("Invalid doctor ID"),

  body("visitDate")
    .optional()
    .isISO8601()
    .withMessage("Visit date must be valid"),

  body("diagnosis")
    .optional()
    .trim()
    .isLength({
      min: 5,
      max: 500,
    })
    .withMessage(
      "Diagnosis must be between 5 and 500 characters"
    ),

  body("symptoms")
    .optional()
    .trim()
    .isLength({
      min: 5,
      max: 1000,
    })
    .withMessage(
      "Symptoms must be between 5 and 1000 characters"
    ),

  body("treatment")
    .optional()
    .trim()
    .isLength({
      max: 1000,
    })
    .withMessage(
      "Treatment cannot exceed 1000 characters"
    ),

  body("prescription")
    .optional()
    .trim()
    .isLength({
      max: 1000,
    })
    .withMessage(
      "Prescription cannot exceed 1000 characters"
    ),

  body("allergies")
    .optional()
    .trim()
    .isLength({
      max: 500,
    })
    .withMessage(
      "Allergies cannot exceed 500 characters"
    ),

  body("vitalSigns.heartRate")
    .optional()
    .isNumeric()
    .withMessage(
      "Heart rate must be numeric"
    ),

  body("vitalSigns.temperature")
    .optional()
    .isFloat({
      min: 30,
      max: 45,
    })
    .withMessage(
      "Temperature must be between 30 and 45°C"
    ),

  body("vitalSigns.weight")
    .optional()
    .isFloat({
      min: 0,
    })
    .withMessage(
      "Weight must be greater than 0"
    ),

  body("vitalSigns.height")
    .optional()
    .isFloat({
      min: 0,
    })
    .withMessage(
      "Height must be greater than 0"
    ),

  body("labResults")
    .optional()
    .trim()
    .isLength({
      max: 3000,
    })
    .withMessage(
      "Lab results cannot exceed 3000 characters"
    ),

  body("clinicalNotes")
    .optional()
    .trim()
    .isLength({
      max: 3000,
    })
    .withMessage(
      "Clinical notes cannot exceed 3000 characters"
    ),

  body("followUpDate")
    .optional()
    .isISO8601()
    .withMessage(
      "Follow-up date must be valid"
    ),

  body("status")
    .optional()
    .isIn([
      "Open",
      "Closed",
      "Follow-up Required",
    ])
    .withMessage(
      "Invalid medical record status"
    ),

];

/**
 * ===========================================
 * UPDATE MEDICAL RECORD STATUS VALIDATION
 * ===========================================
 */

const updateMedicalRecordStatusValidation = [

  body("status")
    .notEmpty()
    .withMessage("Status is required")
    .isIn([
      "Open",
      "Closed",
      "Follow-up Required",
    ])
    .withMessage(
      "Invalid medical record status"
    ),

];

module.exports = {

  createMedicalRecordValidation,

  updateMedicalRecordValidation,

  updateMedicalRecordStatusValidation,

};