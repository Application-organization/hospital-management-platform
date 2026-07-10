const Joi = require("joi");

const patientFields = {
  firstName: Joi.string().trim().min(2).max(50),

  lastName: Joi.string().trim().min(2).max(50),

  email: Joi.string().trim().email(),

  phone: Joi.string().trim().min(10).max(20),

  gender: Joi.string().valid("male", "female"),

  dateOfBirth: Joi.date(),

  bloodGroup: Joi.string().valid(
    "A+",
    "A-",
    "B+",
    "B-",
    "AB+",
    "AB-",
    "O+",
    "O-"
  ),

  address: Joi.string().trim().min(5).max(255),

  emergencyContactName: Joi.string().trim().min(2).max(100),

  emergencyContactPhone: Joi.string().trim().min(10).max(20),
};

const createPatientSchema = Joi.object({
  ...patientFields,
  firstName: patientFields.firstName.required(),
  lastName: patientFields.lastName.required(),
  email: patientFields.email.required(),
  phone: patientFields.phone.required(),
  gender: patientFields.gender.required(),
  dateOfBirth: patientFields.dateOfBirth.required(),
  bloodGroup: patientFields.bloodGroup.required(),
  address: patientFields.address.required(),
  emergencyContactName: patientFields.emergencyContactName.required(),
  emergencyContactPhone: patientFields.emergencyContactPhone.required(),
});

const updatePatientSchema = Joi.object(patientFields).min(1);

module.exports = {
  createPatientSchema,
  updatePatientSchema,
};