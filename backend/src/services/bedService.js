const Bed = require("../models/Bed");
const Ward = require("../models/Ward");
const ApiError = require("../utils/ApiError");

class BedService {

    /**
     * ==========================================
     * CREATE BED
     * ==========================================
     */
    async createBed(data) {

        // Check if ward exists
        const ward = await Ward.findById(data.ward);

        if (!ward) {
            throw new ApiError(
                404,
                "Ward not found"
            );
        }

        // Check duplicate bed number within the ward
        const existingBed = await Bed.findOne({
            ward: data.ward,
            bedNumber: data.bedNumber
        });

        if (existingBed) {
            throw new ApiError(
                409,
                "Bed number already exists in this ward"
            );
        }

        const bed = await Bed.create(data);

        return await Bed.findById(bed._id)
            .populate("ward");
    }

    /**
     * ==========================================
     * GET ALL BEDS
     * ==========================================
     */
    async getAllBeds() {

        return await Bed.find()
            .populate("ward")
            .sort({
                createdAt: -1
            });
    }

    /**
     * ==========================================
     * GET BED BY ID
     * ==========================================
     */
    async getBedById(id) {

        const bed = await Bed.findById(id)
            .populate("ward");

        if (!bed) {
            throw new ApiError(
                404,
                "Bed not found"
            );
        }

        return bed;
    }

    /**
     * ==========================================
     * GET BEDS BY WARD
     * ==========================================
     */
    async getBedsByWard(wardId) {

        const ward = await Ward.findById(wardId);

        if (!ward) {
            throw new ApiError(
                404,
                "Ward not found"
            );
        }

        return await Bed.find({
            ward: wardId
        })
            .populate("ward")
            .sort({
                bedNumber: 1
            });
    }

    /**
     * ==========================================
     * GET AVAILABLE BEDS
     * ==========================================
     */
    async getAvailableBeds() {

        return await Bed.find({
            status: "Available"
        })
            .populate("ward")
            .sort({
                bedNumber: 1
            });
    }

    /**
     * ==========================================
     * UPDATE BED
     * ==========================================
     */
    async updateBed(id, data) {

        const bed = await Bed.findById(id);

        if (!bed) {
            throw new ApiError(
                404,
                "Bed not found"
            );
        }

        // If ward or bed number changes, ensure uniqueness
        if (data.ward || data.bedNumber) {

            const wardId = data.ward || bed.ward;
            const bedNumber = data.bedNumber || bed.bedNumber;

            const existingBed = await Bed.findOne({
                _id: { $ne: id },
                ward: wardId,
                bedNumber: bedNumber
            });

            if (existingBed) {
                throw new ApiError(
                    409,
                    "Bed number already exists in this ward"
                );
            }
        }

        const updatedBed = await Bed.findByIdAndUpdate(
            id,
            data,
            {
                new: true,
                runValidators: true
            }
        ).populate("ward");

        return updatedBed;
    }

    /**
     * ==========================================
     * DELETE BED
     * ==========================================
     */
    async deleteBed(id) {

        const bed = await Bed.findById(id);

        if (!bed) {
            throw new ApiError(
                404,
                "Bed not found"
            );
        }

        // Prevent deleting occupied beds
        if (bed.status === "Occupied") {
            throw new ApiError(
                400,
                "Cannot delete an occupied bed"
            );
        }

        await Bed.findByIdAndDelete(id);

        return true;
    }

}

module.exports = new BedService();