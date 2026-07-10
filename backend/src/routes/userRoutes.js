const express = require("express");

const authenticate = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorize");
const userController = require("../controllers/userController");

const router = express.Router();

/*
|--------------------------------------------------------------------------
| User Profile
|--------------------------------------------------------------------------
*/

router.get(
  "/profile",
  authenticate,
  userController.getProfile
);

/*
|--------------------------------------------------------------------------
| Admin Dashboard
|--------------------------------------------------------------------------
*/

router.get(
  "/admin/dashboard",
  authenticate,
  authorize("admin"),
  userController.getAdminDashboard
);

module.exports = router;