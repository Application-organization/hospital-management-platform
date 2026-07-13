const medicalRecordService = require("../services/medicalRecordService");

class MedicalRecordController {

  /**
   * Create Medical Record
   */
  async createMedicalRecord(
    req,
    res,
    next
  ) {

    try {

      const medicalRecord =
        await medicalRecordService.createMedicalRecord(
          req.body
        );

      res.status(201).json({

        success: true,

        message:
          "Medical record created successfully",

        data: medicalRecord,

      });

    } catch (error) {

      next(error);

    }

  }


  /**
   * Get All Medical Records
   */
  async getAllMedicalRecords(
    req,
    res,
    next
  ) {

    try {

      const result =
        await medicalRecordService.getAllMedicalRecords(
          req.query
        );

      res.status(200).json({

        success: true,

        message:
          "Medical records retrieved successfully",

        data: result,

      });

    } catch (error) {

      next(error);

    }

  }


  /**
   * Get Medical Record By ID
   */
  async getMedicalRecordById(
    req,
    res,
    next
  ) {

    try {

      const medicalRecord =
        await medicalRecordService.getMedicalRecordById(
          req.params.id
        );

      res.status(200).json({

        success: true,

        message:
          "Medical record retrieved successfully",

        data: medicalRecord,

      });

    } catch (error) {

      next(error);

    }

  }


  /**
   * Get Patient Medical History
   */
  async getPatientMedicalHistory(
    req,
    res,
    next
  ) {

    try {

      const history =
        await medicalRecordService.getPatientMedicalHistory(
          req.params.patientId
        );

      res.status(200).json({

        success: true,

        message:
          "Patient medical history retrieved successfully",

        data: history,

      });

    } catch (error) {

      next(error);

    }

  }


  /**
   * Get Doctor Medical Records
   */
  async getDoctorMedicalRecords(
    req,
    res,
    next
  ) {

    try {

      const records =
        await medicalRecordService.getDoctorMedicalRecords(
          req.params.doctorId
        );

      res.status(200).json({

        success: true,

        message:
          "Doctor medical records retrieved successfully",

        data: records,

      });

    } catch (error) {

      next(error);

    }

  }


  /**
   * Update Medical Record
   */
  async updateMedicalRecord(
    req,
    res,
    next
  ) {

    try {

      const medicalRecord =
        await medicalRecordService.updateMedicalRecord(
          req.params.id,
          req.body
        );

      res.status(200).json({

        success: true,

        message:
          "Medical record updated successfully",

        data: medicalRecord,

      });

    } catch (error) {

      next(error);

    }

  }


  /**
   * Update Medical Record Status
   */
  async updateMedicalRecordStatus(
    req,
    res,
    next
  ) {

    try {

      const medicalRecord =
        await medicalRecordService.updateMedicalRecordStatus(
          req.params.id,
          req.body.status
        );

      res.status(200).json({

        success: true,

        message:
          "Medical record status updated successfully",

        data: medicalRecord,

      });

    } catch (error) {

      next(error);

    }

  }


  /**
   * Delete Medical Record
   */
  async deleteMedicalRecord(
    req,
    res,
    next
  ) {

    try {

      const result =
        await medicalRecordService.deleteMedicalRecord(
          req.params.id
        );

      res.status(200).json({

        success: true,

        message: result.message,

        data: null,

      });

    } catch (error) {

      next(error);

    }

  }


  /**
   * Get Medical Record Statistics
   */
  async getMedicalRecordStatistics(
    req,
    res,
    next
  ) {

    try {

      const statistics =
        await medicalRecordService.getMedicalRecordStatistics();

      res.status(200).json({

        success: true,

        message:
          "Medical record statistics retrieved successfully",

        data: statistics,

      });

    } catch (error) {

      next(error);

    }

  }

}

module.exports =
  new MedicalRecordController();