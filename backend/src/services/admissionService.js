const Admission = require("../models/Admission");
const Patient = require("../models/Patient");
const Bed = require("../models/Bed");
const ApiError = require("../utils/ApiError");

class AdmissionService {

    /**
     * ==========================================
     * ADMIT PATIENT
     * ==========================================
     */
    async createAdmission(data) {

        // Check patient exists
        const patient = await Patient.findById(data.patient);

        if (!patient) {
            throw new ApiError(
                404,
                "Patient not found"
            );
        }

        // Check bed exists
        const bed = await Bed.findById(data.bed);

        if (!bed) {
            throw new ApiError(
                404,
                "Bed not found"
            );
        }

        // Ensure bed is available
        if (bed.status !== "Available") {
            throw new ApiError(
                400,
                "Selected bed is not available"
            );
        }

        // Prevent duplicate active admission
        const existingAdmission = await Admission.findOne({
            patient: data.patient,
            status: "Admitted"
        });

        if (existingAdmission) {
            throw new ApiError(
                409,
                "Patient is already admitted"
            );
        }

        const admission = await Admission.create(data);

        // Occupy the bed
        bed.status = "Occupied";
        await bed.save();

        return await Admission.findById(admission._id)
            .populate("patient")
            .populate({
                path: "bed",
                populate: {
                    path: "ward"
                }
            });
    }

    /**
     * ==========================================
     * GET ALL ADMISSIONS
     * ==========================================
     */
    async getAllAdmissions() {

        return await Admission.find()
            .populate("patient")
            .populate({
                path: "bed",
                populate: {
                    path: "ward"
                }
            })
            .sort({
                admissionDate: -1
            });

    }

    /**
     * ==========================================
     * GET ADMISSION BY ID
     * ==========================================
     */
    async getAdmissionById(id) {

        const admission = await Admission.findById(id)
            .populate("patient")
            .populate({
                path: "bed",
                populate: {
                    path: "ward"
                }
            });

        if (!admission) {
            throw new ApiError(
                404,
                "Admission not found"
            );
        }

        return admission;
    }

    /**
     * ==========================================
     * UPDATE ADMISSION
     * ==========================================
     */
    async updateAdmission(id, data) {

        const admission = await Admission.findById(id);

        if (!admission) {
            throw new ApiError(
                404,
                "Admission not found"
            );
        }

        const updatedAdmission =
            await Admission.findByIdAndUpdate(
                id,
                data,
                {
                    new: true,
                    runValidators: true
                }
            )
                .populate("patient")
                .populate({
                    path: "bed",
                    populate: {
                        path: "ward"
                    }
                });

        return updatedAdmission;
    }

    /**
     * ==========================================
     * DISCHARGE PATIENT
     * ==========================================
     */
    async dischargePatient(id) {

        const admission = await Admission.findById(id);

        if (!admission) {
            throw new ApiError(
                404,
                "Admission not found"
            );
        }

        if (admission.status === "Discharged") {
            throw new ApiError(
                400,
                "Patient has already been discharged"
            );
        }

        admission.status = "Discharged";
        admission.dischargeDate = new Date();

        await admission.save();

        // Free the bed
        const bed = await Bed.findById(admission.bed);

        if (bed) {
            bed.status = "Available";
            await bed.save();
        }

        return await Admission.findById(admission._id)
            .populate("patient")
            .populate({
                path: "bed",
                populate: {
                    path: "ward"
                }
            });
    }

    /**
     * ==========================================
     * DELETE ADMISSION
     * ==========================================
     */
    async deleteAdmission(id) {

        const admission = await Admission.findById(id);

        if (!admission) {
            throw new ApiError(
                404,
                "Admission not found"
            );
        }

        await Admission.findByIdAndDelete(id);

        return true;
    }

}

module.exports = new AdmissionService();