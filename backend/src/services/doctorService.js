const Doctor = require("../models/Doctor");
const AppError = require("../errors/AppError");

class DoctorService {
  /**
   * Create Doctor
   */
  async createDoctor(doctorData) {
    const emailExists = await Doctor.findOne({
      email: doctorData.email,
    });

    if (emailExists) {
      throw new AppError(
        "Doctor with this email already exists",
        409
      );
    }

    const licenseExists = await Doctor.findOne({
      licenseNumber: doctorData.licenseNumber,
    });

    if (licenseExists) {
      throw new AppError(
        "License number already exists",
        409
      );
    }

    return await Doctor.create(doctorData);
  }

  /**
   * Get All Doctors
   */
  async getAllDoctors() {
    return await Doctor.find().sort({
      createdAt: -1,
    });
  }

  /**
   * Get Doctor By ID
   */
  async getDoctorById(id) {
    const doctor = await Doctor.findById(id);

    if (!doctor) {
      throw new AppError("Doctor not found", 404);
    }

    return doctor;
  }

  /**
   * Update Doctor
   */
  async updateDoctor(id, updateData) {
    const doctor = await Doctor.findById(id);

    if (!doctor) {
      throw new AppError("Doctor not found", 404);
    }

    if (
      updateData.email &&
      updateData.email !== doctor.email
    ) {
      const emailExists = await Doctor.findOne({
        email: updateData.email,
      });

      if (emailExists) {
        throw new AppError(
          "Doctor with this email already exists",
          409
        );
      }
    }

    if (
      updateData.licenseNumber &&
      updateData.licenseNumber !== doctor.licenseNumber
    ) {
      const licenseExists = await Doctor.findOne({
        licenseNumber: updateData.licenseNumber,
      });

      if (licenseExists) {
        throw new AppError(
          "License number already exists",
          409
        );
      }
    }

    return await Doctor.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );
  }

  /**
   * Delete Doctor
   */
  async deleteDoctor(id) {
    const doctor = await Doctor.findById(id);

    if (!doctor) {
      throw new AppError("Doctor not found", 404);
    }

    await doctor.deleteOne();

    return doctor;
  }
}

module.exports = new DoctorService();