const mongoose = require("mongoose");

const laboratoryTestSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },

    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },

    medicalRecord: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MedicalRecord",
      required: true,
    },

    testName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 200,
    },

    category: {
      type: String,
      enum: [
        "Blood Test",
        "Urine Test",
        "X-Ray",
        "MRI",
        "CT Scan",
        "Ultrasound",
        "ECG",
        "COVID-19",
        "Others",
      ],
      required: true,
    },

    priority: {
      type: String,
      enum: [
        "Routine",
        "Urgent",
        "Emergency",
      ],
      default: "Routine",
    },

    status: {
      type: String,
      enum: [
        "Requested",
        "Sample Collected",
        "Processing",
        "Completed",
        "Cancelled",
      ],
      default: "Requested",
    },

    requestedDate: {
      type: Date,
      default: Date.now,
    },

    sampleCollectedAt: {
      type: Date,
    },

    completedAt: {
      type: Date,
    },

    result: {
      type: String,
      trim: true,
      maxlength: 5000,
      default: "",
    },

    remarks: {
      type: String,
      trim: true,
      maxlength: 2000,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "LaboratoryTest",
  laboratoryTestSchema
);