const bedService = require("../../../src/services/bedService");
const Bed = require("../../../src/models/Bed");
const Ward = require("../../../src/models/Ward");
const ApiError = require("../../../src/utils/ApiError");

jest.mock("../../../src/models/Bed");
jest.mock("../../../src/models/Ward");

describe("BedService", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("createBed", () => {

        it("should create a bed when the ward exists and the bed number is unique", async () => {

            const data = {
                ward: "ward123",
                bedNumber: "B-001",
                status: "Available"
            };

            const createdBed = {
                _id: "bed123",
                ...data
            };

            const populatedBed = {
                ...createdBed,
                ward: {
                    _id: "ward123",
                    name: "General Ward"
                }
            };

            Ward.findById.mockResolvedValue({
                _id: "ward123",
                name: "General Ward"
            });

            Bed.findOne.mockResolvedValue(null);

            Bed.create.mockResolvedValue(createdBed);

            Bed.findById.mockReturnValue({
                populate: jest.fn().mockResolvedValue(populatedBed)
            });

            const result = await bedService.createBed(data);

            expect(Ward.findById).toHaveBeenCalledWith("ward123");

            expect(Bed.findOne).toHaveBeenCalledWith({
                ward: "ward123",
                bedNumber: "B-001"
            });

            expect(Bed.create).toHaveBeenCalledWith(data);

            expect(result).toEqual(populatedBed);
        });

        it("should throw 404 when the ward does not exist", async () => {

            Ward.findById.mockResolvedValue(null);

            await expect(
                bedService.createBed({
                    ward: "invalid-ward",
                    bedNumber: "B-001"
                })
            ).rejects.toEqual(
                new ApiError(404, "Ward not found")
            );

            expect(Bed.findOne).not.toHaveBeenCalled();

            expect(Bed.create).not.toHaveBeenCalled();
        });

        it("should throw 409 when the bed number already exists in the ward", async () => {

            Ward.findById.mockResolvedValue({
                _id: "ward123"
            });

            Bed.findOne.mockResolvedValue({
                _id: "existing-bed"
            });

            await expect(
                bedService.createBed({
                    ward: "ward123",
                    bedNumber: "B-001"
                })
            ).rejects.toEqual(
                new ApiError(
                    409,
                    "Bed number already exists in this ward"
                )
            );

            expect(Bed.create).not.toHaveBeenCalled();
        });

    });

    describe("getAllBeds", () => {

        it("should return all beds populated with their wards", async () => {

            const beds = [
                {
                    _id: "bed1",
                    bedNumber: "B-001"
                },
                {
                    _id: "bed2",
                    bedNumber: "B-002"
                }
            ];

            const sort = jest.fn().mockResolvedValue(beds);

            const populate = jest.fn().mockReturnValue({
                sort
            });

            Bed.find.mockReturnValue({
                populate
            });

            const result = await bedService.getAllBeds();

            expect(Bed.find).toHaveBeenCalledWith();

            expect(populate).toHaveBeenCalledWith("ward");

            expect(sort).toHaveBeenCalledWith({
                createdAt: -1
            });

            expect(result).toEqual(beds);
        });

    });

    describe("getBedById", () => {

        it("should return a bed when it exists", async () => {

            const bed = {
                _id: "bed123",
                bedNumber: "B-001"
            };

            const populate = jest.fn().mockResolvedValue(bed);

            Bed.findById.mockReturnValue({
                populate
            });

            const result = await bedService.getBedById("bed123");

            expect(Bed.findById).toHaveBeenCalledWith("bed123");

            expect(populate).toHaveBeenCalledWith("ward");

            expect(result).toEqual(bed);
        });

        it("should throw 404 when the bed does not exist", async () => {

            Bed.findById.mockReturnValue({
                populate: jest.fn().mockResolvedValue(null)
            });

            await expect(
                bedService.getBedById("missing-bed")
            ).rejects.toEqual(
                new ApiError(404, "Bed not found")
            );
        });

    });

    describe("getBedsByWard", () => {

        it("should return all beds belonging to a ward", async () => {

            Ward.findById.mockResolvedValue({
                _id: "ward123"
            });

            const beds = [
                {
                    _id: "bed1",
                    bedNumber: "B-001"
                }
            ];

            const sort = jest.fn().mockResolvedValue(beds);

            const populate = jest.fn().mockReturnValue({
                sort
            });

            Bed.find.mockReturnValue({
                populate
            });

            const result = await bedService.getBedsByWard("ward123");

            expect(Ward.findById).toHaveBeenCalledWith("ward123");

            expect(Bed.find).toHaveBeenCalledWith({
                ward: "ward123"
            });

            expect(populate).toHaveBeenCalledWith("ward");

            expect(sort).toHaveBeenCalledWith({
                bedNumber: 1
            });

            expect(result).toEqual(beds);
        });

        it("should throw 404 when the ward does not exist", async () => {

            Ward.findById.mockResolvedValue(null);

            await expect(
                bedService.getBedsByWard("missing-ward")
            ).rejects.toEqual(
                new ApiError(404, "Ward not found")
            );

            expect(Bed.find).not.toHaveBeenCalled();
        });

    });

    describe("getAvailableBeds", () => {

        it("should return only available beds", async () => {

            const beds = [
                {
                    _id: "bed1",
                    status: "Available"
                }
            ];

            const sort = jest.fn().mockResolvedValue(beds);

            const populate = jest.fn().mockReturnValue({
                sort
            });

            Bed.find.mockReturnValue({
                populate
            });

            const result = await bedService.getAvailableBeds();

            expect(Bed.find).toHaveBeenCalledWith({
                status: "Available"
            });

            expect(populate).toHaveBeenCalledWith("ward");

            expect(sort).toHaveBeenCalledWith({
                bedNumber: 1
            });

            expect(result).toEqual(beds);
        });

    });

    describe("updateBed", () => {

        it("should update and return a bed", async () => {

            const existingBed = {
                _id: "bed123",
                ward: "ward123",
                bedNumber: "B-001"
            };

            const updatedBed = {
                _id: "bed123",
                ward: "ward123",
                bedNumber: "B-002"
            };

            Bed.findById.mockResolvedValue(existingBed);

            // No other bed has this ward + bed number combination
            Bed.findOne.mockResolvedValue(null);

            const populate = jest.fn().mockResolvedValue(updatedBed);

            Bed.findByIdAndUpdate.mockReturnValue({
                populate
            });

            const result = await bedService.updateBed(
                "bed123",
                {
                    bedNumber: "B-002"
                }
            );

            expect(Bed.findById).toHaveBeenCalledWith("bed123");

            expect(Bed.findOne).toHaveBeenCalledWith({
                _id: { $ne: "bed123" },
                ward: "ward123",
                bedNumber: "B-002"
            });

            expect(Bed.findByIdAndUpdate).toHaveBeenCalledWith(
                "bed123",
                {
                    bedNumber: "B-002"
                },
                {
                    new: true,
                    runValidators: true
                }
            );

            expect(populate).toHaveBeenCalledWith("ward");

            expect(result).toEqual(updatedBed);
        });

        it("should throw 404 when the bed does not exist", async () => {

            Bed.findById.mockResolvedValue(null);

            await expect(
                bedService.updateBed("missing-bed", {})
            ).rejects.toEqual(
                new ApiError(404, "Bed not found")
            );
        });

        it("should throw 409 when the updated bed number already exists in the ward", async () => {

            const existingBed = {
                _id: "bed123",
                ward: "ward123",
                bedNumber: "B-001"
            };

            Bed.findById.mockResolvedValue(existingBed);

            Bed.findOne.mockResolvedValue({
                _id: "another-bed"
            });

            await expect(
                bedService.updateBed(
                    "bed123",
                    {
                        bedNumber: "B-002"
                    }
                )
            ).rejects.toEqual(
                new ApiError(
                    409,
                    "Bed number already exists in this ward"
                )
            );

            expect(Bed.findByIdAndUpdate).not.toHaveBeenCalled();
        });

    });

    describe("deleteBed", () => {

        it("should delete an available bed", async () => {

            Bed.findById.mockResolvedValue({
                _id: "bed123",
                status: "Available"
            });

            Bed.findByIdAndDelete.mockResolvedValue({
                _id: "bed123"
            });

            const result = await bedService.deleteBed("bed123");

            expect(Bed.findById).toHaveBeenCalledWith("bed123");

            expect(Bed.findByIdAndDelete).toHaveBeenCalledWith("bed123");

            expect(result).toBe(true);
        });

        it("should throw 404 when the bed does not exist", async () => {

            Bed.findById.mockResolvedValue(null);

            await expect(
                bedService.deleteBed("missing-bed")
            ).rejects.toEqual(
                new ApiError(404, "Bed not found")
            );

            expect(Bed.findByIdAndDelete).not.toHaveBeenCalled();
        });

        it("should prevent deleting an occupied bed", async () => {

            Bed.findById.mockResolvedValue({
                _id: "bed123",
                status: "Occupied"
            });

            await expect(
                bedService.deleteBed("bed123")
            ).rejects.toEqual(
                new ApiError(
                    400,
                    "Cannot delete an occupied bed"
                )
            );

            expect(Bed.findByIdAndDelete).not.toHaveBeenCalled();
        });

    });

});