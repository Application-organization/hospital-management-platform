const admissionService = require("../services/admissionService");

class AdmissionController {

    /**
     * ==========================================
     * CREATE ADMISSION
     * ==========================================
     */
    async createAdmission(req, res, next) {

        try {

            const admission =
                await admissionService.createAdmission(req.body);

            res.status(201).json({

                success: true,

                message: "Patient admitted successfully",

                data: admission,

            });

        } catch (error) {

            next(error);

        }

    }

    /**
     * ==========================================
     * GET ALL ADMISSIONS
     * ==========================================
     */
    async getAllAdmissions(req, res, next) {

        try {

            const admissions =
                await admissionService.getAllAdmissions();

            res.status(200).json({

                success: true,

                message: "Admissions retrieved successfully",

                data: admissions,

            });

        } catch (error) {

            next(error);

        }

    }

    /**
     * ==========================================
     * GET ADMISSION BY ID
     * ==========================================
     */
    async getAdmissionById(req, res, next) {

        try {

            const admission =
                await admissionService.getAdmissionById(
                    req.params.id
                );

            res.status(200).json({

                success: true,

                message: "Admission retrieved successfully",

                data: admission,

            });

        } catch (error) {

            next(error);

        }

    }

    /**
     * ==========================================
     * UPDATE ADMISSION
     * ==========================================
     */
    async updateAdmission(req, res, next) {

        try {

            const admission =
                await admissionService.updateAdmission(
                    req.params.id,
                    req.body
                );

            res.status(200).json({

                success: true,

                message: "Admission updated successfully",

                data: admission,

            });

        } catch (error) {

            next(error);

        }

    }

    /**
     * ==========================================
     * DISCHARGE PATIENT
     * ==========================================
     */
    async dischargePatient(req, res, next) {

        try {

            const admission =
                await admissionService.dischargePatient(
                    req.params.id
                );

            res.status(200).json({

                success: true,

                message: "Patient discharged successfully",

                data: admission,

            });

        } catch (error) {

            next(error);

        }

    }

    /**
     * ==========================================
     * DELETE ADMISSION
     * ==========================================
     */
    async deleteAdmission(req, res, next) {

        try {

            await admissionService.deleteAdmission(
                req.params.id
            );

            res.status(200).json({

                success: true,

                message: "Admission deleted successfully",

                data: null,

            });

        } catch (error) {

            next(error);

        }

    }

}

module.exports = new AdmissionController();