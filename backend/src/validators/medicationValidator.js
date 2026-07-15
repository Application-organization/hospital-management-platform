const { body } = require("express-validator");

/**
 * ===========================================
 * CREATE MEDICATION VALIDATION
 * ===========================================
 */
const createMedicationValidation = [

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

  body("medicationName")
    .trim()
    .notEmpty()
    .withMessage("Medication name is required")
    .isLength({
      min: 2,
      max: 200,
    })
    .withMessage(
      "Medication name must be between 2 and 200 characters"
    ),

  body("genericName")
    .optional()
    .trim()
    .isLength({
      max: 200,
    })
    .withMessage(
      "Generic name cannot exceed 200 characters"
    ),

  body("dosage")
    .trim()
    .notEmpty()
    .withMessage("Dosage is required")
    .isLength({
      max: 100,
    })
    .withMessage(
      "Dosage cannot exceed 100 characters"
    ),

  body("frequency")
    .trim()
    .notEmpty()
    .withMessage("Frequency is required")
    .isLength({
      max: 100,
    })
    .withMessage(
      "Frequency cannot exceed 100 characters"
    ),

  body("duration")
    .trim()
    .notEmpty()
    .withMessage("Duration is required")
    .isLength({
      max: 100,
    })
    .withMessage(
      "Duration cannot exceed 100 characters"
    ),

  body("route")
    .optional()
    .isIn([
      "Oral",
      "Intravenous",
      "Intramuscular",
      "Subcutaneous",
      "Topical",
      "Inhalation",
      "Rectal",
      "Ophthalmic",
      "Otic",
      "Nasal",
      "Other",
    ])
    .withMessage("Invalid medication route"),

  body("instructions")
    .optional()
    .trim()
    .isLength({
      max: 2000,
    })
    .withMessage(
      "Instructions cannot exceed 2000 characters"
    ),

  body("quantity")
    .notEmpty()
    .withMessage("Quantity is required")
    .isInt({
      min: 1,
    })
    .withMessage(
      "Quantity must be greater than 0"
    ),

  body("refills")
    .optional()
    .isInt({
      min: 0,
    })
    .withMessage(
      "Refills cannot be negative"
    ),

  body("prescribedDate")
    .optional()
    .isISO8601()
    .withMessage(
      "Prescribed date must be a valid date"
    ),

  body("startDate")
    .optional()
    .isISO8601()
    .withMessage(
      "Start date must be a valid date"
    ),

  body("endDate")
    .optional()
    .isISO8601()
    .withMessage(
      "End date must be a valid date"
    ),

  body("status")
    .optional()
    .isIn([
      "Prescribed",
      "Dispensed",
      "Completed",
      "Cancelled",
    ])
    .withMessage(
      "Invalid medication status"
    ),

  body("notes")
    .optional()
    .trim()
    .isLength({
      max: 3000,
    })
    .withMessage(
      "Notes cannot exceed 3000 characters"
    ),

];

/**
 * ===========================================
 * UPDATE MEDICATION VALIDATION
 * ===========================================
 */
const updateMedicationValidation = [

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

  body("medicationName")
    .optional()
    .trim()
    .isLength({
      min: 2,
      max: 200,
    })
    .withMessage(
      "Medication name must be between 2 and 200 characters"
    ),

  body("genericName")
    .optional()
    .trim()
    .isLength({
      max: 200,
    })
    .withMessage(
      "Generic name cannot exceed 200 characters"
    ),

  body("dosage")
    .optional()
    .trim()
    .isLength({
      max: 100,
    })
    .withMessage(
      "Dosage cannot exceed 100 characters"
    ),

  body("frequency")
    .optional()
    .trim()
    .isLength({
      max: 100,
    })
    .withMessage(
      "Frequency cannot exceed 100 characters"
    ),

  body("duration")
    .optional()
    .trim()
    .isLength({
      max: 100,
    })
    .withMessage(
      "Duration cannot exceed 100 characters"
    ),

  body("route")
    .optional()
    .isIn([
      "Oral",
      "Intravenous",
      "Intramuscular",
      "Subcutaneous",
      "Topical",
      "Inhalation",
      "Rectal",
      "Ophthalmic",
      "Otic",
      "Nasal",
      "Other",
    ])
    .withMessage("Invalid medication route"),

  body("instructions")
    .optional()
    .trim()
    .isLength({
      max: 2000,
    })
    .withMessage(
      "Instructions cannot exceed 2000 characters"
    ),

  body("quantity")
    .optional()
    .isInt({
      min: 1,
    })
    .withMessage(
      "Quantity must be greater than 0"
    ),

  body("refills")
    .optional()
    .isInt({
      min: 0,
    })
    .withMessage(
      "Refills cannot be negative"
    ),

  body("prescribedDate")
    .optional()
    .isISO8601()
    .withMessage(
      "Prescribed date must be valid"
    ),

  body("startDate")
    .optional()
    .isISO8601()
    .withMessage(
      "Start date must be valid"
    ),

  body("endDate")
    .optional()
    .isISO8601()
    .withMessage(
      "End date must be valid"
    ),

  body("status")
    .optional()
    .isIn([
      "Prescribed",
      "Dispensed",
      "Completed",
      "Cancelled",
    ])
    .withMessage(
      "Invalid medication status"
    ),

  body("notes")
    .optional()
    .trim()
    .isLength({
      max: 3000,
    })
    .withMessage(
      "Notes cannot exceed 3000 characters"
    ),

];

module.exports = {

  createMedicationValidation,

  updateMedicationValidation,

};