const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");
const Appointment = require("../models/Appointment");
const Admission = require("../models/Admission");
const Bed = require("../models/Bed");
const LaboratoryTest = require("../models/LaboratoryTest");
const Billing = require("../models/Billing");


const getDashboardStatistics = async () => {
    const [
        totalPatients,
        activePatients,
        totalDoctors,
        activeDoctors,
        totalAppointments,
        activeAdmissions,
        totalBeds,
        availableBeds,
        occupiedBeds,
        totalLaboratoryTests,
        totalRevenue,
    ] = await Promise.all([
        Patient.countDocuments(),

        Patient.countDocuments({
            isActive: true,
        }),

        Doctor.countDocuments(),

        Doctor.countDocuments({
            status: "Active",
        }),

        Appointment.countDocuments(),

        Admission.countDocuments({
            status: "Admitted",
        }),

        Bed.countDocuments(),

        Bed.countDocuments({
            status: "Available",
        }),

        Bed.countDocuments({
            status: "Occupied",
        }),

        LaboratoryTest.countDocuments(),

        Billing.aggregate([
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: "$totalAmount",
                    },
                },
            },
        ]),
    ]);


    const occupancyRate =
        totalBeds === 0
            ? 0
            : Number(
                (
                    (occupiedBeds / totalBeds) *
                    100
                ).toFixed(2)
            );


    return {
        patients: {
            total: totalPatients,
            active: activePatients,
        },

        doctors: {
            total: totalDoctors,
            active: activeDoctors,
        },

        appointments: {
            total: totalAppointments,
        },

        admissions: {
            active: activeAdmissions,
        },

        beds: {
            total: totalBeds,
            available: availableBeds,
            occupied: occupiedBeds,
            occupancyRate,
        },

        laboratory: {
            totalTests: totalLaboratoryTests,
        },

        revenue: {
            total:
                totalRevenue.length > 0
                    ? totalRevenue[0].total
                    : 0,
        },
    };
};


module.exports = {
    getDashboardStatistics,
};