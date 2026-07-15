const medicationService = require("../services/medicationService");

class MedicationController {

  /**
   * ===========================================
   * CREATE MEDICATION
   * ===========================================
   */
  async createMedication(
    req,
    res,
    next
  ) {

    try {

      const medication =
        await medicationService.createMedication(
          req.body
        );

      res.status(201).json({

        success: true,

        message:
          "Medication created successfully",

        data: medication,

      });

    } catch (error) {

      next(error);

    }

  }

  /**
   * ===========================================
   * GET ALL MEDICATIONS
   * ===========================================
   */
  async getAllMedications(
    req,
    res,
    next
  ) {

    try {

      const medications =
        await medicationService.getAllMedications(
          req.query
        );

      res.status(200).json({

        success: true,

        message:
          "Medications retrieved successfully",

        data: medications,

      });

    } catch (error) {

      next(error);

    }

  }

  /**
   * ===========================================
   * GET MEDICATION BY ID
   * ===========================================
   */
  async getMedicationById(
    req,
    res,
    next
  ) {

    try {

      const medication =
        await medicationService.getMedicationById(
          req.params.id
        );

      res.status(200).json({

        success: true,

        message:
          "Medication retrieved successfully",

        data: medication,

      });

    } catch (error) {

      next(error);

    }

  }

  /**
   * ===========================================
   * UPDATE MEDICATION
   * ===========================================
   */
  async updateMedication(
    req,
    res,
    next
  ) {

    try {

      const medication =
        await medicationService.updateMedication(
          req.params.id,
          req.body
        );

      res.status(200).json({

        success: true,

        message:
          "Medication updated successfully",

        data: medication,

      });

    } catch (error) {

      next(error);

    }

  }

  /**
   * ===========================================
   * UPDATE MEDICATION STATUS
   * ===========================================
   */
  async updateMedicationStatus(
    req,
    res,
    next
  ) {

    try {

      const medication =
        await medicationService.updateMedicationStatus(
          req.params.id,
          req.body.status
        );

      res.status(200).json({

        success: true,

        message:
          "Medication status updated successfully",

        data: medication,

      });

    } catch (error) {

      next(error);

    }

  }

  /**
   * ===========================================
   * DELETE MEDICATION
   * ===========================================
   */
  async deleteMedication(
    req,
    res,
    next
  ) {

    try {

      await medicationService.deleteMedication(
        req.params.id
      );

      res.status(200).json({

        success: true,

        message:
          "Medication deleted successfully",

        data: null,

      });

    } catch (error) {

      next(error);

    }

  }

  /**
   * ===========================================
   * GET PATIENT MEDICATION HISTORY
   * ===========================================
   */
  async getPatientMedicationHistory(
    req,
    res,
    next
  ) {

    try {

      const history =
        await medicationService.getPatientMedicationHistory(
          req.params.patientId
        );

      res.status(200).json({

        success: true,

        message:
          "Patient medication history retrieved successfully",

        data: history,

      });

    } catch (error) {

      next(error);

    }

  }

  /**
   * ===========================================
   * GET DOCTOR MEDICATIONS
   * ===========================================
   */
  async getDoctorMedications(
    req,
    res,
    next
  ) {

    try {

      const medications =
        await medicationService.getDoctorMedications(
          req.params.doctorId
        );

      res.status(200).json({

        success: true,

        message:
          "Doctor medications retrieved successfully",

        data: medications,

      });

    } catch (error) {

      next(error);

    }

  }

  /**
   * ===========================================
   * GET MEDICATION STATISTICS
   * ===========================================
   */
  async getMedicationStatistics(
    req,
    res,
    next
  ) {

    try {

      const statistics =
        await medicationService.getMedicationStatistics();

      res.status(200).json({

        success: true,

        message:
          "Medication statistics retrieved successfully",

        data: statistics,

      });

    } catch (error) {

      next(error);

    }

  }

}

module.exports =
  new MedicationController();