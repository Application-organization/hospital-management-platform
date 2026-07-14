const LaboratoryTest = require("../models/LaboratoryTest");
const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");
const MedicalRecord = require("../models/MedicalRecord");
const AppError = require("../errors/AppError");

class LaboratoryTestService {

  /**
   * ===========================================
   * VALIDATION METHODS
   * ===========================================
   */

  /**
   * Validate Patient
   */
  async validatePatient(patientId) {

    const patient = await Patient.findById(patientId);

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

    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      throw new AppError(
        "Doctor not found",
        404
      );
    }

    if (doctor.status !== "Active") {
      throw new AppError(
        "Doctor is not active",
        400
      );
    }

    return doctor;

  }


  /**
   * Validate Medical Record
   */
  async validateMedicalRecord(
    medicalRecordId
  ) {

    const medicalRecord =
      await MedicalRecord.findById(
        medicalRecordId
      );

    if (!medicalRecord) {

      throw new AppError(
        "Medical record not found",
        404
      );

    }

    return medicalRecord;

  }


  /**
   * Validate Laboratory Status
   */
  validateStatus(status) {

    const allowedStatuses = [

      "Requested",

      "Sample Collected",

      "Processing",

      "Completed",

      "Cancelled",

    ];

    if (
      !allowedStatuses.includes(status)
    ) {

      throw new AppError(
        "Invalid laboratory status",
        400
      );

    }

  }


  /**
   * ===========================================
   * CREATE LABORATORY TEST
   * ===========================================
   */

  async createLaboratoryTest(
    laboratoryData
  ) {

    await this.validatePatient(
      laboratoryData.patient
    );

    await this.validateDoctor(
      laboratoryData.doctor
    );

    await this.validateMedicalRecord(
      laboratoryData.medicalRecord
    );

    this.validateStatus(
      laboratoryData.status ||
      "Requested"
    );

    const laboratoryTest =
      await LaboratoryTest.create(
        laboratoryData
      );

    return await LaboratoryTest
      .findById(
        laboratoryTest._id
      )
      .populate("patient")
      .populate("doctor")
      .populate("medicalRecord");

  }


  /**
   * ===========================================
   * GET ALL LABORATORY TESTS
   * ===========================================
   */

  async getAllLaboratoryTests(
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

    if (query.medicalRecord) {

      filter.medicalRecord =
        query.medicalRecord;

    }

    if (query.category) {

      filter.category =
        query.category;

    }

    if (query.priority) {

      filter.priority =
        query.priority;

    }

    if (query.status) {

      filter.status =
        query.status;

    }

    if (query.testName) {

      filter.testName = {

        $regex:
          query.testName,

        $options: "i",

      };

    }

    const laboratoryTests =
      await LaboratoryTest.find(
        filter
      )
        .populate("patient")
        .populate("doctor")
        .populate("medicalRecord")
        .sort({
          requestedDate: -1,
        })
        .skip(skip)
        .limit(limit);

    const total =
      await LaboratoryTest.countDocuments(
        filter
      );

    return {

      laboratoryTests,

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
   * ===========================================
   * GET LABORATORY TEST BY ID
   * ===========================================
   */
  async getLaboratoryTestById(id) {

    const laboratoryTest =
      await LaboratoryTest.findById(id)
        .populate("patient")
        .populate("doctor")
        .populate("medicalRecord");

    if (!laboratoryTest) {

      throw new AppError(
        "Laboratory test not found",
        404
      );

    }

    return laboratoryTest;

  }


  /**
   * ===========================================
   * UPDATE LABORATORY TEST
   * ===========================================
   */
  async updateLaboratoryTest(
    id,
    updateData
  ) {

    const laboratoryTest =
      await this.getLaboratoryTestById(id);

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

    if (updateData.medicalRecord) {

      await this.validateMedicalRecord(
        updateData.medicalRecord
      );

    }

    if (updateData.status) {

      this.validateStatus(
        updateData.status
      );

    }

    Object.assign(
      laboratoryTest,
      updateData
    );

    await laboratoryTest.save();

    return await LaboratoryTest.findById(
      laboratoryTest._id
    )
      .populate("patient")
      .populate("doctor")
      .populate("medicalRecord");

  }


  /**
   * ===========================================
   * UPDATE LABORATORY STATUS
   * ===========================================
   */
  async updateLaboratoryStatus(
    id,
    status
  ) {

    this.validateStatus(status);

    const laboratoryTest =
      await this.getLaboratoryTestById(id);

    laboratoryTest.status = status;

    switch (status) {

      case "Sample Collected":

        laboratoryTest.sampleCollectedAt =
          new Date();

        break;

      case "Completed":

        laboratoryTest.completedAt =
          new Date();

        break;

      default:

        break;

    }

    await laboratoryTest.save();

    return await LaboratoryTest.findById(
      laboratoryTest._id
    )
      .populate("patient")
      .populate("doctor")
      .populate("medicalRecord");

  }


  /**
   * ===========================================
   * DELETE LABORATORY TEST
   * ===========================================
   */
  async deleteLaboratoryTest(id) {

    const laboratoryTest =
      await this.getLaboratoryTestById(id);

    await laboratoryTest.deleteOne();

    return;

  }

    /**
   * ===========================================
   * GET PATIENT LABORATORY TESTS
   * ===========================================
   */
  async getPatientLaboratoryTests(
    patientId
  ) {

    await this.validatePatient(
      patientId
    );

    return await LaboratoryTest.find({

      patient: patientId,

    })
      .populate("doctor")
      .populate("medicalRecord")
      .sort({
        requestedDate: -1,
      });

  }


  /**
   * ===========================================
   * GET DOCTOR LABORATORY TESTS
   * ===========================================
   */
  async getDoctorLaboratoryTests(
    doctorId
  ) {

    await this.validateDoctor(
      doctorId
    );

    return await LaboratoryTest.find({

      doctor: doctorId,

    })
      .populate("patient")
      .populate("medicalRecord")
      .sort({
        requestedDate: -1,
      });

  }


  /**
   * ===========================================
   * LABORATORY TEST STATISTICS
   * ===========================================
   */
  async getLaboratoryStatistics() {

    const totalTests =
      await LaboratoryTest.countDocuments();

    const requested =
      await LaboratoryTest.countDocuments({
        status: "Requested",
      });

    const sampleCollected =
      await LaboratoryTest.countDocuments({
        status: "Sample Collected",
      });

    const processing =
      await LaboratoryTest.countDocuments({
        status: "Processing",
      });

    const completed =
      await LaboratoryTest.countDocuments({
        status: "Completed",
      });

    const cancelled =
      await LaboratoryTest.countDocuments({
        status: "Cancelled",
      });

    const today = new Date();

    today.setHours(
      0,
      0,
      0,
      0
    );

    const todayTests =
      await LaboratoryTest.countDocuments({

        requestedDate: {
          $gte: today,
        },

      });

    return {

      totalTests,

      requested,

      sampleCollected,

      processing,

      completed,

      cancelled,

      todayTests,

    };

  }

}

module.exports =
  new LaboratoryTestService();