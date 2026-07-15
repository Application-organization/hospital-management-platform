const mongoose = require("mongoose");

const medicationSchema = new mongoose.Schema(
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

    medicationName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 200,
    },

    genericName: {
      type: String,
      trim: true,
      default: "",
      maxlength: 200,
    },

    dosage: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    frequency: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    duration: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    route: {
      type: String,
      enum: [
        "Oral",
        "Intravenous",
        "Intramuscular",
        "Subcutaneous",
        "Topical",
        "Inhalation",
        "Rectal",
        "Ophthalmic",
        "Otic",
        "Nasal",
        "Other",
      ],
      default: "Oral",
    },

    instructions: {
      type: String,
      trim: true,
      maxlength: 2000,
      default: "",
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    refills: {
      type: Number,
      default: 0,
      min: 0,
    },

    prescribedDate: {
      type: Date,
      default: Date.now,
    },

    startDate: {
      type: Date,
    },

    endDate: {
      type: Date,
    },

    status: {
      type: String,
      enum: [
        "Prescribed",
        "Dispensed",
        "Completed",
        "Cancelled",
      ],
      default: "Prescribed",
    },

    notes: {
      type: String,
      trim: true,
      maxlength: 3000,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Medication",
  medicationSchema
);