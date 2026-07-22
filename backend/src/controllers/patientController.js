const patientService = require("../services/patientService");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../middleware/asyncHandler");

class PatientController {
  /**
   * Create Patient
   */
  createPatient = asyncHandler(async (req, res) => {
    const patient = await patientService.createPatient(req.body);

    return ApiResponse.success(
      res,
      "Patient created successfully",
      patient,
      201
    );
  });

  /**
   * Get All Patients
   */
  getAllPatients = asyncHandler(async (req, res) => {
    const patients = await patientService.getAllPatients(
      req.query
    );

    return ApiResponse.success(
      res,
      "Patients retrieved successfully",
      patients
    );
  });

  /**
   * Get Patient By ID
   */
  getPatientById = asyncHandler(async (req, res) => {
    const patient = await patientService.getPatientById(
      req.params.id
    );

    return ApiResponse.success(
      res,
      "Patient retrieved successfully",
      patient
    );
  });

  /**
   * Update Patient
   */
  updatePatient = asyncHandler(async (req, res) => {
    const patient = await patientService.updatePatient(
      req.params.id,
      req.body
    );

    return ApiResponse.success(
      res,
      "Patient updated successfully",
      patient
    );
  });

  /**
   * Soft Delete Patient
   */
  deletePatient = asyncHandler(async (req, res) => {
    await patientService.deletePatient(req.params.id);

    return ApiResponse.success(
      res,
      "Patient deleted successfully",
      null
    );
  });
}

module.exports = new PatientController();