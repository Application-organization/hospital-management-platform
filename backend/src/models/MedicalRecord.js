const mongoose = require("mongoose");

const medicalRecordSchema = new mongoose.Schema(
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

    visitDate: {
      type: Date,
      required: true,
      default: Date.now,
    },

    diagnosis: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 500,
    },

    symptoms: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 1000,
    },

    treatment: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },

    prescription: {
      type: String,
      trim: true,
      maxlength: 1000,
      default: "",
    },

    allergies: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "None",
    },

    vitalSigns: {
      bloodPressure: {
        type: String,
        default: "",
      },

      heartRate: {
        type: Number,
        min: 0,
      },

      temperature: {
        type: Number,
        min: 30,
        max: 45,
      },

      weight: {
        type: Number,
        min: 0,
      },

      height: {
        type: Number,
        min: 0,
      },

      bmi: {
        type: Number,
        min: 0,
      },
    },

    labResults: {
      type: String,
      trim: true,
      maxlength: 3000,
      default: "",
    },

    clinicalNotes: {
      type: String,
      trim: true,
      maxlength: 3000,
      default: "",
    },

    followUpDate: {
      type: Date,
    },

    status: {
      type: String,
      enum: [
        "Open",
        "Closed",
        "Follow-up Required",
      ],
      default: "Open",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "MedicalRecord",
  medicalRecordSchema
);