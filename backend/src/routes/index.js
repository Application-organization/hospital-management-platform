const express = require("express");
const ApiResponse = require("../utils/ApiResponse");
const authRoutes = require("./authRoutes");

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Health Check
|--------------------------------------------------------------------------
*/

router.get("/health", (req, res) => {
  ApiResponse.success(res, "Hospital Management API is running", {
    status: "UP",
    timestamp: new Date().toISOString(),
  });
});

/*
|--------------------------------------------------------------------------
| Authentication
|--------------------------------------------------------------------------
*/

router.use("/auth", authRoutes);

module.exports = router;