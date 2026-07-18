const wardService = require("../services/wardService");
const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

class WardController {

    /**
     * ==========================================
     * CREATE WARD
     * ==========================================
     */
    createWard = asyncHandler(async (req, res) => {

        const ward = await wardService.createWard(req.body);

        return ApiResponse.success(
            res,
            "Ward created successfully",
            ward,
            201
        );

    });

    /**
     * ==========================================
     * GET ALL WARDS
     * ==========================================
     */
    getAllWards = asyncHandler(async (req, res) => {

        const wards = await wardService.getAllWards();

        return ApiResponse.success(
            res,
            "Wards retrieved successfully",
            wards,
            200
        );

    });

    /**
     * ==========================================
     * GET WARD BY ID
     * ==========================================
     */
    getWardById = asyncHandler(async (req, res) => {

        const ward = await wardService.getWardById(
            req.params.id
        );

        return ApiResponse.success(
            res,
            "Ward retrieved successfully",
            ward,
            200
        );

    });

    /**
     * ==========================================
     * UPDATE WARD
     * ==========================================
     */
    updateWard = asyncHandler(async (req, res) => {

        const ward = await wardService.updateWard(
            req.params.id,
            req.body
        );

        return ApiResponse.success(
            res,
            "Ward updated successfully",
            ward,
            200
        );

    });

    /**
     * ==========================================
     * DELETE WARD
     * ==========================================
     */
    deleteWard = asyncHandler(async (req, res) => {

        await wardService.deleteWard(
            req.params.id
        );

        return ApiResponse.success(
            res,
            "Ward deleted successfully",
            null,
            200
        );

    });

}

module.exports = new WardController();