const express = require("express");

const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const patientRoutes = require("./patientRoutes");
const doctorRoutes = require("./doctorRoutes");
const appointmentRoutes = require("./appointmentRoutes");
const medicalRecordRoutes = require("./medicalRecordRoutes");
const laboratoryTestRoutes = require("./laboratoryTestRoutes");
const medicationRoutes = require("./medicationRoutes");
const billingRoutes = require("./billingRoutes");
const wardRoutes = require("./wardRoutes");
const bedRoutes = require("./bedRoutes");
const admissionRoutes = require("./admissionRoutes");
const dashboardRoutes = require("./dashboardRoutes");
const analyticsRoutes = require("./analyticsRoutes");
const healthRoutes = require("./healthRoutes");

const router = express.Router();

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

router.use("/auth", authRoutes);

router.use("/users", userRoutes);

router.use("/patients", patientRoutes);

router.use("/doctors", doctorRoutes);

router.use("/appointments", appointmentRoutes);

router.use("/medical-records", medicalRecordRoutes);

router.use("/laboratory-tests", laboratoryTestRoutes);

router.use("/medications", medicationRoutes);

router.use("/billings", billingRoutes);

router.use("/wards", wardRoutes);

router.use("/beds", bedRoutes);

router.use("/admissions", admissionRoutes);

router.use("/dashboard", dashboardRoutes);

router.use("/analytics", analyticsRoutes);

router.use("/health", healthRoutes);


module.exports = router;