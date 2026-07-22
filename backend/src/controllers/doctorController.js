const doctorService = require("../services/doctorService");
const ApiResponse = require("../utils/ApiResponse");

class DoctorController {
  /**
   * Create Doctor
   */
  async createDoctor(req, res, next) {
    try {
      const doctor = await doctorService.createDoctor(req.body);

      return ApiResponse.success(
        res,
        "Doctor created successfully",
        doctor,
        201
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get All Doctors
   */
  async getAllDoctors(req, res, next) {
    try {
      const doctors = await doctorService.getAllDoctors(req.query);

      return ApiResponse.success(
        res,
        "Doctors retrieved successfully",
        doctors
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get Doctor By ID
   */
  async getDoctorById(req, res, next) {
    try {
      const doctor = await doctorService.getDoctorById(req.params.id);

      return ApiResponse.success(
        res,
        "Doctor retrieved successfully",
        doctor
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update Doctor
   */
  async updateDoctor(req, res, next) {
    try {
      const doctor = await doctorService.updateDoctor(
        req.params.id,
        req.body
      );

      return ApiResponse.success(
        res,
        "Doctor updated successfully",
        doctor
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete Doctor
   */
  async deleteDoctor(req, res, next) {
    try {
      await doctorService.deleteDoctor(req.params.id);

      return ApiResponse.success(
        res,
        "Doctor deleted successfully",
        null
      );
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new DoctorController();