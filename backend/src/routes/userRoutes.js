const express = require("express");

const authenticate = require("../middleware/authMiddleware");
const userController = require("../controllers/userController");

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Protected Routes
|--------------------------------------------------------------------------
*/

router.get("/profile", authenticate, userController.getProfile);

module.exports = router;