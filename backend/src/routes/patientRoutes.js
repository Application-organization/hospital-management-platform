const express = require("express");

const authenticate = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorize");
const validate = require("../middleware/validate");

const patientController = require("../controllers/patientController");

const {
  createPatientSchema,
} = require("../validators/patientValidator");

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Patient Routes
|--------------------------------------------------------------------------
*/

/*
|--------------------------------------------------------------------------
| Create Patient
| Roles: admin
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
| Roles: admin, doctor
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
| Roles: admin, doctor
|--------------------------------------------------------------------------
*/
router.get(
  "/:id",
  authenticate,
  authorize("admin", "doctor"),
  patientController.getPatientById
);

module.exports = router;