const admissionService = require("../../../src/services/admissionService");

const Admission = require("../../../src/models/Admission");
const Patient = require("../../../src/models/Patient");
const Bed = require("../../../src/models/Bed");

const ApiError = require("../../../src/utils/ApiError");

jest.mock("../../../src/models/Admission");
jest.mock("../../../src/models/Patient");
jest.mock("../../../src/models/Bed");

describe("AdmissionService", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("createAdmission", () => {

        it("should create an admission and occupy the bed", async () => {

            const data = {
                patient: "patient123",
                bed: "bed123",
                diagnosis: "Pneumonia"
            };

            const patient = {
                _id: "patient123",
                name: "John Doe"
            };

            const bed = {
                _id: "bed123",
                status: "Available",
                save: jest.fn().mockResolvedValue(true)
            };

            const createdAdmission = {
                _id: "admission123",
                ...data
            };

            const populatedAdmission = {
                ...createdAdmission,
                patient,
                bed: {
                    ...bed,
                    ward: {
                        _id: "ward123",
                        name: "General Ward"
                    }
                }
            };

            Patient.findById.mockResolvedValue(patient);

            Bed.findById.mockResolvedValue(bed);

            Admission.findOne.mockResolvedValue(null);

            Admission.create.mockResolvedValue(createdAdmission);

            const populate = jest.fn()
                .mockReturnValueOnce({
                    populate: jest.fn().mockResolvedValue(populatedAdmission)
                });

            Admission.findById.mockReturnValue({
                populate
            });

            const result = await admissionService.createAdmission(data);

            expect(Patient.findById).toHaveBeenCalledWith(
                "patient123"
            );

            expect(Bed.findById).toHaveBeenCalledWith(
                "bed123"
            );

            expect(Admission.findOne).toHaveBeenCalledWith({
                patient: "patient123",
                status: "Admitted"
            });

            expect(Admission.create).toHaveBeenCalledWith(
                data
            );

            expect(bed.status).toBe("Occupied");

            expect(bed.save).toHaveBeenCalled();

            expect(result).toEqual(
                populatedAdmission
            );
        });

        it("should throw 404 when the patient does not exist", async () => {

            Patient.findById.mockResolvedValue(null);

            await expect(
                admissionService.createAdmission({
                    patient: "missing-patient",
                    bed: "bed123"
                })
            ).rejects.toEqual(
                new ApiError(
                    404,
                    "Patient not found"
                )
            );

            expect(Bed.findById).not.toHaveBeenCalled();

            expect(Admission.create).not.toHaveBeenCalled();
        });

        it("should throw 404 when the bed does not exist", async () => {

            Patient.findById.mockResolvedValue({
                _id: "patient123"
            });

            Bed.findById.mockResolvedValue(null);

            await expect(
                admissionService.createAdmission({
                    patient: "patient123",
                    bed: "missing-bed"
                })
            ).rejects.toEqual(
                new ApiError(
                    404,
                    "Bed not found"
                )
            );

            expect(Admission.create).not.toHaveBeenCalled();
        });

        it("should throw 400 when the bed is not available", async () => {

            Patient.findById.mockResolvedValue({
                _id: "patient123"
            });

            Bed.findById.mockResolvedValue({
                _id: "bed123",
                status: "Occupied"
            });

            await expect(
                admissionService.createAdmission({
                    patient: "patient123",
                    bed: "bed123"
                })
            ).rejects.toEqual(
                new ApiError(
                    400,
                    "Selected bed is not available"
                )
            );

            expect(Admission.findOne).not.toHaveBeenCalled();

            expect(Admission.create).not.toHaveBeenCalled();
        });

        it("should throw 409 when the patient already has an active admission", async () => {

            Patient.findById.mockResolvedValue({
                _id: "patient123"
            });

            Bed.findById.mockResolvedValue({
                _id: "bed123",
                status: "Available"
            });

            Admission.findOne.mockResolvedValue({
                _id: "existing-admission",
                status: "Admitted"
            });

            await expect(
                admissionService.createAdmission({
                    patient: "patient123",
                    bed: "bed123"
                })
            ).rejects.toEqual(
                new ApiError(
                    409,
                    "Patient is already admitted"
                )
            );

            expect(Admission.create).not.toHaveBeenCalled();
        });

    });

    describe("getAllAdmissions", () => {

        it("should return all admissions with populated patient and bed information", async () => {

            const admissions = [
                {
                    _id: "admission1"
                },
                {
                    _id: "admission2"
                }
            ];

            const populateBed = jest.fn().mockReturnValue({
                sort: jest.fn().mockResolvedValue(admissions)
            });

            const populatePatient = jest.fn().mockReturnValue({
                populate: populateBed
            });

            Admission.find.mockReturnValue({
                populate: populatePatient
            });

            const result =
                await admissionService.getAllAdmissions();

            expect(Admission.find).toHaveBeenCalledWith();

            expect(populatePatient).toHaveBeenCalledWith(
                "patient"
            );

            expect(populateBed).toHaveBeenCalledWith({
                path: "bed",
                populate: {
                    path: "ward"
                }
            });

            expect(result).toEqual(admissions);
        });

    });

    describe("getAdmissionById", () => {

        it("should return an admission when it exists", async () => {

            const admission = {
                _id: "admission123"
            };

            const populateBed = jest.fn()
                .mockResolvedValue(admission);

            const populatePatient = jest.fn()
                .mockReturnValue({
                    populate: populateBed
                });

            Admission.findById.mockReturnValue({
                populate: populatePatient
            });

            const result =
                await admissionService.getAdmissionById(
                    "admission123"
                );

            expect(Admission.findById).toHaveBeenCalledWith(
                "admission123"
            );

            expect(result).toEqual(admission);
        });

        it("should throw 404 when the admission does not exist", async () => {

            const populateBed = jest.fn()
                .mockResolvedValue(null);

            const populatePatient = jest.fn()
                .mockReturnValue({
                    populate: populateBed
                });

            Admission.findById.mockReturnValue({
                populate: populatePatient
            });

            await expect(
                admissionService.getAdmissionById(
                    "missing-admission"
                )
            ).rejects.toEqual(
                new ApiError(
                    404,
                    "Admission not found"
                )
            );
        });

    });

    describe("updateAdmission", () => {

        it("should update and return an admission", async () => {

            const existingAdmission = {
                _id: "admission123"
            };

            const updatedAdmission = {
                _id: "admission123",
                diagnosis: "Updated Diagnosis"
            };

            Admission.findById.mockResolvedValue(
                existingAdmission
            );

            const populateBed = jest.fn()
                .mockResolvedValue(updatedAdmission);

            const populatePatient = jest.fn()
                .mockReturnValue({
                    populate: populateBed
                });

            Admission.findByIdAndUpdate.mockReturnValue({
                populate: populatePatient
            });

            const result =
                await admissionService.updateAdmission(
                    "admission123",
                    {
                        diagnosis: "Updated Diagnosis"
                    }
                );

            expect(Admission.findById).toHaveBeenCalledWith(
                "admission123"
            );

            expect(Admission.findByIdAndUpdate)
                .toHaveBeenCalledWith(
                    "admission123",
                    {
                        diagnosis: "Updated Diagnosis"
                    },
                    {
                        new: true,
                        runValidators: true
                    }
                );

            expect(result).toEqual(updatedAdmission);
        });

        it("should throw 404 when the admission does not exist", async () => {

            Admission.findById.mockResolvedValue(null);

            await expect(
                admissionService.updateAdmission(
                    "missing-admission",
                    {}
                )
            ).rejects.toEqual(
                new ApiError(
                    404,
                    "Admission not found"
                )
            );

            expect(
                Admission.findByIdAndUpdate
            ).not.toHaveBeenCalled();
        });

    });

    describe("dischargePatient", () => {

        it("should discharge the patient and make the bed available", async () => {

            const admission = {
                _id: "admission123",
                bed: "bed123",
                status: "Admitted",
                save: jest.fn().mockResolvedValue(true)
            };

            const bed = {
                _id: "bed123",
                status: "Occupied",
                save: jest.fn().mockResolvedValue(true)
            };

            const dischargedAdmission = {
                ...admission,
                status: "Discharged"
            };

            Admission.findById
                .mockResolvedValueOnce(admission)
                .mockReturnValueOnce({
                    populate: jest.fn().mockReturnValue({
                        populate: jest.fn().mockResolvedValue(
                            dischargedAdmission
                        )
                    })
                });

            Bed.findById.mockResolvedValue(bed);

            const result =
                await admissionService.dischargePatient(
                    "admission123"
                );

            expect(admission.status).toBe(
                "Discharged"
            );

            expect(admission.dischargeDate)
                .toBeInstanceOf(Date);

            expect(admission.save).toHaveBeenCalled();

            expect(bed.status).toBe(
                "Available"
            );

            expect(bed.save).toHaveBeenCalled();

            expect(result).toEqual(
                dischargedAdmission
            );
        });

        it("should throw 404 when the admission does not exist", async () => {

            Admission.findById.mockResolvedValue(null);

            await expect(
                admissionService.dischargePatient(
                    "missing-admission"
                )
            ).rejects.toEqual(
                new ApiError(
                    404,
                    "Admission not found"
                )
            );

            expect(Bed.findById).not.toHaveBeenCalled();
        });

        it("should throw 400 when the patient is already discharged", async () => {

            Admission.findById.mockResolvedValue({
                _id: "admission123",
                status: "Discharged"
            });

            await expect(
                admissionService.dischargePatient(
                    "admission123"
                )
            ).rejects.toEqual(
                new ApiError(
                    400,
                    "Patient has already been discharged"
                )
            );

            expect(Bed.findById).not.toHaveBeenCalled();
        });

    });

    describe("deleteAdmission", () => {

        it("should delete an admission", async () => {

            Admission.findById.mockResolvedValue({
                _id: "admission123"
            });

            Admission.findByIdAndDelete.mockResolvedValue({
                _id: "admission123"
            });

            const result =
                await admissionService.deleteAdmission(
                    "admission123"
                );

            expect(Admission.findById).toHaveBeenCalledWith(
                "admission123"
            );

            expect(
                Admission.findByIdAndDelete
            ).toHaveBeenCalledWith(
                "admission123"
            );

            expect(result).toBe(true);
        });

        it("should throw 404 when the admission does not exist", async () => {

            Admission.findById.mockResolvedValue(null);

            await expect(
                admissionService.deleteAdmission(
                    "missing-admission"
                )
            ).rejects.toEqual(
                new ApiError(
                    404,
                    "Admission not found"
                )
            );

            expect(
                Admission.findByIdAndDelete
            ).not.toHaveBeenCalled();
        });

    });

});