const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        phone: {
            type: String,
            required: true,
            trim: true,
        },
        department: {
            type: String,
            required: true,
            trim: true,
        },
        specialization: {
            type: String,
            required: true,
            trim: true,
        },
        experience: {
            type: Number,
            required: true,
            min: 0,
        },
        licenseNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        status: {
            type: String,
            enum: ["Active", "Inactive", "On Leave"],
            default: "Active",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Doctor", doctorSchema);