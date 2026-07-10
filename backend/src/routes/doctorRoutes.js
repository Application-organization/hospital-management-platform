const express = require("express");
const router = express.Router();

const {
    createDoctor,
    getAllDoctors,
    getDoctorById,
    updateDoctor,
    deleteDoctor,
} = require("../controllers/doctorController");

const authMiddleware = require("../middleware/authMiddleware");

// Create Doctor
router.post("/", authMiddleware, createDoctor);

// Get All Doctors
router.get("/", authMiddleware, getAllDoctors);

// Get Doctor By ID
router.get("/:id", authMiddleware, getDoctorById);

// Update Doctor
router.put("/:id", authMiddleware, updateDoctor);

// Delete Doctor
router.delete("/:id", authMiddleware, deleteDoctor);

module.exports = router;