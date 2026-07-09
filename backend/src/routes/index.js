const express = require("express");
const ApiResponse = require("../utils/ApiResponse");

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

module.exports = router;