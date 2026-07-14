const laboratoryTestService = require("../services/laboratoryTestService");

class LaboratoryTestController {

  /**
   * ===========================================
   * CREATE LABORATORY TEST
   * ===========================================
   */
  async createLaboratoryTest(
    req,
    res,
    next
  ) {

    try {

      const laboratoryTest =
        await laboratoryTestService.createLaboratoryTest(
          req.body
        );

      res.status(201).json({

        success: true,

        message:
          "Laboratory test created successfully",

        data: laboratoryTest,

      });

    } catch (error) {

      next(error);

    }

  }


  /**
   * ===========================================
   * GET ALL LABORATORY TESTS
   * ===========================================
   */
  async getAllLaboratoryTests(
    req,
    res,
    next
  ) {

    try {

      const laboratoryTests =
        await laboratoryTestService.getAllLaboratoryTests(
          req.query
        );

      res.status(200).json({

        success: true,

        message:
          "Laboratory tests retrieved successfully",

        data: laboratoryTests,

      });

    } catch (error) {

      next(error);

    }

  }


  /**
   * ===========================================
   * GET LABORATORY TEST BY ID
   * ===========================================
   */
  async getLaboratoryTestById(
    req,
    res,
    next
  ) {

    try {

      const laboratoryTest =
        await laboratoryTestService.getLaboratoryTestById(
          req.params.id
        );

      res.status(200).json({

        success: true,

        message:
          "Laboratory test retrieved successfully",

        data: laboratoryTest,

      });

    } catch (error) {

      next(error);

    }

  }


  /**
   * ===========================================
   * UPDATE LABORATORY TEST
   * ===========================================
   */
  async updateLaboratoryTest(
    req,
    res,
    next
  ) {

    try {

      const laboratoryTest =
        await laboratoryTestService.updateLaboratoryTest(
          req.params.id,
          req.body
        );

      res.status(200).json({

        success: true,

        message:
          "Laboratory test updated successfully",

        data: laboratoryTest,

      });

    } catch (error) {

      next(error);

    }

  }


  /**
   * ===========================================
   * UPDATE LABORATORY STATUS
   * ===========================================
   */
  async updateLaboratoryStatus(
    req,
    res,
    next
  ) {

    try {

      const laboratoryTest =
        await laboratoryTestService.updateLaboratoryStatus(
          req.params.id,
          req.body.status
        );

      res.status(200).json({

        success: true,

        message:
          "Laboratory test status updated successfully",

        data: laboratoryTest,

      });

    } catch (error) {

      next(error);

    }

  }


  /**
   * ===========================================
   * DELETE LABORATORY TEST
   * ===========================================
   */
  async deleteLaboratoryTest(
    req,
    res,
    next
  ) {

    try {

      await laboratoryTestService.deleteLaboratoryTest(
        req.params.id
      );

      res.status(200).json({

        success: true,

        message:
          "Laboratory test deleted successfully",

        data: null,

      });

    } catch (error) {

      next(error);

    }

  }


  /**
   * ===========================================
   * GET PATIENT LABORATORY HISTORY
   * ===========================================
   */
  async getPatientLaboratoryHistory(
    req,
    res,
    next
  ) {

    try {

      const history =
        await laboratoryTestService.getPatientLaboratoryHistory(
          req.params.patientId
        );

      res.status(200).json({

        success: true,

        message:
          "Patient laboratory history retrieved successfully",

        data: history,

      });

    } catch (error) {

      next(error);

    }

  }


  /**
   * ===========================================
   * GET DOCTOR LABORATORY TESTS
   * ===========================================
   */
  async getDoctorLaboratoryTests(
    req,
    res,
    next
  ) {

    try {

      const records =
        await laboratoryTestService.getDoctorLaboratoryTests(
          req.params.doctorId
        );

      res.status(200).json({

        success: true,

        message:
          "Doctor laboratory tests retrieved successfully",

        data: records,

      });

    } catch (error) {

      next(error);

    }

  }


  /**
   * ===========================================
   * GET LABORATORY STATISTICS
   * ===========================================
   */
  async getLaboratoryStatistics(
    req,
    res,
    next
  ) {

    try {

      const statistics =
        await laboratoryTestService.getLaboratoryStatistics();

      res.status(200).json({

        success: true,

        message:
          "Laboratory statistics retrieved successfully",

        data: statistics,

      });

    } catch (error) {

      next(error);

    }

  }

}

module.exports =
  new LaboratoryTestController();