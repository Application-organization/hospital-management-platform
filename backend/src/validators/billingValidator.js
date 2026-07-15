const { body } = require("express-validator");

const createBillingValidation = [

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

  body("consultationFee")
    .notEmpty()
    .withMessage("Consultation fee is required")
    .isFloat({ min: 0 })
    .withMessage("Consultation fee must be a positive number"),

  body("laboratoryFee")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Laboratory fee must be a positive number"),

  body("medicationFee")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Medication fee must be a positive number"),

  body("otherCharges")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Other charges must be a positive number"),

  body("discount")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Discount must be a positive number"),

  body("tax")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Tax must be a positive number"),

  body("paymentMethod")
    .optional()
    .isIn([
      "Cash",
      "Card",
      "Bank Transfer",
      "Insurance",
      "Mobile Payment",
    ])
    .withMessage("Invalid payment method"),

  body("paymentStatus")
    .optional()
    .isIn([
      "Pending",
      "Partially Paid",
      "Paid",
      "Refunded",
    ])
    .withMessage("Invalid payment status"),

];

const updateBillingValidation = [

  body("consultationFee")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Consultation fee must be a positive number"),

  body("laboratoryFee")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Laboratory fee must be a positive number"),

  body("medicationFee")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Medication fee must be a positive number"),

  body("otherCharges")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Other charges must be a positive number"),

  body("discount")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Discount must be a positive number"),

  body("tax")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Tax must be a positive number"),

  body("amountPaid")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Amount paid must be a positive number"),

  body("paymentMethod")
    .optional()
    .isIn([
      "Cash",
      "Card",
      "Bank Transfer",
      "Insurance",
      "Mobile Payment",
    ])
    .withMessage("Invalid payment method"),

  body("paymentStatus")
    .optional()
    .isIn([
      "Pending",
      "Partially Paid",
      "Paid",
      "Refunded",
    ])
    .withMessage("Invalid payment status"),

];

module.exports = {

  createBillingValidation,

  updateBillingValidation,

};