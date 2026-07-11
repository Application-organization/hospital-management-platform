const Patient = require("../models/Patient");
const ApiError = require("../utils/ApiError");

class PatientService {
  /**
   * Create Patient
   */
  async createPatient(patientData) {
    const existingPatient = await Patient.findOne({
      email: patientData.email,
    });

    if (existingPatient) {
      throw new ApiError(409, "Patient with this email already exists");
    }

    return await Patient.create(patientData);
  }

  /**
   * Get All Patients
   */
  async getAllPatients() {
    return await Patient.find({ isActive: true }).sort({
      createdAt: -1,
    });
  }

  /**
   * Get Patient By ID
   */
  async getPatientById(id) {
    const patient = await Patient.findById(id);

    if (!patient || !patient.isActive) {
      throw new ApiError(404, "Patient not found");
    }

    return patient;
  }

  /**
   * Update Patient
   */
  async updatePatient(id, updateData) {
    const patient = await Patient.findById(id);

    if (!patient || !patient.isActive) {
      throw new ApiError(404, "Patient not found");
    }

    if (
      updateData.email &&
      updateData.email !== patient.email
    ) {
      const emailExists = await Patient.findOne({
        email: updateData.email,
      });

      if (emailExists) {
        throw new ApiError(
          409,
          "Patient with this email already exists"
        );
      }
    }

    return await Patient.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );
  }

  /**
   * Soft Delete Patient
   */
  async deletePatient(id) {
    const patient = await Patient.findById(id);

    if (!patient || !patient.isActive) {
      throw new ApiError(404, "Patient not found");
    }

    patient.isActive = false;

    await patient.save();

    return patient;
  }
}

module.exports = new PatientService();