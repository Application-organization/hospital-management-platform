const Appointment = require("../models/Appointment");
const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");
const AppError = require("../errors/AppError");

class AppointmentService {
  /**
   * Create Appointment
   */
  async createAppointment(appointmentData) {
    const patient = await Patient.findById(appointmentData.patient);

    if (!patient || !patient.isActive) {
      throw new AppError("Patient not found", 404);
    }

    const doctor = await Doctor.findById(appointmentData.doctor);

    if (!doctor) {
      throw new AppError("Doctor not found", 404);
    }

    const appointment = await Appointment.create(appointmentData);

    return await Appointment.findById(appointment._id)
      .populate("patient")
      .populate("doctor");
  }

  /**
   * Get All Appointments
   */
  async getAllAppointments() {
    return await Appointment.find()
      .populate("patient")
      .populate("doctor")
      .sort({ appointmentDate: 1 });
  }

  /**
   * Get Appointment By ID
   */
  async getAppointmentById(id) {
    const appointment = await Appointment.findById(id)
      .populate("patient")
      .populate("doctor");

    if (!appointment) {
      throw new AppError("Appointment not found", 404);
    }

    return appointment;
  }

  /**
   * Update Appointment
   */
  async updateAppointment(id, appointmentData) {
    const appointment = await Appointment.findById(id);

    if (!appointment) {
      throw new AppError("Appointment not found", 404);
    }

    if (appointmentData.patient) {
      const patient = await Patient.findById(appointmentData.patient);

      if (!patient || !patient.isActive) {
        throw new AppError("Patient not found", 404);
      }
    }

    if (appointmentData.doctor) {
      const doctor = await Doctor.findById(appointmentData.doctor);

      if (!doctor) {
        throw new AppError("Doctor not found", 404);
      }
    }

    return await Appointment.findByIdAndUpdate(
      id,
      appointmentData,
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("patient")
      .populate("doctor");
  }

  /**
   * Delete Appointment
   */
  async deleteAppointment(id) {
    const appointment = await Appointment.findById(id);

    if (!appointment) {
      throw new AppError("Appointment not found", 404);
    }

    await appointment.deleteOne();

    return appointment;
  }
}

module.exports = new AppointmentService();