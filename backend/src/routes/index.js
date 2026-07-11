const express = require("express");

const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const patientRoutes = require("./patientRoutes");
const doctorRoutes = require("./doctorRoutes");
const appointmentRoutes = require("./appointmentRoutes");

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

module.exports = router;