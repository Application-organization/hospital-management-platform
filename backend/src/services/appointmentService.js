const Appointment = require("../models/Appointment");
const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");
const ApiError = require("../utils/ApiError");

// Create Appointment
const createAppointment = async (appointmentData) => {
    const patient = await Patient.findById(appointmentData.patient);

    if (!patient) {
        throw new ApiError(404, "Patient not found");
    }

    const doctor = await Doctor.findById(appointmentData.doctor);

    if (!doctor) {
        throw new ApiError(404, "Doctor not found");
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
    const appointment = await Appointment.findById(id)
        .populate("patient")
        .populate("doctor");

    if (!appointment) {
        throw new ApiError(404, "Appointment not found");
    }

    return appointment;
};

// Update Appointment
const updateAppointment = async (id, appointmentData) => {
    if (appointmentData.patient) {
        const patient = await Patient.findById(appointmentData.patient);

        if (!patient) {
            throw new ApiError(404, "Patient not found");
        }
    }

    if (appointmentData.doctor) {
        const doctor = await Doctor.findById(appointmentData.doctor);

        if (!doctor) {
            throw new ApiError(404, "Doctor not found");
        }
    }

    const appointment = await Appointment.findByIdAndUpdate(
        id,
        appointmentData,
        {
            new: true,
            runValidators: true,
        }
    )
        .populate("patient")
        .populate("doctor");

    if (!appointment) {
        throw new ApiError(404, "Appointment not found");
    }

    return appointment;
};

// Delete Appointment
const deleteAppointment = async (id) => {
    const appointment = await Appointment.findByIdAndDelete(id);

    if (!appointment) {
        throw new ApiError(404, "Appointment not found");
    }

    return appointment;
};

module.exports = {
    createAppointment,
    getAllAppointments,
    getAppointmentById,
    updateAppointment,
    deleteAppointment,
};