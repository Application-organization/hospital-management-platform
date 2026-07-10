const Joi = require("joi");

const createPatientSchema = Joi.object({
  firstName: Joi.string().trim().min(2).max(50).required(),

  lastName: Joi.string().trim().min(2).max(50).required(),

  email: Joi.string().trim().email().required(),

  phone: Joi.string().trim().min(10).max(20).required(),

  gender: Joi.string()
    .valid("male", "female")
    .required(),

  dateOfBirth: Joi.date().required(),

  bloodGroup: Joi.string()
    .valid(
      "A+",
      "A-",
      "B+",
      "B-",
      "AB+",
      "AB-",
      "O+",
      "O-"
    )
    .required(),

  address: Joi.string().trim().min(5).max(255).required(),

  emergencyContactName: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .required(),

  emergencyContactPhone: Joi.string()
    .trim()
    .min(10)
    .max(20)
    .required(),
});

module.exports = {
  createPatientSchema,
};