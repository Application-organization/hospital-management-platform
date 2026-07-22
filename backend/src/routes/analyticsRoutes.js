const express = require("express");

const router = express.Router();

const analyticsController = require("../controllers/analyticsController");

/*
|--------------------------------------------------------------------------
| Analytics Routes
|--------------------------------------------------------------------------
*/

router.get(
    "/monthly-admissions",
    analyticsController.getMonthlyAdmissions
);

router.get(
    "/monthly-revenue",
    analyticsController.getMonthlyRevenue
);

router.get(
    "/bed-occupancy",
    analyticsController.getBedOccupancyStatistics
);

router.get(
    "/appointment-statistics",
    analyticsController.getAppointmentStatistics
);

router.get(
    "/laboratory-statistics",
    analyticsController.getLaboratoryStatistics
);

router.get(
    "/doctor-statistics",
    analyticsController.getDoctorStatistics
);

module.exports = router;