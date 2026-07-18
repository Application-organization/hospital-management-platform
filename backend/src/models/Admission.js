const mongoose = require("mongoose");


const admissionSchema = new mongoose.Schema(
    {
        patient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Patient",
            required: [true, "Patient reference is required"]
        },

        doctor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Doctor",
            required: [true, "Doctor reference is required"]
        },

        ward: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Ward",
            required: [true, "Ward reference is required"]
        },

        bed: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Bed",
            required: [true, "Bed reference is required"]
        },

        admissionDate: {
            type: Date,
            required: [true, "Admission date is required"],
            default: Date.now
        },

        expectedDischargeDate: {
            type: Date
        },

        dischargeDate: {
            type: Date
        },

        reason: {
            type: String,
            required: [true, "Admission reason is required"],
            trim: true,
            maxlength: [
                500,
                "Admission reason cannot exceed 500 characters"
            ]
        },

        diagnosis: {
            type: String,
            trim: true,
            maxlength: [
                500,
                "Diagnosis cannot exceed 500 characters"
            ]
        },

        status: {
            type: String,
            enum: [
                "Admitted",
                "Discharged",
                "Cancelled"
            ],
            default: "Admitted"
        }
    },
    {
        timestamps: true
    }
);


// Prevent multiple active admissions
// for the same patient
admissionSchema.index(
    {
        patient: 1,
        status: 1
    }
);


// Faster reporting queries
admissionSchema.index({ ward: 1 });
admissionSchema.index({ doctor: 1 });
admissionSchema.index({ admissionDate: 1 });


module.exports = mongoose.model(
    "Admission",
    admissionSchema
);