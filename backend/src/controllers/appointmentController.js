const appointmentService = require("../services/appointmentService");
const ApiResponse = require("../utils/ApiResponse");

class AppointmentController {
  /**
   * Create Appointment
   */
  async createAppointment(req, res, next) {
    try {
      const appointment = await appointmentService.createAppointment(req.body);

      return ApiResponse.success(
        res,
        "Appointment created successfully",
        appointment,
        201
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get All Appointments
   */
  async getAllAppointments(req, res, next) {
    try {
      const appointments = await appointmentService.getAllAppointments();

      return ApiResponse.success(
        res,
        "Appointments retrieved successfully",
        appointments
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get Appointment By ID
   */
  async getAppointmentById(req, res, next) {
    try {
      const appointment = await appointmentService.getAppointmentById(
        req.params.id
      );

      return ApiResponse.success(
        res,
        "Appointment retrieved successfully",
        appointment
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update Appointment
   */
  async updateAppointment(req, res, next) {
    try {
      const appointment = await appointmentService.updateAppointment(
        req.params.id,
        req.body
      );

      return ApiResponse.success(
        res,
        "Appointment updated successfully",
        appointment
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete Appointment
   */
  async deleteAppointment(req, res, next) {
    try {
      await appointmentService.deleteAppointment(req.params.id);

      return ApiResponse.success(
        res,
        "Appointment deleted successfully",
        null
      );
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AppointmentController();