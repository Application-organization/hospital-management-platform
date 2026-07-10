const patientService = require("../services/patientService");
const ApiResponse = require("../utils/ApiResponse");

class PatientController {
  /**
   * Create Patient
   */
  async createPatient(req, res, next) {
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
  }

  /**
   * Get All Patients
   */
  async getAllPatients(req, res, next) {
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
  }

  /**
   * Get Patient By ID
   */
  async getPatientById(req, res, next) {
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
  }

  /**
   * Update Patient
   */
  async updatePatient(req, res, next) {
    try {
      const patient = await patientService.updatePatient(
        req.params.id,
        req.body
      );

      return ApiResponse.success(
        res,
        "Patient updated successfully",
        patient
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * Soft Delete Patient
   */
  async deletePatient(req, res, next) {
    try {
      await patientService.deletePatient(req.params.id);

      return ApiResponse.success(
        res,
        "Patient deleted successfully",
        null
      );
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PatientController();