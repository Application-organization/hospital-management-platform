const express = require("express");

const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const ApiResponse = require("../utils/ApiResponse");

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Health Check
|--------------------------------------------------------------------------
*/

router.get("/health", (req, res) => {
  return ApiResponse.success(
    res,
    "Hospital Management API is running",
    {
      status: "UP",
      timestamp: new Date(),
    }
  );
});

/*
|--------------------------------------------------------------------------
| Authentication Routes
|--------------------------------------------------------------------------
*/

router.use("/auth", authRoutes);

/*
|--------------------------------------------------------------------------
| User Routes
|--------------------------------------------------------------------------
*/

router.use("/users", userRoutes);

module.exports = router;