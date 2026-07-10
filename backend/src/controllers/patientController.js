const patientService = require("../services/patientService");
const ApiResponse = require("../utils/ApiResponse");

const createPatient = async (req, res, next) => {
  try {
    const patient = await patientService.createPatient(req.body);

    return ApiResponse.success(
      res,
      "Patient created successfully",
      patient,
      201
    );
  } catch (error) {
    next(error);
  }
};

const getAllPatients = async (req, res, next) => {
  try {
    const patients = await patientService.getAllPatients();

    return ApiResponse.success(
      res,
      "Patients retrieved successfully",
      patients
    );
  } catch (error) {
    next(error);
  }
};

const getPatientById = async (req, res, next) => {
  try {
    const patient = await patientService.getPatientById(req.params.id);

    return ApiResponse.success(
      res,
      "Patient retrieved successfully",
      patient
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPatient,
  getAllPatients,
  getPatientById,
};