const laboratoryTestService = require("../../../src/services/laboratoryTestService");
const LaboratoryTest = require("../../../src/models/LaboratoryTest");
const Patient = require("../../../src/models/Patient");
const Doctor = require("../../../src/models/Doctor");
const MedicalRecord = require("../../../src/models/MedicalRecord");
const AppError = require("../../../src/errors/AppError");

jest.mock("../../../src/models/LaboratoryTest");
jest.mock("../../../src/models/Patient");
jest.mock("../../../src/models/Doctor");
jest.mock("../../../src/models/MedicalRecord");

describe("LaboratoryTestService", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("validatePatient", () => {

        it("should return the patient when active", async () => {

            const patient = {
                _id: "patient123",
                isActive: true
            };

            Patient.findById.mockResolvedValue(patient);

            const result = await laboratoryTestService.validatePatient("patient123");

            expect(Patient.findById).toHaveBeenCalledWith("patient123");
            expect(result).toEqual(patient);

        });

        it("should throw 404 when patient does not exist", async () => {

            Patient.findById.mockResolvedValue(null);

            await expect(
                laboratoryTestService.validatePatient("missing")
            ).rejects.toEqual(
                new AppError("Patient not found", 404)
            );

        });

        it("should throw 400 when patient is inactive", async () => {

            Patient.findById.mockResolvedValue({
                _id: "patient123",
                isActive: false
            });

            await expect(
                laboratoryTestService.validatePatient("patient123")
            ).rejects.toEqual(
                new AppError("Patient is inactive", 400)
            );

        });

    });

    describe("validateDoctor", () => {

        it("should return active doctor", async () => {

            const doctor = {
                _id: "doctor123",
                status: "Active"
            };

            Doctor.findById.mockResolvedValue(doctor);

            const result = await laboratoryTestService.validateDoctor("doctor123");

            expect(result).toEqual(doctor);

        });

        it("should throw 404 when doctor does not exist", async () => {

            Doctor.findById.mockResolvedValue(null);

            await expect(
                laboratoryTestService.validateDoctor("missing")
            ).rejects.toEqual(
                new AppError("Doctor not found", 404)
            );

        });

        it("should throw 400 when doctor is inactive", async () => {

            Doctor.findById.mockResolvedValue({
                status: "Inactive"
            });

            await expect(
                laboratoryTestService.validateDoctor("doctor123")
            ).rejects.toEqual(
                new AppError("Doctor is not active", 400)
            );

        });

    });

    describe("validateMedicalRecord", () => {

        it("should return the medical record", async () => {

            const medicalRecord = {
                _id: "record123"
            };

            MedicalRecord.findById.mockResolvedValue(medicalRecord);

            const result =
                await laboratoryTestService.validateMedicalRecord("record123");

            expect(result).toEqual(medicalRecord);

        });

        it("should throw 404 when medical record does not exist", async () => {

            MedicalRecord.findById.mockResolvedValue(null);

            await expect(
                laboratoryTestService.validateMedicalRecord("missing")
            ).rejects.toEqual(
                new AppError("Medical record not found", 404)
            );

        });

    });

    describe("validateStatus", () => {

        it("should allow valid status", () => {

            expect(() =>
                laboratoryTestService.validateStatus("Requested")
            ).not.toThrow();

        });

        it("should throw when status is invalid", () => {

            expect(() =>
                laboratoryTestService.validateStatus("UNKNOWN")
            ).toThrow(
                new AppError("Invalid laboratory status", 400)
            );

        });

    });

    describe("createLaboratoryTest", () => {

        it("should create a laboratory test", async () => {

            Patient.findById.mockResolvedValue({
                isActive: true
            });

            Doctor.findById.mockResolvedValue({
                status: "Active"
            });

            MedicalRecord.findById.mockResolvedValue({});

            const created = {
                _id: "lab123"
            };

            LaboratoryTest.create.mockResolvedValue(created);

            const populated = {
                _id: "lab123",
                patient: {},
                doctor: {},
                medicalRecord: {}
            };

            const populateMedicalRecord = jest.fn().mockResolvedValue(populated);

            const populateDoctor = jest.fn().mockReturnValue({
                populate: populateMedicalRecord
            });

            const populatePatient = jest.fn().mockReturnValue({
                populate: populateDoctor
            });

            LaboratoryTest.findById.mockReturnValue({
                populate: populatePatient
            });

            const result =
                await laboratoryTestService.createLaboratoryTest({

                    patient: "patient123",

                    doctor: "doctor123",

                    medicalRecord: "record123",

                    status: "Requested"

                });

            expect(LaboratoryTest.create).toHaveBeenCalled();

            expect(result).toEqual(populated);

        });

    });

        describe("getAllLaboratoryTests", () => {

        it("should return paginated laboratory tests", async () => {

            const laboratoryTests = [
                {
                    _id: "lab1"
                },
                {
                    _id: "lab2"
                }
            ];

            const limit = jest.fn().mockResolvedValue(laboratoryTests);

            const skip = jest.fn().mockReturnValue({
                limit
            });

            const sort = jest.fn().mockReturnValue({
                skip
            });

            const populateMedicalRecord = jest.fn().mockReturnValue({
                sort
            });

            const populateDoctor = jest.fn().mockReturnValue({
                populate: populateMedicalRecord
            });

            const populatePatient = jest.fn().mockReturnValue({
                populate: populateDoctor
            });

            LaboratoryTest.find.mockReturnValue({
                populate: populatePatient
            });

            LaboratoryTest.countDocuments.mockResolvedValue(2);

            const result =
                await laboratoryTestService.getAllLaboratoryTests({});

            expect(LaboratoryTest.find)
                .toHaveBeenCalledWith({});

            expect(LaboratoryTest.countDocuments)
                .toHaveBeenCalledWith({});

            expect(result.laboratoryTests)
                .toEqual(laboratoryTests);

            expect(result.pagination.total)
                .toBe(2);

            expect(result.pagination.page)
                .toBe(1);

            expect(result.pagination.limit)
                .toBe(10);

        });

    });

    describe("getLaboratoryTestById", () => {

        it("should return a laboratory test", async () => {

            const laboratoryTest = {
                _id: "lab123"
            };

            const populateMedicalRecord =
                jest.fn().mockResolvedValue(
                    laboratoryTest
                );

            const populateDoctor =
                jest.fn().mockReturnValue({
                    populate:
                        populateMedicalRecord
                });

            const populatePatient =
                jest.fn().mockReturnValue({
                    populate:
                        populateDoctor
                });

            LaboratoryTest.findById
                .mockReturnValue({
                    populate:
                        populatePatient
                });

            const result =
                await laboratoryTestService
                    .getLaboratoryTestById(
                        "lab123"
                    );

            expect(result)
                .toEqual(laboratoryTest);

        });

        it("should throw 404 when laboratory test does not exist", async () => {

            const populateMedicalRecord =
                jest.fn().mockResolvedValue(
                    null
                );

            const populateDoctor =
                jest.fn().mockReturnValue({
                    populate:
                        populateMedicalRecord
                });

            const populatePatient =
                jest.fn().mockReturnValue({
                    populate:
                        populateDoctor
                });

            LaboratoryTest.findById
                .mockReturnValue({
                    populate:
                        populatePatient
                });

            await expect(

                laboratoryTestService
                    .getLaboratoryTestById(
                        "missing"
                    )

            ).rejects.toEqual(

                new AppError(
                    "Laboratory test not found",
                    404
                )

            );

        });

    });

    describe("updateLaboratoryTest", () => {

        it("should update and return a laboratory test", async () => {

            const laboratoryTest = {

                _id: "lab123",

                patient: "patient123",

                doctor: "doctor123",

                medicalRecord: "record123",

                save: jest.fn()

            };

            jest.spyOn(
                laboratoryTestService,
                "getLaboratoryTestById"
            ).mockResolvedValue(
                laboratoryTest
            );

            Patient.findById
                .mockResolvedValue({
                    isActive: true
                });

            Doctor.findById
                .mockResolvedValue({
                    status: "Active"
                });

            MedicalRecord.findById
                .mockResolvedValue({});

            const populated = {

                _id: "lab123",

                status: "Completed"

            };

            const populateMedicalRecord =
                jest.fn().mockResolvedValue(
                    populated
                );

            const populateDoctor =
                jest.fn().mockReturnValue({
                    populate:
                        populateMedicalRecord
                });

            const populatePatient =
                jest.fn().mockReturnValue({
                    populate:
                        populateDoctor
                });

            LaboratoryTest.findById
                .mockReturnValue({
                    populate:
                        populatePatient
                });

            const result =
                await laboratoryTestService
                    .updateLaboratoryTest(

                        "lab123",

                        {
                            status:
                                "Completed"
                        }

                    );

            expect(
                laboratoryTest.save
            ).toHaveBeenCalled();

            expect(result)
                .toEqual(populated);

        });

        it("should validate status during update", async () => {

            const laboratoryTest = {

                _id: "lab123",

                save: jest.fn()

            };

            jest.spyOn(
                laboratoryTestService,
                "getLaboratoryTestById"
            ).mockResolvedValue(
                laboratoryTest
            );

            await expect(

                laboratoryTestService
                    .updateLaboratoryTest(

                        "lab123",

                        {
                            status:
                                "INVALID"
                        }

                    )

            ).rejects.toEqual(

                new AppError(
                    "Invalid laboratory status",
                    400
                )

            );

        });

    });

        describe("updateLaboratoryStatus", () => {

        it("should update status to Completed", async () => {

            const laboratoryTest = {
                _id: "lab123",
                status: "Requested",
                save: jest.fn()
            };

            jest.spyOn(
                laboratoryTestService,
                "getLaboratoryTestById"
            ).mockResolvedValue(
                laboratoryTest
            );

            const populated = {
                _id: "lab123",
                status: "Completed"
            };

            const populateMedicalRecord =
                jest.fn().mockResolvedValue(populated);

            const populateDoctor =
                jest.fn().mockReturnValue({
                    populate: populateMedicalRecord
                });

            const populatePatient =
                jest.fn().mockReturnValue({
                    populate: populateDoctor
                });

            LaboratoryTest.findById.mockReturnValue({
                populate: populatePatient
            });

            const result =
                await laboratoryTestService
                    .updateLaboratoryStatus(
                        "lab123",
                        "Completed"
                    );

            expect(laboratoryTest.save)
                .toHaveBeenCalled();

            expect(result.status)
                .toBe("Completed");

        });

        it("should reject invalid status", async () => {

            await expect(

                laboratoryTestService
                    .updateLaboratoryStatus(
                        "lab123",
                        "INVALID"
                    )

            ).rejects.toEqual(

                new AppError(
                    "Invalid laboratory status",
                    400
                )

            );

        });

    });

    describe("deleteLaboratoryTest", () => {

        it("should delete a laboratory test", async () => {

            const laboratoryTest = {

                deleteOne: jest.fn()

            };

            jest.spyOn(
                laboratoryTestService,
                "getLaboratoryTestById"
            ).mockResolvedValue(
                laboratoryTest
            );

            await laboratoryTestService
                .deleteLaboratoryTest(
                    "lab123"
                );

            expect(
                laboratoryTest.deleteOne
            ).toHaveBeenCalled();

        });

    });

    describe("getPatientLaboratoryTests", () => {

        it("should return patient laboratory tests", async () => {

            Patient.findById.mockResolvedValue({
                isActive: true
            });

            const tests = [
                {
                    _id: "lab1"
                }
            ];

            const sort = jest.fn()
                .mockResolvedValue(tests);

            const populateMedicalRecord =
                jest.fn()
                    .mockReturnValue({
                        sort
                    });

            const populateDoctor =
                jest.fn()
                    .mockReturnValue({
                        populate:
                            populateMedicalRecord
                    });

            LaboratoryTest.find
                .mockReturnValue({
                    populate:
                        populateDoctor
                });

            const result =
                await laboratoryTestService
                    .getPatientLaboratoryTests(
                        "patient123"
                    );

            expect(result)
                .toEqual(tests);

        });

    });

    describe("getDoctorLaboratoryTests", () => {

        it("should return doctor laboratory tests", async () => {

            Doctor.findById.mockResolvedValue({
                status: "Active"
            });

            const tests = [
                {
                    _id: "lab1"
                }
            ];

            const sort = jest.fn()
                .mockResolvedValue(tests);

            const populateMedicalRecord =
                jest.fn()
                    .mockReturnValue({
                        sort
                    });

            const populatePatient =
                jest.fn()
                    .mockReturnValue({
                        populate:
                            populateMedicalRecord
                    });

            LaboratoryTest.find
                .mockReturnValue({
                    populate:
                        populatePatient
                });

            const result =
                await laboratoryTestService
                    .getDoctorLaboratoryTests(
                        "doctor123"
                    );

            expect(result)
                .toEqual(tests);

        });

    });

    describe("getLaboratoryStatistics", () => {

        it("should return laboratory statistics", async () => {

            LaboratoryTest.countDocuments
                .mockResolvedValueOnce(20)
                .mockResolvedValueOnce(5)
                .mockResolvedValueOnce(3)
                .mockResolvedValueOnce(4)
                .mockResolvedValueOnce(7)
                .mockResolvedValueOnce(1)
                .mockResolvedValueOnce(2);

            const result =
                await laboratoryTestService
                    .getLaboratoryStatistics();

            expect(result).toEqual({

                totalTests: 20,

                requested: 5,

                sampleCollected: 3,

                processing: 4,

                completed: 7,

                cancelled: 1,

                todayTests: 2

            });

        });

    });

});