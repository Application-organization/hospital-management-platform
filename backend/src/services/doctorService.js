const Doctor = require("../models/Doctor");

// Create Doctor
const createDoctor = async (doctorData) => {
    const doctor = await Doctor.create(doctorData);
    return doctor;
};

// Get All Doctors
const getAllDoctors = async () => {
    return await Doctor.find().sort({ createdAt: -1 });
};

// Get Doctor By ID
const getDoctorById = async (id) => {
    return await Doctor.findById(id);
};

// Update Doctor
const updateDoctor = async (id, doctorData) => {
    return await Doctor.findByIdAndUpdate(id, doctorData, {
        new: true,
        runValidators: true,
    });
};

// Delete Doctor
const deleteDoctor = async (id) => {
    return await Doctor.findByIdAndDelete(id);
};

module.exports = {
    createDoctor,
    getAllDoctors,
    getDoctorById,
    updateDoctor,
    deleteDoctor,
};