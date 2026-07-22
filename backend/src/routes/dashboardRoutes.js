const express = require("express");

const router = express.Router();

const dashboardController = require("../controllers/dashboardController");


// Dashboard Statistics
router.get(
    "/",
    dashboardController.getDashboardStatistics
);


module.exports = router;