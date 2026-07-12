const appointmentService = require("../services/appointmentService");

class AppointmentController {
  /**
   * Create Appointment
   */
  async createAppointment(req, res, next) {
    try {
      const appointment = await appointmentService.createAppointment(req.body);

      res.status(201).json({
        success: true,
        message: "Appointment created successfully",
        data: appointment,
      });
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

      res.status(200).json({
        success: true,
        data: appointments,
      });
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

      res.status(200).json({
        success: true,
        data: appointment,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update Appointment Details
   * Status updates are NOT allowed here.
   */
  async updateAppointment(req, res, next) {
    try {
      // Create a copy of the request body
      const updateData = { ...req.body };

      // Prevent protected fields from being updated
      delete updateData.status;
      delete updateData.endTime;

      const appointment = await appointmentService.updateAppointment(
        req.params.id,
        updateData
      );

      res.status(200).json({
        success: true,
        message: "Appointment updated successfully",
        data: appointment,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update Appointment Status
   */
  async updateAppointmentStatus(req, res, next) {
    try {
      const appointment =
        await appointmentService.updateAppointmentStatus(
          req.params.id,
          req.body.status
        );

      res.status(200).json({
        success: true,
        message: "Appointment status updated successfully",
        data: appointment,
      });
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

      res.status(200).json({
        success: true,
        message: "Appointment deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AppointmentController();