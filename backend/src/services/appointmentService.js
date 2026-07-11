const Appointment = require("../models/Appointment");
const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");

// Create Appointment
const createAppointment = async (appointmentData) => {
    const patient = await Patient.findById(appointmentData.patient);

    if (!patient) {
        throw new Error("Patient not found");
    }

    const doctor = await Doctor.findById(appointmentData.doctor);

    if (!doctor) {
        throw new Error("Doctor not found");
    }

    const appointment = await Appointment.create(appointmentData);

    return await Appointment.findById(appointment._id)
        .populate("patient")
        .populate("doctor");
};

// Get All Appointments
const getAllAppointments = async () => {
    return await Appointment.find()
        .populate("patient")
        .populate("doctor")
        .sort({ appointmentDate: 1 });
};

// Get Appointment By ID
const getAppointmentById = async (id) => {
    return await Appointment.findById(id)
        .populate("patient")
        .populate("doctor");
};

// Update Appointment
const updateAppointment = async (id, appointmentData) => {
    if (appointmentData.patient) {
        const patient = await Patient.findById(appointmentData.patient);

        if (!patient) {
            throw new Error("Patient not found");
        }
    }

    if (appointmentData.doctor) {
        const doctor = await Doctor.findById(appointmentData.doctor);

        if (!doctor) {
            throw new Error("Doctor not found");
        }
    }

    return await Appointment.findByIdAndUpdate(id, appointmentData, {
        new: true,
        runValidators: true,
    })
        .populate("patient")
        .populate("doctor");
};

// Delete Appointment
const deleteAppointment = async (id) => {
    return await Appointment.findByIdAndDelete(id);
};

module.exports = {
    createAppointment,
    getAllAppointments,
    getAppointmentById,
    updateAppointment,
    deleteAppointment,
};