const express = require("express");

const authenticate = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorize");
const validateRequest = require("../middleware/validateRequest");

const patientController = require("../controllers/patientController");

const {
  createPatientValidation,
  updatePatientValidation,
} = require("../validators/patientValidation");

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Create Patient
|--------------------------------------------------------------------------
*/
router.post(
  "/",
  authenticate,
  authorize("admin"),
  createPatientValidation,
  validateRequest,
  patientController.createPatient
);

/*
|--------------------------------------------------------------------------
| Get All Patients
|--------------------------------------------------------------------------
*/
router.get(
  "/",
  authenticate,
  authorize("admin", "doctor"),
  patientController.getAllPatients
);

/*
|--------------------------------------------------------------------------
| Get Patient By ID
|--------------------------------------------------------------------------
*/
router.get(
  "/:id",
  authenticate,
  authorize("admin", "doctor"),
  patientController.getPatientById
);

/*
|--------------------------------------------------------------------------
| Update Patient
|--------------------------------------------------------------------------
*/
router.put(
  "/:id",
  authenticate,
  authorize("admin"),
  updatePatientValidation,
  validateRequest,
  patientController.updatePatient
);

/*
|--------------------------------------------------------------------------
| Soft Delete Patient
|--------------------------------------------------------------------------
*/
router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  patientController.deletePatient
);

module.exports = router;