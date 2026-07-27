const Medication = require("../models/Medication");
const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");
const MedicalRecord = require("../models/MedicalRecord");

const ApiError = require("../utils/ApiError");

class MedicationService {

  /**
   * ===========================================
   * CREATE MEDICATION
   * ===========================================
   */
  async createMedication(data) {

    const patient = await Patient.findById(data.patient);

    if (!patient) {
      throw new ApiError("Patient not found", 404);
    }

    const doctor = await Doctor.findById(data.doctor);

    if (!doctor) {
      throw new ApiError("Doctor not found", 404);
    }

    const medicalRecord =
      await MedicalRecord.findById(data.medicalRecord);

    if (!medicalRecord) {
      throw new ApiError(
        "Medical record not found",
        404
      );
    }

    const medication =
      await Medication.create({

        patient: data.patient,

        doctor: data.doctor,

        medicalRecord: data.medicalRecord,

        medicationName: data.medicationName,

        genericName: data.genericName,

        dosage: data.dosage,

        frequency: data.frequency,

        duration: data.duration,

        route: data.route,

        quantity: data.quantity,

        refills: data.refills,

        instructions: data.instructions,

        notes: data.notes,

        status: data.status || "Prescribed",

      });

    return await Medication.findById(
      medication._id
    )
      .populate("patient")
      .populate("doctor")
      .populate("medicalRecord");

  }

  /**
   * ===========================================
   * GET ALL MEDICATIONS
   * ===========================================
   */
  async getAllMedications(filters = {}) {

    const query = {};

    if (filters.patient) {
      query.patient = filters.patient;
    }

    if (filters.doctor) {
      query.doctor = filters.doctor;
    }

    if (filters.medicalRecord) {
      query.medicalRecord = filters.medicalRecord;
    }

    if (filters.route) {
      query.route = filters.route;
    }

    if (filters.status) {
      query.status = filters.status;
    }

    if (filters.medicationName) {

      query.medicationName = {

        $regex: filters.medicationName,

        $options: "i",

      };

    }

    return await Medication.find(query)
      .populate("patient")
      .populate("doctor")
      .populate("medicalRecord")
      .sort({
        createdAt: -1,
      });

  }

  /**
   * ===========================================
   * GET MEDICATION BY ID
   * ===========================================
   */
  async getMedicationById(id) {

    const medication =
      await Medication.findById(id)
        .populate("patient")
        .populate("doctor")
        .populate("medicalRecord");

    if (!medication) {

      throw new ApiError(
        "Medication not found",
        404
      );

    }

    return medication;

  }

    /**
   * ===========================================
   * UPDATE MEDICATION
   * ===========================================
   */
  async updateMedication(id, data) {

    const medication =
      await Medication.findById(id);

    if (!medication) {

      throw new ApiError(
        "Medication not found",
        404
      );

    }

    if (data.patient) {

      const patient =
        await Patient.findById(data.patient);

      if (!patient) {

        throw new ApiError(
          "Patient not found",
          404
        );

      }

    }

    if (data.doctor) {

      const doctor =
        await Doctor.findById(data.doctor);

      if (!doctor) {

        throw new ApiError(
          "Doctor not found",
          404
        );

      }

    }

    if (data.medicalRecord) {

      const medicalRecord =
        await MedicalRecord.findById(
          data.medicalRecord
        );

      if (!medicalRecord) {

        throw new ApiError(
          "Medical record not found",
          404
        );

      }

    }

    const updatedMedication =
      await Medication.findByIdAndUpdate(
        id,
        data,
        {
          new: true,
          runValidators: true,
        }
      )
        .populate("patient")
        .populate("doctor")
        .populate("medicalRecord");

    return updatedMedication;

  }

  /**
   * ===========================================
   * UPDATE MEDICATION STATUS
   * ===========================================
   */
  async updateMedicationStatus(
    id,
    status
  ) {

    const medication =
      await Medication.findById(id);

    if (!medication) {

      throw new ApiError(
        "Medication not found",
        404
      );

    }

    medication.status = status;

    await medication.save();

    return await Medication.findById(id)
      .populate("patient")
      .populate("doctor")
      .populate("medicalRecord");

  }

  /**
   * ===========================================
   * DELETE MEDICATION
   * ===========================================
   */
  async deleteMedication(id) {

    const medication =
      await Medication.findById(id);

    if (!medication) {

      throw new ApiError(
        "Medication not found",
        404
      );

    }

    await Medication.findByIdAndDelete(id);

    return true;

  }

    /**
   * ===========================================
   * UPDATE MEDICATION
   * ===========================================
   */
  async updateMedication(id, data) {

    const medication =
      await Medication.findById(id);

    if (!medication) {

      throw new ApiError(
        "Medication not found",
        404
      );

    }

    if (data.patient) {

      const patient =
        await Patient.findById(data.patient);

      if (!patient) {

        throw new ApiError(
          "Patient not found",
          404
        );

      }

    }

    if (data.doctor) {

      const doctor =
        await Doctor.findById(data.doctor);

      if (!doctor) {

        throw new ApiError(
          "Doctor not found",
          404
        );

      }

    }

    if (data.medicalRecord) {

      const medicalRecord =
        await MedicalRecord.findById(
          data.medicalRecord
        );

      if (!medicalRecord) {

        throw new ApiError(
          "Medical record not found",
          404
        );

      }

    }

    const updatedMedication =
      await Medication.findByIdAndUpdate(
        id,
        data,
        {
          new: true,
          runValidators: true,
        }
      )
        .populate("patient")
        .populate("doctor")
        .populate("medicalRecord");

    return updatedMedication;

  }

  /**
   * ===========================================
   * UPDATE MEDICATION STATUS
   * ===========================================
   */
  async updateMedicationStatus(
    id,
    status
  ) {

    const medication =
      await Medication.findById(id);

    if (!medication) {

      throw new ApiError(
        "Medication not found",
        404
      );

    }

    medication.status = status;

    await medication.save();

    return await Medication.findById(id)
      .populate("patient")
      .populate("doctor")
      .populate("medicalRecord");

  }

  /**
   * ===========================================
   * DELETE MEDICATION
   * ===========================================
   */
  async deleteMedication(id) {

    const medication =
      await Medication.findById(id);

    if (!medication) {

      throw new ApiError(
        "Medication not found",
        404
      );

    }

    await Medication.findByIdAndDelete(id);

    return true;

  }

    /**
   * ===========================================
   * GET MEDICATION STATISTICS
   * ===========================================
   */
async getMedicationStatistics() {

  const totalMedications =
    await Medication.countDocuments();

  const prescribed =
    await Medication.countDocuments({
      status: "Prescribed",
    });

  const dispensed =
    await Medication.countDocuments({
      status: "Dispensed",
    });

  const completed =
    await Medication.countDocuments({
      status: "Completed",
    });

  const cancelled =
    await Medication.countDocuments({
      status: "Cancelled",
    });

  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const todayMedications =
    await Medication.countDocuments({
      createdAt: {
        $gte: today,
      },
    });

  return {

    totalMedications,

    prescribed,

    dispensed,

    completed,

    cancelled,

    todayMedications,

  };

}

  /**
 * ===========================================
 * GET PATIENT MEDICATION HISTORY
 * ===========================================
 */
async getPatientMedicationHistory(patientId) {

  const patient = await Patient.findById(patientId);

  if (!patient) {
    throw new ApiError(
      "Patient not found",
      404
    );
  }

  return await Medication.find({
    patient: patientId,
  })
    .populate("patient")
    .populate("doctor")
    .populate("medicalRecord")
    .sort({
      prescribedDate: -1,
    });

}

}

module.exports = new MedicationService();