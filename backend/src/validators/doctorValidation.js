const { body } = require("express-validator");

/**
 * Validation Rules for Creating a Doctor
 */
const createDoctorValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Doctor name is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Doctor name must be between 3 and 100 characters"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email address")
    .normalizeEmail(),

  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required")
    .isLength({ min: 10, max: 20 })
    .withMessage("Phone number must be between 10 and 20 characters"),

  body("department")
    .trim()
    .notEmpty()
    .withMessage("Department is required"),

  body("specialization")
    .trim()
    .notEmpty()
    .withMessage("Specialization is required"),

  body("experience")
    .notEmpty()
    .withMessage("Experience is required")
    .isInt({ min: 0 })
    .withMessage("Experience must be a positive number"),

  body("licenseNumber")
    .trim()
    .notEmpty()
    .withMessage("License number is required"),

  body("status")
    .optional()
    .isIn(["Active", "On Leave", "Inactive"])
    .withMessage("Invalid doctor status"),
];

/**
 * Validation Rules for Updating a Doctor
 */
const updateDoctorValidation = [
  body("name")
    .optional()
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage("Doctor name must be between 3 and 100 characters"),

  body("email")
    .optional()
    .trim()
    .isEmail()
    .withMessage("Please provide a valid email address")
    .normalizeEmail(),

  body("phone")
    .optional()
    .trim()
    .isLength({ min: 10, max: 20 })
    .withMessage("Phone number must be between 10 and 20 characters"),

  body("department")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Department cannot be empty"),

  body("specialization")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Specialization cannot be empty"),

  body("experience")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Experience must be a positive number"),

  body("licenseNumber")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("License number cannot be empty"),

  body("status")
    .optional()
    .isIn(["Active", "On Leave", "Inactive"])
    .withMessage("Invalid doctor status"),
];

module.exports = {
  createDoctorValidation,
  updateDoctorValidation,
};