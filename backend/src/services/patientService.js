const Patient = require("../models/Patient");
const AppError = require("../errors/AppError");

class PatientService {
  /**
   * Create Patient
   */
  async createPatient(patientData) {
    const existingPatient = await Patient.findOne({
      email: patientData.email,
    });

    if (existingPatient) {
      throw new AppError("Patient with this email already exists", 409);
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
      throw new AppError("Patient not found", 404);
    }

    return patient;
  }

  /**
   * Update Patient
   */
  async updatePatient(id, updateData) {
    const patient = await Patient.findById(id);

    if (!patient || !patient.isActive) {
      throw new AppError("Patient not found", 404);
    }

    if (updateData.email && updateData.email !== patient.email) {
      const emailExists = await Patient.findOne({
        email: updateData.email,
      });

      if (emailExists) {
        throw new AppError("Patient with this email already exists", 409);
      }
    }

    return await Patient.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
  }

  /**
   * Soft Delete Patient
   */
  async deletePatient(id) {
    const patient = await Patient.findById(id);

    if (!patient || !patient.isActive) {
      throw new AppError("Patient not found", 404);
    }

    patient.isActive = false;

    await patient.save();

    return patient;
  }
}

module.exports = new PatientService();