const express = require("express");

const authenticate = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorize");
const validate = require("../middleware/validate");

const patientController = require("../controllers/patientController");

const {
  createPatientSchema,
  updatePatientSchema,
} = require("../validators/patientValidator");

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Create Patient
|--------------------------------------------------------------------------
*/
router.post(
  "/",
  validate(createPatientSchema),
  authenticate,
  authorize("admin"),
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
  validate(updatePatientSchema),
  authenticate,
  authorize("admin"),
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