const express = require("express");

const router = express.Router();

const doctorController = require("../controllers/doctorController");

const authMiddleware = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorize");
const validateRequest = require("../middleware/validateRequest");

const {
  createDoctorValidation,
  updateDoctorValidation,
} = require("../validators/doctorValidation");

/*
|--------------------------------------------------------------------------
| Create Doctor
|--------------------------------------------------------------------------
*/
router.post(
  "/",
  authMiddleware,
  authorize("admin"),
  createDoctorValidation,
  validateRequest,
  doctorController.createDoctor
);

/*
|--------------------------------------------------------------------------
| Get All Doctors
|--------------------------------------------------------------------------
*/
router.get(
  "/",
  authMiddleware,
  authorize("admin", "doctor"),
  doctorController.getAllDoctors
);

/*
|--------------------------------------------------------------------------
| Get Doctor By ID
|--------------------------------------------------------------------------
*/
router.get(
  "/:id",
  authMiddleware,
  authorize("admin", "doctor"),
  doctorController.getDoctorById
);

/*
|--------------------------------------------------------------------------
| Update Doctor
|--------------------------------------------------------------------------
*/
router.put(
  "/:id",
  authMiddleware,
  authorize("admin"),
  updateDoctorValidation,
  validateRequest,
  doctorController.updateDoctor
);

/*
|--------------------------------------------------------------------------
| Delete Doctor
|--------------------------------------------------------------------------
*/
router.delete(
  "/:id",
  authMiddleware,
  authorize("admin"),
  doctorController.deleteDoctor
);

module.exports = router;