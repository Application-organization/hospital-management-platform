const Ward = require("../../../src/models/Ward");
const ApiError = require("../../../src/utils/ApiError");
const wardService = require("../../../src/services/wardService");

jest.mock("../../../src/models/Ward");

describe("WardService", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("createWard", () => {
        it("should create a new ward successfully", async () => {
            Ward.findOne.mockResolvedValue(null);

            const createdWard = {
                _id: "ward-123",
                name: "Cardiology",
                capacity: 20,
            };

            Ward.create.mockResolvedValue(createdWard);

            const result = await wardService.createWard({
                name: "  Cardiology  ",
                capacity: 20,
            });

            expect(Ward.findOne).toHaveBeenCalledWith({
                name: {
                    $regex: "^Cardiology$",
                    $options: "i",
                },
            });

            expect(Ward.create).toHaveBeenCalledWith({
                name: "Cardiology",
                capacity: 20,
            });

            expect(result).toEqual(createdWard);
        });

        it("should throw a 409 error when the ward already exists", async () => {
            Ward.findOne.mockResolvedValue({
                _id: "existing-ward",
                name: "Cardiology",
            });

            await expect(
                wardService.createWard({
                    name: " Cardiology ",
                    capacity: 20,
                })
            ).rejects.toMatchObject({
                statusCode: 409,
                message: "Ward already exists",
            });

            expect(Ward.create).not.toHaveBeenCalled();
        });
    });

    describe("getAllWards", () => {
        it("should return all wards sorted by newest first", async () => {
            const wards = [
                {
                    _id: "ward-1",
                    name: "Emergency",
                },
                {
                    _id: "ward-2",
                    name: "Cardiology",
                },
            ];

            const sortMock = jest.fn().mockResolvedValue(wards);

            Ward.find.mockReturnValue({
                sort: sortMock,
            });

            const result = await wardService.getAllWards();

            expect(Ward.find).toHaveBeenCalledWith();

            expect(sortMock).toHaveBeenCalledWith({
                createdAt: -1,
            });

            expect(result).toEqual(wards);
        });
    });

    describe("getWardById", () => {
        it("should return a ward when the ward exists", async () => {
            const ward = {
                _id: "ward-123",
                name: "Cardiology",
            };

            Ward.findById.mockResolvedValue(ward);

            const result = await wardService.getWardById("ward-123");

            expect(Ward.findById).toHaveBeenCalledWith("ward-123");
            expect(result).toEqual(ward);
        });

        it("should throw a 404 error when the ward does not exist", async () => {
            Ward.findById.mockResolvedValue(null);

            await expect(
                wardService.getWardById("missing-ward")
            ).rejects.toMatchObject({
                statusCode: 404,
                message: "Ward not found",
            });
        });
    });

    describe("updateWard", () => {
        it("should throw a 404 error when the ward does not exist", async () => {
            Ward.findById.mockResolvedValue(null);

            await expect(
                wardService.updateWard("missing-ward", {
                    name: "Updated Ward",
                })
            ).rejects.toMatchObject({
                statusCode: 404,
                message: "Ward not found",
            });

            expect(Ward.findByIdAndUpdate).not.toHaveBeenCalled();
        });

        it("should update a ward and trim the name", async () => {
            const existingWard = {
                _id: "ward-123",
                name: "Old Ward",
            };

            const updatedWard = {
                _id: "ward-123",
                name: "Updated Ward",
            };

            Ward.findById.mockResolvedValue(existingWard);
            Ward.findByIdAndUpdate.mockResolvedValue(updatedWard);

            const result = await wardService.updateWard(
                "ward-123",
                {
                    name: "  Updated Ward  ",
                    capacity: 30,
                }
            );

            expect(Ward.findById).toHaveBeenCalledWith("ward-123");

            expect(Ward.findByIdAndUpdate).toHaveBeenCalledWith(
                "ward-123",
                {
                    name: "Updated Ward",
                    capacity: 30,
                },
                {
                    new: true,
                    runValidators: true,
                }
            );

            expect(result).toEqual(updatedWard);
        });

        it("should update a ward without modifying the name when name is not provided", async () => {
            const existingWard = {
                _id: "ward-123",
                name: "Cardiology",
            };

            const updatedWard = {
                _id: "ward-123",
                name: "Cardiology",
                capacity: 40,
            };

            Ward.findById.mockResolvedValue(existingWard);
            Ward.findByIdAndUpdate.mockResolvedValue(updatedWard);

            const result = await wardService.updateWard(
                "ward-123",
                {
                    capacity: 40,
                }
            );

            expect(Ward.findByIdAndUpdate).toHaveBeenCalledWith(
                "ward-123",
                {
                    capacity: 40,
                },
                {
                    new: true,
                    runValidators: true,
                }
            );

            expect(result).toEqual(updatedWard);
        });
    });

    describe("deleteWard", () => {
        it("should throw a 404 error when the ward does not exist", async () => {
            Ward.findById.mockResolvedValue(null);

            await expect(
                wardService.deleteWard("missing-ward")
            ).rejects.toMatchObject({
                statusCode: 404,
                message: "Ward not found",
            });

            expect(Ward.findByIdAndDelete).not.toHaveBeenCalled();
        });

        it("should delete an existing ward and return true", async () => {
            const ward = {
                _id: "ward-123",
                name: "Cardiology",
            };

            Ward.findById.mockResolvedValue(ward);
            Ward.findByIdAndDelete.mockResolvedValue(ward);

            const result = await wardService.deleteWard("ward-123");

            expect(Ward.findById).toHaveBeenCalledWith("ward-123");
            expect(Ward.findByIdAndDelete).toHaveBeenCalledWith(
                "ward-123"
            );

            expect(result).toBe(true);
        });
    });
});