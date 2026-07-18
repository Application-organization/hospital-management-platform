const express = require("express");

const wardController = require("../controllers/wardController");


const router = express.Router();


// Create Ward
router.post(
    "/",
    wardController.createWard
);


// Get All Wards
router.get(
    "/",
    wardController.getAllWards
);


// Get Single Ward
router.get(
    "/:id",
    wardController.getWardById
);


// Update Ward
router.patch(
    "/:id",
    wardController.updateWard
);


// Delete Ward
router.delete(
    "/:id",
    wardController.deleteWard
);


module.exports = router;