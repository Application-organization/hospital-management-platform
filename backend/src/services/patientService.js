const Patient = require("../models/Patient");
const AppError = require("../errors/AppError");

const createPatient = async (patientData) => {
  const existingPatient = await Patient.findOne({
    email: patientData.email,
  });

  if (existingPatient) {
    throw new AppError("Patient with this email already exists", 409);
  }

  const patient = await Patient.create(patientData);

  return patient;
};

const getAllPatients = async () => {
  return await Patient.find().sort({
    createdAt: -1,
  });
};

const getPatientById = async (patientId) => {
  const patient = await Patient.findById(patientId);

  if (!patient) {
    throw new AppError("Patient not found", 404);
  }

  return patient;
};

module.exports = {
  createPatient,
  getAllPatients,
  getPatientById,
};