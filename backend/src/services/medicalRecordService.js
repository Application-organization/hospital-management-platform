const MedicalRecord = require("../models/MedicalRecord");
const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");
const AppError = require("../errors/AppError");

class MedicalRecordService {

  /**
   * Calculate BMI
   * Formula:
   * BMI = weight(kg) / (height(m) × height(m))
   */
  calculateBMI(weight, height) {

    if (!weight || !height) {
      return null;
    }

    const heightInMeters = height / 100;

    const bmi =
      weight /
      (heightInMeters * heightInMeters);

    return Number(
      bmi.toFixed(2)
    );

  }


  /**
   * Validate Follow-up Date
   */
  validateFollowUpDate(
    visitDate,
    followUpDate
  ) {

    if (!followUpDate) {
      return;
    }

    const visit =
      new Date(visitDate);

    const followUp =
      new Date(followUpDate);

    if (followUp < visit) {

      throw new AppError(
        "Follow-up date cannot be earlier than visit date",
        400
      );

    }

  }


  /**
   * Validate Patient
   */
  async validatePatient(patientId) {

    const patient =
      await Patient.findById(
        patientId
      );

    if (!patient) {

      throw new AppError(
        "Patient not found",
        404
      );

    }

    if (!patient.isActive) {

      throw new AppError(
        "Patient is inactive",
        400
      );

    }

    return patient;

  }


  /**
   * Validate Doctor
   */
  async validateDoctor(doctorId) {

    const doctor =
      await Doctor.findById(
        doctorId
      );

    if (!doctor) {

      throw new AppError(
        "Doctor not found",
        404
      );

    }

    if (
      doctor.status !== "Active"
    ) {

      throw new AppError(
        "Doctor is not active",
        400
      );

    }

    return doctor;

  }


  /**
   * Create Medical Record
   */
  async createMedicalRecord(
    medicalRecordData
  ) {

    await this.validatePatient(
      medicalRecordData.patient
    );

    await this.validateDoctor(
      medicalRecordData.doctor
    );

    const visitDate =
      medicalRecordData.visitDate ||
      new Date();

    this.validateFollowUpDate(
      visitDate,
      medicalRecordData.followUpDate
    );

    if (
      medicalRecordData.vitalSigns &&
      medicalRecordData.vitalSigns.weight &&
      medicalRecordData.vitalSigns.height
    ) {

      medicalRecordData.vitalSigns.bmi =
        this.calculateBMI(
          medicalRecordData.vitalSigns.weight,
          medicalRecordData.vitalSigns.height
        );

    }

    const medicalRecord =
      await MedicalRecord.create(
        medicalRecordData
      );

    return await MedicalRecord.findById(
      medicalRecord._id
    )
      .populate("patient")
      .populate("doctor");

  }

    /**
   * Create Medical Record
   */
  async createMedicalRecord(
    medicalRecordData
  ) {

    await this.validatePatient(
      medicalRecordData.patient
    );

    await this.validateDoctor(
      medicalRecordData.doctor
    );

    const visitDate =
      medicalRecordData.visitDate ||
      new Date();

    this.validateFollowUpDate(
      visitDate,
      medicalRecordData.followUpDate
    );

    if (
      medicalRecordData.vitalSigns &&
      medicalRecordData.vitalSigns.weight &&
      medicalRecordData.vitalSigns.height
    ) {

      medicalRecordData.vitalSigns.bmi =
        this.calculateBMI(
          medicalRecordData.vitalSigns.weight,
          medicalRecordData.vitalSigns.height
        );

    }

    const medicalRecord =
      await MedicalRecord.create(
        medicalRecordData
      );

    return await MedicalRecord.findById(
      medicalRecord._id
    )
      .populate("patient")
      .populate("doctor");

  }


  /**
   * Get All Medical Records
   */
  async getAllMedicalRecords(
    query
  ) {

    const page =
      Number(query.page) || 1;

    const limit =
      Number(query.limit) || 10;

    const skip =
      (page - 1) * limit;

    const filter = {};

    if (query.patient) {
      filter.patient =
        query.patient;
    }

    if (query.doctor) {
      filter.doctor =
        query.doctor;
    }

    if (query.status) {
      filter.status =
        query.status;
    }

    if (query.diagnosis) {

      filter.diagnosis = {
        $regex:
          query.diagnosis,
        $options: "i",
      };

    }

    if (
      query.startDate ||
      query.endDate
    ) {

      filter.visitDate = {};

      if (query.startDate) {

        filter.visitDate.$gte =
          new Date(
            query.startDate
          );

      }

      if (query.endDate) {

        filter.visitDate.$lte =
          new Date(
            query.endDate
          );

      }

    }

    const records =
      await MedicalRecord.find(
        filter
      )
        .populate("patient")
        .populate("doctor")
        .sort({
          visitDate: -1,
        })
        .skip(skip)
        .limit(limit);

    const total =
      await MedicalRecord.countDocuments(
        filter
      );

    return {

      records,

      pagination: {

        total,

        page,

        limit,

        totalPages:
          Math.ceil(
            total / limit
          ),

      },

    };

  }


  /**
   * Get Medical Record By ID
   */
  async getMedicalRecordById(
    id
  ) {

    const medicalRecord =
      await MedicalRecord.findById(
        id
      )
        .populate("patient")
        .populate("doctor");

    if (!medicalRecord) {

      throw new AppError(
        "Medical record not found",
        404
      );

    }

    return medicalRecord;

  }


  /**
   * Get Patient Medical History
   */
  async getPatientMedicalHistory(
    patientId
  ) {

    await this.validatePatient(
      patientId
    );

    return await MedicalRecord.find({

      patient: patientId,

    })
      .populate("doctor")
      .sort({
        visitDate: -1,
      });

  }


  /**
   * Get Doctor Medical Records
   */
  async getDoctorMedicalRecords(
    doctorId
  ) {

    await this.validateDoctor(
      doctorId
    );

    return await MedicalRecord.find({

      doctor: doctorId,

    })
      .populate("patient")
      .sort({
        visitDate: -1,
      });

  }

    /**
   * Update Medical Record
   */
  async updateMedicalRecord(
    id,
    updateData
  ) {

    const medicalRecord =
      await MedicalRecord.findById(
        id
      );

    if (!medicalRecord) {

      throw new AppError(
        "Medical record not found",
        404
      );

    }

    if (updateData.patient) {

      await this.validatePatient(
        updateData.patient
      );

    }

    if (updateData.doctor) {

      await this.validateDoctor(
        updateData.doctor
      );

    }

    const visitDate =
      updateData.visitDate ||
      medicalRecord.visitDate;

    this.validateFollowUpDate(
      visitDate,
      updateData.followUpDate ||
      medicalRecord.followUpDate
    );

    if (
      updateData.vitalSigns &&
      updateData.vitalSigns.weight &&
      updateData.vitalSigns.height
    ) {

      updateData.vitalSigns.bmi =
        this.calculateBMI(
          updateData.vitalSigns.weight,
          updateData.vitalSigns.height
        );

    }

    const updatedRecord =
      await MedicalRecord.findByIdAndUpdate(
        id,
        updateData,
        {
          new: true,
          runValidators: true,
        }
      )
        .populate("patient")
        .populate("doctor");

    return updatedRecord;

  }


  /**
   * Update Medical Record Status
   */
  async updateMedicalRecordStatus(
    id,
    status
  ) {

    const allowedStatuses = [

      "Open",
      "Closed",
      "Follow-up Required",

    ];

    if (
      !allowedStatuses.includes(
        status
      )
    ) {

      throw new AppError(
        "Invalid medical record status",
        400
      );

    }

    const medicalRecord =
      await MedicalRecord.findById(
        id
      );

    if (!medicalRecord) {

      throw new AppError(
        "Medical record not found",
        404
      );

    }

    medicalRecord.status =
      status;

    await medicalRecord.save();

    return await MedicalRecord.findById(
      id
    )
      .populate("patient")
      .populate("doctor");

  }


  /**
   * Delete Medical Record
   */
  async deleteMedicalRecord(
    id
  ) {

    const medicalRecord =
      await MedicalRecord.findById(
        id
      );

    if (!medicalRecord) {

      throw new AppError(
        "Medical record not found",
        404
      );

    }

    await MedicalRecord.findByIdAndDelete(
      id
    );

    return {

      message:
        "Medical record deleted successfully",

    };

  }


  /**
   * Get Medical Record Statistics
   */
  async getMedicalRecordStatistics() {

    const totalRecords =
      await MedicalRecord.countDocuments();

    const openRecords =
      await MedicalRecord.countDocuments({

        status: "Open",

      });

    const closedRecords =
      await MedicalRecord.countDocuments({

        status: "Closed",

      });

    const followUpRequired =
      await MedicalRecord.countDocuments({

        status:
          "Follow-up Required",

      });

    const today = new Date();

    today.setHours(
      0,
      0,
      0,
      0
    );

    const todayRecords =
      await MedicalRecord.countDocuments({

        visitDate: {

          $gte: today,

        },

      });

    return {

      totalRecords,

      openRecords,

      closedRecords,

      followUpRequired,

      todayRecords,

    };

  }

  }

module.exports = new MedicalRecordService();