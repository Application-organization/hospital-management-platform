const { body } = require("express-validator");

/**
 * ===========================================
 * CREATE LABORATORY TEST VALIDATION
 * ===========================================
 */
const createLaboratoryTestValidation = [

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

  body("medicalRecord")
    .notEmpty()
    .withMessage("Medical record is required")
    .isMongoId()
    .withMessage("Invalid medical record ID"),

  body("testName")
    .trim()
    .notEmpty()
    .withMessage("Test name is required")
    .isLength({
      min: 3,
      max: 200,
    })
    .withMessage(
      "Test name must be between 3 and 200 characters"
    ),

  body("category")
    .notEmpty()
    .withMessage("Category is required")
    .isIn([
      "Blood Test",
      "Urine Test",
      "X-Ray",
      "MRI",
      "CT Scan",
      "Ultrasound",
      "ECG",
      "COVID-19",
      "Others",
    ])
    .withMessage("Invalid laboratory test category"),

  body("priority")
    .optional()
    .isIn([
      "Routine",
      "Urgent",
      "Emergency",
    ])
    .withMessage("Invalid priority"),

  body("status")
    .optional()
    .isIn([
      "Requested",
      "Sample Collected",
      "Processing",
      "Completed",
      "Cancelled",
    ])
    .withMessage("Invalid laboratory status"),

  body("requestedDate")
    .optional()
    .isISO8601()
    .withMessage("Requested date must be valid"),

  body("sampleCollectedAt")
    .optional()
    .isISO8601()
    .withMessage("Sample collected date must be valid"),

  body("completedAt")
    .optional()
    .isISO8601()
    .withMessage("Completed date must be valid"),

  body("result")
    .optional()
    .trim()
    .isLength({
      max: 5000,
    })
    .withMessage(
      "Result cannot exceed 5000 characters"
    ),

  body("remarks")
    .optional()
    .trim()
    .isLength({
      max: 2000,
    })
    .withMessage(
      "Remarks cannot exceed 2000 characters"
    ),

];

/**
 * ===========================================
 * UPDATE LABORATORY TEST VALIDATION
 * ===========================================
 */
const updateLaboratoryTestValidation = [

  body("patient")
    .optional()
    .isMongoId()
    .withMessage("Invalid patient ID"),

  body("doctor")
    .optional()
    .isMongoId()
    .withMessage("Invalid doctor ID"),

  body("medicalRecord")
    .optional()
    .isMongoId()
    .withMessage("Invalid medical record ID"),

  body("testName")
    .optional()
    .trim()
    .isLength({
      min: 3,
      max: 200,
    })
    .withMessage(
      "Test name must be between 3 and 200 characters"
    ),

  body("category")
    .optional()
    .isIn([
      "Blood Test",
      "Urine Test",
      "X-Ray",
      "MRI",
      "CT Scan",
      "Ultrasound",
      "ECG",
      "COVID-19",
      "Others",
    ])
    .withMessage("Invalid laboratory category"),

  body("priority")
    .optional()
    .isIn([
      "Routine",
      "Urgent",
      "Emergency",
    ])
    .withMessage("Invalid priority"),

  body("status")
    .optional()
    .isIn([
      "Requested",
      "Sample Collected",
      "Processing",
      "Completed",
      "Cancelled",
    ])
    .withMessage("Invalid laboratory status"),

  body("requestedDate")
    .optional()
    .isISO8601()
    .withMessage("Requested date must be valid"),

  body("sampleCollectedAt")
    .optional()
    .isISO8601()
    .withMessage("Sample collected date must be valid"),

  body("completedAt")
    .optional()
    .isISO8601()
    .withMessage("Completed date must be valid"),

  body("result")
    .optional()
    .trim()
    .isLength({
      max: 5000,
    })
    .withMessage(
      "Result cannot exceed 5000 characters"
    ),

  body("remarks")
    .optional()
    .trim()
    .isLength({
      max: 2000,
    })
    .withMessage(
      "Remarks cannot exceed 2000 characters"
    ),

];

module.exports = {

  createLaboratoryTestValidation,

  updateLaboratoryTestValidation,

};