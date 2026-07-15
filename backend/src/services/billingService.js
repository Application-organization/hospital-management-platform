const Billing = require("../models/Billing");
const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");
const MedicalRecord = require("../models/MedicalRecord");

const ApiError = require("../utils/ApiError");

class BillingService {

  /**
   * ===========================================
   * GENERATE INVOICE
   * ===========================================
   */
  async createBilling(data) {

    const patient =
      await Patient.findById(data.patient);

    if (!patient) {
      throw new ApiError(
        "Patient not found",
        404
      );
    }

    const doctor =
      await Doctor.findById(data.doctor);

    if (!doctor) {
      throw new ApiError(
        "Doctor not found",
        404
      );
    }

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

    const consultationFee =
      Number(data.consultationFee || 0);

    const laboratoryFee =
      Number(data.laboratoryFee || 0);

    const medicationFee =
      Number(data.medicationFee || 0);

    const otherCharges =
      Number(data.otherCharges || 0);

    const discount =
      Number(data.discount || 0);

    const tax =
      Number(data.tax || 0);

    const totalAmount =
      consultationFee +
      laboratoryFee +
      medicationFee +
      otherCharges -
      discount +
      tax;

    const amountPaid =
      Number(data.amountPaid || 0);

    const balance =
      totalAmount - amountPaid;

    let paymentStatus = "Pending";

    if (amountPaid === totalAmount) {

      paymentStatus = "Paid";

    } else if (
      amountPaid > 0 &&
      amountPaid < totalAmount
    ) {

      paymentStatus = "Partially Paid";

    }

    const invoiceNumber =
      `INV-${Date.now()}`;

    const billing =
      await Billing.create({

        patient: data.patient,

        doctor: data.doctor,

        medicalRecord: data.medicalRecord,

        invoiceNumber,

        consultationFee,

        laboratoryFee,

        medicationFee,

        otherCharges,

        discount,

        tax,

        totalAmount,

        amountPaid,

        balance,

        paymentMethod:
          data.paymentMethod || "Cash",

        paymentStatus,

        dueDate: data.dueDate,

        paidAt:
          paymentStatus === "Paid"
            ? new Date()
            : null,

        notes:
          data.notes || "",

      });

    return await Billing.findById(
      billing._id
    )
      .populate("patient")
      .populate("doctor")
      .populate("medicalRecord");

  }

  /**
   * ===========================================
   * GET ALL BILLS
   * ===========================================
   */
  async getAllBillings(query = {}) {

    const filter = {};

    if (query.patient)
      filter.patient = query.patient;

    if (query.doctor)
      filter.doctor = query.doctor;

    if (query.paymentStatus)
      filter.paymentStatus =
        query.paymentStatus;

    if (query.paymentMethod)
      filter.paymentMethod =
        query.paymentMethod;

    return await Billing.find(filter)
      .populate("patient")
      .populate("doctor")
      .populate("medicalRecord")
      .sort({
        createdAt: -1,
      });

  }

    /**
   * ===========================================
   * GET BILLING BY ID
   * ===========================================
   */
  async getBillingById(id) {

    const billing =
      await Billing.findById(id)
        .populate("patient")
        .populate("doctor")
        .populate("medicalRecord");

    if (!billing) {

      throw new ApiError(
        "Billing record not found",
        404
      );

    }

    return billing;

  }


  /**
   * ===========================================
   * UPDATE BILLING
   * ===========================================
   */
  async updateBilling(
    id,
    data
  ) {

    const billing =
      await Billing.findById(id);

    if (!billing) {

      throw new ApiError(
        "Billing record not found",
        404
      );

    }

    billing.consultationFee =
      data.consultationFee ??
      billing.consultationFee;

    billing.laboratoryFee =
      data.laboratoryFee ??
      billing.laboratoryFee;

    billing.medicationFee =
      data.medicationFee ??
      billing.medicationFee;

    billing.otherCharges =
      data.otherCharges ??
      billing.otherCharges;

    billing.discount =
      data.discount ??
      billing.discount;

    billing.tax =
      data.tax ??
      billing.tax;

    billing.amountPaid =
      data.amountPaid ??
      billing.amountPaid;

    billing.paymentMethod =
      data.paymentMethod ??
      billing.paymentMethod;

    billing.notes =
      data.notes ??
      billing.notes;

    billing.totalAmount =
      billing.consultationFee +
      billing.laboratoryFee +
      billing.medicationFee +
      billing.otherCharges -
      billing.discount +
      billing.tax;

    billing.balance =
      billing.totalAmount -
      billing.amountPaid;

    if (billing.amountPaid === 0) {

      billing.paymentStatus =
        "Pending";

      billing.paidAt = null;

    } else if (
      billing.amountPaid >=
      billing.totalAmount
    ) {

      billing.paymentStatus =
        "Paid";

      billing.balance = 0;

      billing.paidAt = new Date();

    } else {

      billing.paymentStatus =
        "Partially Paid";

      billing.paidAt = null;

    }

    await billing.save();

    return await Billing.findById(id)
      .populate("patient")
      .populate("doctor")
      .populate("medicalRecord");

  }


  /**
   * ===========================================
   * UPDATE PAYMENT STATUS
   * ===========================================
   */
  async updatePaymentStatus(
    id,
    status
  ) {

    const billing =
      await Billing.findById(id);

    if (!billing) {

      throw new ApiError(
        "Billing record not found",
        404
      );

    }

    billing.paymentStatus =
      status;

    if (status === "Paid") {

      billing.amountPaid =
        billing.totalAmount;

      billing.balance = 0;

      billing.paidAt =
        new Date();

    }

    await billing.save();

    return await Billing.findById(id)
      .populate("patient")
      .populate("doctor")
      .populate("medicalRecord");

  }


  /**
   * ===========================================
   * DELETE BILLING
   * ===========================================
   */
  async deleteBilling(id) {

    const billing =
      await Billing.findById(id);

    if (!billing) {

      throw new ApiError(
        "Billing record not found",
        404
      );

    }

    await billing.deleteOne();

    return true;

  }

    /**
   * ===========================================
   * GET PATIENT BILLING HISTORY
   * ===========================================
   */
  async getPatientBillingHistory(patientId) {

    return await Billing.find({
      patient: patientId,
    })
      .populate("patient")
      .populate("doctor")
      .populate("medicalRecord")
      .sort({
        createdAt: -1,
      });

  }


  /**
   * ===========================================
   * GET DOCTOR BILLINGS
   * ===========================================
   */
  async getDoctorBillings(doctorId) {

    return await Billing.find({
      doctor: doctorId,
    })
      .populate("patient")
      .populate("doctor")
      .populate("medicalRecord")
      .sort({
        createdAt: -1,
      });

  }


  /**
   * ===========================================
   * BILLING STATISTICS
   * ===========================================
   */
  async getBillingStatistics() {

    const totalBills =
      await Billing.countDocuments();

    const pending =
      await Billing.countDocuments({
        paymentStatus: "Pending",
      });

    const partiallyPaid =
      await Billing.countDocuments({
        paymentStatus: "Partially Paid",
      });

    const paid =
      await Billing.countDocuments({
        paymentStatus: "Paid",
      });

    const refunded =
      await Billing.countDocuments({
        paymentStatus: "Refunded",
      });

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const todayBills =
      await Billing.countDocuments({
        createdAt: {
          $gte: today,
        },
      });

    return {

      totalBills,

      pending,

      partiallyPaid,

      paid,

      refunded,

      todayBills,

    };

  }


  /**
   * ===========================================
   * REVENUE STATISTICS
   * ===========================================
   */
  async getRevenueStatistics() {

    const revenue =
      await Billing.aggregate([

        {
          $group: {

            _id: null,

            totalRevenue: {
              $sum: "$amountPaid",
            },

            totalOutstanding: {
              $sum: "$balance",
            },

            totalInvoices: {
              $sum: 1,
            },

          },

        },

      ]);

    return revenue.length
      ? revenue[0]
      : {

          totalRevenue: 0,

          totalOutstanding: 0,

          totalInvoices: 0,

        };

  }

}

module.exports = new BillingService();