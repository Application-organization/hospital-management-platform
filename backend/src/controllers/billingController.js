const billingService = require("../services/billingService");

class BillingController {

  /**
   * ===========================================
   * CREATE BILL
   * ===========================================
   */
  async createBilling(
    req,
    res,
    next
  ) {

    try {

      const billing =
        await billingService.createBilling(
          req.body
        );

      res.status(201).json({

        success: true,

        message:
          "Billing created successfully",

        data: billing,

      });

    } catch (error) {

      next(error);

    }

  }


  /**
   * ===========================================
   * GET ALL BILLS
   * ===========================================
   */
  async getAllBillings(
    req,
    res,
    next
  ) {

    try {

      const billings =
        await billingService.getAllBillings(
          req.query
        );

      res.status(200).json({

        success: true,

        message:
          "Billings retrieved successfully",

        data: billings,

      });

    } catch (error) {

      next(error);

    }

  }


  /**
   * ===========================================
   * GET BILL BY ID
   * ===========================================
   */
  async getBillingById(
    req,
    res,
    next
  ) {

    try {

      const billing =
        await billingService.getBillingById(
          req.params.id
        );

      res.status(200).json({

        success: true,

        message:
          "Billing retrieved successfully",

        data: billing,

      });

    } catch (error) {

      next(error);

    }

  }


  /**
   * ===========================================
   * UPDATE BILL
   * ===========================================
   */
  async updateBilling(
    req,
    res,
    next
  ) {

    try {

      const billing =
        await billingService.updateBilling(
          req.params.id,
          req.body
        );

      res.status(200).json({

        success: true,

        message:
          "Billing updated successfully",

        data: billing,

      });

    } catch (error) {

      next(error);

    }

  }

    /**
   * ===========================================
   * UPDATE PAYMENT STATUS
   * ===========================================
   */
  async updatePaymentStatus(
    req,
    res,
    next
  ) {

    try {

      const billing =
        await billingService.updatePaymentStatus(
          req.params.id,
          req.body.paymentStatus
        );

      res.status(200).json({

        success: true,

        message:
          "Payment status updated successfully",

        data: billing,

      });

    } catch (error) {

      next(error);

    }

  }


  /**
   * ===========================================
   * DELETE BILLING
   * ===========================================
   */
  async deleteBilling(
    req,
    res,
    next
  ) {

    try {

      await billingService.deleteBilling(
        req.params.id
      );

      res.status(200).json({

        success: true,

        message:
          "Billing deleted successfully",

        data: null,

      });

    } catch (error) {

      next(error);

    }

  }


  /**
   * ===========================================
   * GET PATIENT BILLING HISTORY
   * ===========================================
   */
  async getPatientBillingHistory(
    req,
    res,
    next
  ) {

    try {

      const history =
        await billingService.getPatientBillingHistory(
          req.params.patientId
        );

      res.status(200).json({

        success: true,

        message:
          "Patient billing history retrieved successfully",

        data: history,

      });

    } catch (error) {

      next(error);

    }

  }


  /**
   * ===========================================
   * GET DOCTOR BILLINGS
   * ===========================================
   */
  async getDoctorBillings(
    req,
    res,
    next
  ) {

    try {

      const billings =
        await billingService.getDoctorBillings(
          req.params.doctorId
        );

      res.status(200).json({

        success: true,

        message:
          "Doctor billings retrieved successfully",

        data: billings,

      });

    } catch (error) {

      next(error);

    }

  }


  /**
   * ===========================================
   * GET BILLING STATISTICS
   * ===========================================
   */
  async getBillingStatistics(
    req,
    res,
    next
  ) {

    try {

      const statistics =
        await billingService.getBillingStatistics();

      res.status(200).json({

        success: true,

        message:
          "Billing statistics retrieved successfully",

        data: statistics,

      });

    } catch (error) {

      next(error);

    }

  }


  /**
   * ===========================================
   * GET REVENUE STATISTICS
   * ===========================================
   */
  async getRevenueStatistics(
    req,
    res,
    next
  ) {

    try {

      const revenue =
        await billingService.getRevenueStatistics();

      res.status(200).json({

        success: true,

        message:
          "Revenue statistics retrieved successfully",

        data: revenue,

      });

    } catch (error) {

      next(error);

    }

  }

}

module.exports =
  new BillingController();