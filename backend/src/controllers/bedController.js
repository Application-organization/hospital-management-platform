const bedService = require("../services/bedService");

class BedController {

    /**
     * ==========================================
     * CREATE BED
     * ==========================================
     */
    async createBed(req, res, next) {

        try {

            const bed =
                await bedService.createBed(req.body);

            res.status(201).json({

                success: true,

                message: "Bed created successfully",

                data: bed,

            });

        } catch (error) {

            next(error);

        }

    }

    /**
     * ==========================================
     * GET ALL BEDS
     * ==========================================
     */
    async getAllBeds(req, res, next) {

        try {

            const beds =
                await bedService.getAllBeds();

            res.status(200).json({

                success: true,

                message: "Beds retrieved successfully",

                data: beds,

            });

        } catch (error) {

            next(error);

        }

    }

        /**
     * ==========================================
     * GET BED BY ID
     * ==========================================
     */
    async getBedById(req, res, next) {

        try {

            const bed =
                await bedService.getBedById(req.params.id);

            res.status(200).json({

                success: true,

                message: "Bed retrieved successfully",

                data: bed,

            });

        } catch (error) {

            next(error);

        }

    }

    /**
     * ==========================================
     * GET BEDS BY WARD
     * ==========================================
     */
    async getBedsByWard(req, res, next) {

        try {

            const beds =
                await bedService.getBedsByWard(req.params.wardId);

            res.status(200).json({

                success: true,

                message: "Ward beds retrieved successfully",

                data: beds,

            });

        } catch (error) {

            next(error);

        }

    }

    /**
     * ==========================================
     * GET AVAILABLE BEDS
     * ==========================================
     */
    async getAvailableBeds(req, res, next) {

        try {

            const beds =
                await bedService.getAvailableBeds();

            res.status(200).json({

                success: true,

                message: "Available beds retrieved successfully",

                data: beds,

            });

        } catch (error) {

            next(error);

        }

    }

    /**
     * ==========================================
     * UPDATE BED
     * ==========================================
     */
    async updateBed(req, res, next) {

        try {

            const bed =
                await bedService.updateBed(
                    req.params.id,
                    req.body
                );

            res.status(200).json({

                success: true,

                message: "Bed updated successfully",

                data: bed,

            });

        } catch (error) {

            next(error);

        }

    }

    /**
     * ==========================================
     * DELETE BED
     * ==========================================
     */
    async deleteBed(req, res, next) {

        try {

            await bedService.deleteBed(req.params.id);

            res.status(200).json({

                success: true,

                message: "Bed deleted successfully",

                data: null,

            });

        } catch (error) {

            next(error);

        }

    }

}

module.exports = new BedController();