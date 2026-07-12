const { body } = require("express-validator");

/**
 * Validation Rules for Creating a Patient
 */
const createPatientValidation = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("First name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("First name must be between 2 and 50 characters"),

  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("Last name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Last name must be between 2 and 50 characters"),

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

  body("gender")
    .notEmpty()
    .withMessage("Gender is required")
    .isIn(["male", "female", "other"])
    .withMessage("Gender must be male, female or other"),

  body("dateOfBirth")
    .notEmpty()
    .withMessage("Date of birth is required")
    .isISO8601()
    .withMessage("Invalid date format"),

  body("bloodGroup")
    .notEmpty()
    .withMessage("Blood group is required")
    .isIn([
      "A+",
      "A-",
      "B+",
      "B-",
      "AB+",
      "AB-",
      "O+",
      "O-",
    ])
    .withMessage("Invalid blood group"),

  body("address")
    .trim()
    .notEmpty()
    .withMessage("Address is required")
    .isLength({ min: 5, max: 255 })
    .withMessage("Address must be between 5 and 255 characters"),

  body("emergencyContactName")
    .trim()
    .notEmpty()
    .withMessage("Emergency contact name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Emergency contact name must be between 2 and 100 characters"),

  body("emergencyContactPhone")
    .trim()
    .notEmpty()
    .withMessage("Emergency contact phone is required")
    .isLength({ min: 10, max: 20 })
    .withMessage("Emergency contact phone must be between 10 and 20 characters"),
];

/**
 * Validation Rules for Updating a Patient
 */
const updatePatientValidation = [
  body("firstName")
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("First name must be between 2 and 50 characters"),

  body("lastName")
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Last name must be between 2 and 50 characters"),

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

  body("gender")
    .optional()
    .isIn(["male", "female", "other"])
    .withMessage("Gender must be male, female or other"),

  body("dateOfBirth")
    .optional()
    .isISO8601()
    .withMessage("Invalid date format"),

  body("bloodGroup")
    .optional()
    .isIn([
      "A+",
      "A-",
      "B+",
      "B-",
      "AB+",
      "AB-",
      "O+",
      "O-",
    ])
    .withMessage("Invalid blood group"),

  body("address")
    .optional()
    .trim()
    .isLength({ min: 5, max: 255 })
    .withMessage("Address must be between 5 and 255 characters"),

  body("emergencyContactName")
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Emergency contact name must be between 2 and 100 characters"),

  body("emergencyContactPhone")
    .optional()
    .trim()
    .isLength({ min: 10, max: 20 })
    .withMessage("Emergency contact phone must be between 10 and 20 characters"),
];

module.exports = {
  createPatientValidation,
  updatePatientValidation,
};