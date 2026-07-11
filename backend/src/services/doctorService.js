const Doctor = require("../models/Doctor");
const ApiError = require("../utils/ApiError");

/**
 * Create Doctor
 */
const createDoctor = async (doctorData) => {
    // Check email uniqueness
    const existingEmail = await Doctor.findOne({
        email: doctorData.email,
    });

    if (existingEmail) {
        throw new ApiError(409, "Doctor with this email already exists");
    }

    // Check license uniqueness
    const existingLicense = await Doctor.findOne({
        licenseNumber: doctorData.licenseNumber,
    });

    if (existingLicense) {
        throw new ApiError(
            409,
            "Doctor with this license number already exists"
        );
    }

    return await Doctor.create(doctorData);
};

/**
 * Get All Doctors
 */
const getAllDoctors = async () => {
    return await Doctor.find().sort({
        createdAt: -1,
    });
};

/**
 * Get Doctor By ID
 */
const getDoctorById = async (id) => {
    const doctor = await Doctor.findById(id);

    if (!doctor) {
        throw new ApiError(404, "Doctor not found");
    }

    return doctor;
};

/**
 * Update Doctor
 */
const updateDoctor = async (id, doctorData) => {
    const doctor = await Doctor.findById(id);

    if (!doctor) {
        throw new ApiError(404, "Doctor not found");
    }

    // Email uniqueness
    if (
        doctorData.email &&
        doctorData.email !== doctor.email
    ) {
        const existingEmail = await Doctor.findOne({
            email: doctorData.email,
        });

        if (existingEmail) {
            throw new ApiError(
                409,
                "Doctor with this email already exists"
            );
        }
    }

    // License uniqueness
    if (
        doctorData.licenseNumber &&
        doctorData.licenseNumber !== doctor.licenseNumber
    ) {
        const existingLicense = await Doctor.findOne({
            licenseNumber: doctorData.licenseNumber,
        });

        if (existingLicense) {
            throw new ApiError(
                409,
                "Doctor with this license number already exists"
            );
        }
    }

    return await Doctor.findByIdAndUpdate(
        id,
        doctorData,
        {
            new: true,
            runValidators: true,
        }
    );
};

/**
 * Delete Doctor
 */
const deleteDoctor = async (id) => {
    const doctor = await Doctor.findById(id);

    if (!doctor) {
        throw new ApiError(404, "Doctor not found");
    }

    await doctor.deleteOne();

    return doctor;
};

module.exports = {
    createDoctor,
    getAllDoctors,
    getDoctorById,
    updateDoctor,
    deleteDoctor,
};