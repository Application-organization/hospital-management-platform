const express = require("express");

const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const patientRoutes = require("./patientRoutes");
const doctorRoutes = require("./doctorRoutes");
const appointmentRoutes = require("./appointmentRoutes");
const medicalRecordRoutes = require("./medicalRecordRoutes");
const laboratoryTestRoutes = require("./laboratoryTestRoutes");

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

module.exports = router;