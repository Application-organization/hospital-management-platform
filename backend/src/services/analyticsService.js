const Admission = require("../models/Admission");
const Billing = require("../models/Billing");
const Bed = require("../models/Bed");
const Appointment = require("../models/Appointment");
const LaboratoryTest = require("../models/LaboratoryTest");
const Doctor = require("../models/Doctor");

const getMonthlyAdmissions = async () => {
    const monthlyAdmissions = await Admission.aggregate([
        {
            $group: {
                _id: {
                    year: { $year: "$admissionDate" },
                    month: { $month: "$admissionDate" },
                },
                totalAdmissions: {
                    $sum: 1,
                },
            },
        },
        {
            $sort: {
                "_id.year": 1,
                "_id.month": 1,
            },
        },
        {
            $project: {
                _id: 0,
                year: "$_id.year",
                month: "$_id.month",
                totalAdmissions: 1,
            },
        },
    ]);

    return monthlyAdmissions;
};

const getMonthlyRevenue = async () => {
    const monthlyRevenue = await Billing.aggregate([
        {
            $group: {
                _id: {
                    year: { $year: "$createdAt" },
                    month: { $month: "$createdAt" },
                },
                totalRevenue: {
                    $sum: "$totalAmount",
                },
                totalInvoices: {
                    $sum: 1,
                },
            },
        },
        {
            $sort: {
                "_id.year": 1,
                "_id.month": 1,
            },
        },
        {
            $project: {
                _id: 0,
                year: "$_id.year",
                month: "$_id.month",
                totalRevenue: 1,
                totalInvoices: 1,
            },
        },
    ]);

    return monthlyRevenue;
};

const getBedOccupancyStatistics = async () => {
    const totalBeds = await Bed.countDocuments();

    const availableBeds = await Bed.countDocuments({
        status: "Available",
    });

    const occupiedBeds = await Bed.countDocuments({
        status: "Occupied",
    });

    const maintenanceBeds = await Bed.countDocuments({
        status: "Maintenance",
    });

    const reservedBeds = await Bed.countDocuments({
        status: "Reserved",
    });

    const occupancyRate =
        totalBeds === 0
            ? 0
            : Number(((occupiedBeds / totalBeds) * 100).toFixed(2));

    return {
        totalBeds,
        availableBeds,
        occupiedBeds,
        maintenanceBeds,
        reservedBeds,
        occupancyRate,
    };
};

const getAppointmentStatistics = async () => {
    const totalAppointments = await Appointment.countDocuments();

    const scheduled = await Appointment.countDocuments({
        status: "Scheduled",
    });

    const confirmed = await Appointment.countDocuments({
        status: "Confirmed",
    });

    const checkedIn = await Appointment.countDocuments({
        status: "Checked-In",
    });

    const inConsultation = await Appointment.countDocuments({
        status: "In Consultation",
    });

    const completed = await Appointment.countDocuments({
        status: "Completed",
    });

    const cancelled = await Appointment.countDocuments({
        status: "Cancelled",
    });

    return {
        totalAppointments,
        scheduled,
        confirmed,
        checkedIn,
        inConsultation,
        completed,
        cancelled,
    };
};

const getLaboratoryStatistics = async () => {
    const totalTests = await LaboratoryTest.countDocuments();

    const requested = await LaboratoryTest.countDocuments({
        status: "Requested",
    });

    const sampleCollected = await LaboratoryTest.countDocuments({
        status: "Sample Collected",
    });

    const processing = await LaboratoryTest.countDocuments({
        status: "Processing",
    });

    const completed = await LaboratoryTest.countDocuments({
        status: "Completed",
    });

    const cancelled = await LaboratoryTest.countDocuments({
        status: "Cancelled",
    });

    return {
        totalTests,
        requested,
        sampleCollected,
        processing,
        completed,
        cancelled,
    };
};

const getDoctorStatistics = async () => {
    const totalDoctors = await Doctor.countDocuments();

    const active = await Doctor.countDocuments({
        status: "Active",
    });

    const inactive = await Doctor.countDocuments({
        status: "Inactive",
    });

    const onLeave = await Doctor.countDocuments({
        status: "On Leave",
    });

    return {
        totalDoctors,
        active,
        inactive,
        onLeave,
    };
};

module.exports = {
    getMonthlyAdmissions,
    getMonthlyRevenue,
    getBedOccupancyStatistics,
    getAppointmentStatistics,
    getLaboratoryStatistics,
    getDoctorStatistics,
};