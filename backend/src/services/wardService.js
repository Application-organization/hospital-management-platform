const Ward = require("../models/Ward");
const ApiError = require("../utils/ApiError");

class WardService {

    /**
     * ==========================================
     * CREATE WARD
     * ==========================================
     */
    async createWard(data) {

        const existingWard = await Ward.findOne({
            name: {
                $regex: `^${data.name.trim()}$`,
                $options: "i"
            }
        });

        if (existingWard) {
            throw new ApiError(
                409,
                "Ward already exists"
            );
        }

        const ward = await Ward.create({
            ...data,
            name: data.name.trim()
        });

        return ward;
    }

    /**
     * ==========================================
     * GET ALL WARDS
     * ==========================================
     */
    async getAllWards() {

        const wards = await Ward.find()
            .sort({
                createdAt: -1
            });

        return wards;
    }

    /**
     * ==========================================
     * GET WARD BY ID
     * ==========================================
     */
    async getWardById(id) {

        const ward = await Ward.findById(id);

        if (!ward) {
            throw new ApiError(
                404,
                "Ward not found"
            );
        }

        return ward;
    }

    /**
     * ==========================================
     * UPDATE WARD
     * ==========================================
     */
    async updateWard(id, data) {

        const ward = await Ward.findById(id);

        if (!ward) {
            throw new ApiError(
                404,
                "Ward not found"
            );
        }

        const updatedWard = await Ward.findByIdAndUpdate(
            id,
            {
                ...data,
                ...(data.name && {
                    name: data.name.trim()
                })
            },
            {
                new: true,
                runValidators: true
            }
        );

        return updatedWard;
    }

    /**
     * ==========================================
     * DELETE WARD
     * ==========================================
     */
    async deleteWard(id) {

        const ward = await Ward.findById(id);

        if (!ward) {
            throw new ApiError(
                404,
                "Ward not found"
            );
        }

        await Ward.findByIdAndDelete(id);

        return true;
    }

}

module.exports = new WardService();