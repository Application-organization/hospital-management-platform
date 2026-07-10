const express = require("express");

const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const patientRoutes = require("./patientRoutes");
const doctorRoutes = require("./doctorRoutes");

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

module.exports = router;