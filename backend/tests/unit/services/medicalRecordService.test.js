const medicalRecordService =
    require("../../../src/services/medicalRecordService");

const MedicalRecord =
    require("../../../src/models/MedicalRecord");

const Patient =
    require("../../../src/models/Patient");

const Doctor =
    require("../../../src/models/Doctor");

const AppError =
    require("../../../src/errors/AppError");


jest.mock("../../../src/models/MedicalRecord");
jest.mock("../../../src/models/Patient");
jest.mock("../../../src/models/Doctor");


describe("MedicalRecordService", () => {

    beforeEach(() => {

        jest.clearAllMocks();

    });


    describe("calculateBMI", () => {

        it("should calculate BMI correctly", () => {

            const result =
                medicalRecordService.calculateBMI(
                    70,
                    175
                );

            expect(result).toBe(22.86);

        });


        it("should return null when weight is missing", () => {

            const result =
                medicalRecordService.calculateBMI(
                    null,
                    175
                );

            expect(result).toBeNull();

        });


        it("should return null when height is missing", () => {

            const result =
                medicalRecordService.calculateBMI(
                    70,
                    null
                );

            expect(result).toBeNull();

        });

    });


    describe("validateFollowUpDate", () => {

        it("should allow a follow-up date after the visit date", () => {

            expect(() => {

                medicalRecordService.validateFollowUpDate(
                    "2026-07-01",
                    "2026-07-10"
                );

            }).not.toThrow();

        });


        it("should allow no follow-up date", () => {

            expect(() => {

                medicalRecordService.validateFollowUpDate(
                    "2026-07-01",
                    null
                );

            }).not.toThrow();

        });


        it("should throw when follow-up date is earlier than visit date", () => {

            expect(() => {

                medicalRecordService.validateFollowUpDate(
                    "2026-07-10",
                    "2026-07-01"
                );

            }).toThrow(
                new AppError(
                    "Follow-up date cannot be earlier than visit date",
                    400
                )
            );

        });

    });


    describe("validatePatient", () => {

        it("should return an active patient", async () => {

            const patient = {

                _id: "patient123",

                isActive: true,

            };

            Patient.findById
                .mockResolvedValue(patient);


            const result =
                await medicalRecordService.validatePatient(
                    "patient123"
                );


            expect(Patient.findById)
                .toHaveBeenCalledWith(
                    "patient123"
                );

            expect(result)
                .toEqual(patient);

        });


        it("should throw 404 when the patient does not exist", async () => {

            Patient.findById
                .mockResolvedValue(null);


            await expect(

                medicalRecordService.validatePatient(
                    "missing-patient"
                )

            ).rejects.toEqual(

                new AppError(
                    "Patient not found",
                    404
                )

            );

        });


        it("should throw 400 when the patient is inactive", async () => {

            Patient.findById
                .mockResolvedValue({

                    _id: "patient123",

                    isActive: false,

                });


            await expect(

                medicalRecordService.validatePatient(
                    "patient123"
                )

            ).rejects.toEqual(

                new AppError(
                    "Patient is inactive",
                    400
                )

            );

        });

    });


    describe("validateDoctor", () => {

        it("should return an active doctor", async () => {

            const doctor = {

                _id: "doctor123",

                status: "Active",

            };

            Doctor.findById
                .mockResolvedValue(doctor);


            const result =
                await medicalRecordService.validateDoctor(
                    "doctor123"
                );


            expect(Doctor.findById)
                .toHaveBeenCalledWith(
                    "doctor123"
                );

            expect(result)
                .toEqual(doctor);

        });


        it("should throw 404 when the doctor does not exist", async () => {

            Doctor.findById
                .mockResolvedValue(null);


            await expect(

                medicalRecordService.validateDoctor(
                    "missing-doctor"
                )

            ).rejects.toEqual(

                new AppError(
                    "Doctor not found",
                    404
                )

            );

        });


        it("should throw 400 when the doctor is inactive", async () => {

            Doctor.findById
                .mockResolvedValue({

                    _id: "doctor123",

                    status: "Inactive",

                });


            await expect(

                medicalRecordService.validateDoctor(
                    "doctor123"
                )

            ).rejects.toEqual(

                new AppError(
                    "Doctor is not active",
                    400
                )

            );

        });

    });


    describe("createMedicalRecord", () => {

        it("should create a medical record and calculate BMI", async () => {

            const data = {

                patient: "patient123",

                doctor: "doctor123",

                visitDate: new Date(
                    "2026-07-01"
                ),

                vitalSigns: {

                    weight: 70,

                    height: 175,

                },

            };


            const patient = {

                _id: "patient123",

                isActive: true,

            };


            const doctor = {

                _id: "doctor123",

                status: "Active",

            };


            const createdRecord = {

                _id: "record123",

                ...data,

                vitalSigns: {

                    ...data.vitalSigns,

                    bmi: 22.86,

                },

            };


            const populatedRecord = {

                ...createdRecord,

                patient,

                doctor,

            };


            Patient.findById
                .mockResolvedValue(patient);

            Doctor.findById
                .mockResolvedValue(doctor);

            MedicalRecord.create
                .mockResolvedValue(createdRecord);


            const populateDoctor =
                jest.fn()
                    .mockResolvedValue(
                        populatedRecord
                    );


            const populatePatient =
                jest.fn()
                    .mockReturnValue({

                        populate: populateDoctor,

                    });


            MedicalRecord.findById
                .mockReturnValue({

                    populate: populatePatient,

                });


            const result =
                await medicalRecordService.createMedicalRecord(
                    data
                );


            expect(data.vitalSigns.bmi)
                .toBe(22.86);


            expect(MedicalRecord.create)
                .toHaveBeenCalledWith(data);


            expect(result)
                .toEqual(populatedRecord);

        });


        it("should create a record without calculating BMI when vital signs are incomplete", async () => {

            const data = {

                patient: "patient123",

                doctor: "doctor123",

                vitalSigns: {

                    weight: 70,

                },

            };


            const patient = {

                _id: "patient123",

                isActive: true,

            };


            const doctor = {

                _id: "doctor123",

                status: "Active",

            };


            const createdRecord = {

                _id: "record123",

                ...data,

            };


            Patient.findById
                .mockResolvedValue(patient);

            Doctor.findById
                .mockResolvedValue(doctor);

            MedicalRecord.create
                .mockResolvedValue(createdRecord);


            const populateDoctor =
                jest.fn()
                    .mockResolvedValue(
                        createdRecord
                    );


            const populatePatient =
                jest.fn()
                    .mockReturnValue({

                        populate: populateDoctor,

                    });


            MedicalRecord.findById
                .mockReturnValue({

                    populate: populatePatient,

                });


            const result =
                await medicalRecordService.createMedicalRecord(
                    data
                );


            expect(
                data.vitalSigns.bmi
            ).toBeUndefined();


            expect(result)
                .toEqual(createdRecord);

        });

    });


    describe("getAllMedicalRecords", () => {

        it("should return paginated medical records", async () => {

            const records = [

                {

                    _id: "record1",

                },

                {

                    _id: "record2",

                },

            ];


            const limit =
                jest.fn()
                    .mockResolvedValue(records);


            const skip =
                jest.fn()
                    .mockReturnValue({

                        limit,

                    });


            const sort =
                jest.fn()
                    .mockReturnValue({

                        skip,

                    });


            const populateDoctor =
                jest.fn()
                    .mockReturnValue({

                        sort,

                    });


            const populatePatient =
                jest.fn()
                    .mockReturnValue({

                        populate: populateDoctor,

                    });


            MedicalRecord.find
                .mockReturnValue({

                    populate: populatePatient,

                });


            MedicalRecord.countDocuments
                .mockResolvedValue(2);


            const result =
                await medicalRecordService.getAllMedicalRecords({

                    page: 2,

                    limit: 5,

                });


            expect(MedicalRecord.find)
                .toHaveBeenCalledWith({});


            expect(skip)
                .toHaveBeenCalledWith(5);


            expect(limit)
                .toHaveBeenCalledWith(5);


            expect(MedicalRecord.countDocuments)
                .toHaveBeenCalledWith({});


            expect(result.pagination)
                .toEqual({

                    total: 2,

                    page: 2,

                    limit: 5,

                    totalPages: 1,

                });

        });


        it("should apply patient, doctor, status, diagnosis, and date filters", async () => {

            const limit =
                jest.fn()
                    .mockResolvedValue([]);


            const skip =
                jest.fn()
                    .mockReturnValue({

                        limit,

                    });


            const sort =
                jest.fn()
                    .mockReturnValue({

                        skip,

                    });


            const populateDoctor =
                jest.fn()
                    .mockReturnValue({

                        sort,

                    });


            const populatePatient =
                jest.fn()
                    .mockReturnValue({

                        populate: populateDoctor,

                    });


            MedicalRecord.find
                .mockReturnValue({

                    populate: populatePatient,

                });


            MedicalRecord.countDocuments
                .mockResolvedValue(0);


            await medicalRecordService.getAllMedicalRecords({

                patient: "patient123",

                doctor: "doctor123",

                status: "Open",

                diagnosis: "diabetes",

                startDate: "2026-07-01",

                endDate: "2026-07-31",

            });


            const filter =
                MedicalRecord.find.mock.calls[0][0];


            expect(filter.patient)
                .toBe("patient123");


            expect(filter.doctor)
                .toBe("doctor123");


            expect(filter.status)
                .toBe("Open");


            expect(filter.diagnosis)
                .toEqual({

                    $regex: "diabetes",

                    $options: "i",

                });


            expect(filter.visitDate.$gte)
                .toEqual(
                    new Date("2026-07-01")
                );


            expect(filter.visitDate.$lte)
                .toEqual(
                    new Date("2026-07-31")
                );

        });

    });


    describe("getMedicalRecordById", () => {

        it("should return a medical record", async () => {

            const record = {

                _id: "record123",

            };


            const populateDoctor =
                jest.fn()
                    .mockResolvedValue(record);


            const populatePatient =
                jest.fn()
                    .mockReturnValue({

                        populate: populateDoctor,

                    });


            MedicalRecord.findById
                .mockReturnValue({

                    populate: populatePatient,

                });


            const result =
                await medicalRecordService.getMedicalRecordById(
                    "record123"
                );


            expect(result)
                .toEqual(record);

        });


        it("should throw 404 when the record does not exist", async () => {

            const populateDoctor =
                jest.fn()
                    .mockResolvedValue(null);


            const populatePatient =
                jest.fn()
                    .mockReturnValue({

                        populate: populateDoctor,

                    });


            MedicalRecord.findById
                .mockReturnValue({

                    populate: populatePatient,

                });


            await expect(

                medicalRecordService.getMedicalRecordById(
                    "missing-record"
                )

            ).rejects.toEqual(

                new AppError(
                    "Medical record not found",
                    404
                )

            );

        });

    });


    describe("getPatientMedicalHistory", () => {

        it("should return patient medical history", async () => {

            Patient.findById
                .mockResolvedValue({

                    _id: "patient123",

                    isActive: true,

                });


            const sort =
                jest.fn()
                    .mockResolvedValue([]);


            const populate =
                jest.fn()
                    .mockReturnValue({

                        sort,

                    });


            MedicalRecord.find
                .mockReturnValue({

                    populate,

                });


            const result =
                await medicalRecordService.getPatientMedicalHistory(
                    "patient123"
                );


            expect(MedicalRecord.find)
                .toHaveBeenCalledWith({

                    patient: "patient123",

                });


            expect(result)
                .toEqual([]);

        });

    });


    describe("getDoctorMedicalRecords", () => {

        it("should return doctor medical records", async () => {

            Doctor.findById
                .mockResolvedValue({

                    _id: "doctor123",

                    status: "Active",

                });


            const sort =
                jest.fn()
                    .mockResolvedValue([]);


            const populate =
                jest.fn()
                    .mockReturnValue({

                        sort,

                    });


            MedicalRecord.find
                .mockReturnValue({

                    populate,

                });


            const result =
                await medicalRecordService.getDoctorMedicalRecords(
                    "doctor123"
                );


            expect(MedicalRecord.find)
                .toHaveBeenCalledWith({

                    doctor: "doctor123",

                });


            expect(result)
                .toEqual([]);

        });

    });


    describe("updateMedicalRecord", () => {

        it("should update a medical record and recalculate BMI", async () => {

            const existingRecord = {

                _id: "record123",

                patient: "patient123",

                doctor: "doctor123",

                visitDate: new Date(
                    "2026-07-01"
                ),

            };


            const updateData = {

                vitalSigns: {

                    weight: 80,

                    height: 180,

                },

            };


            const updatedRecord = {

                _id: "record123",

                ...updateData,

                vitalSigns: {

                    ...updateData.vitalSigns,

                    bmi: 24.69,

                },

            };


            MedicalRecord.findById
                .mockResolvedValue(existingRecord);


            const populateDoctor =
                jest.fn()
                    .mockResolvedValue(
                        updatedRecord
                    );


            const populatePatient =
                jest.fn()
                    .mockReturnValue({

                        populate: populateDoctor,

                    });


            MedicalRecord.findByIdAndUpdate
                .mockReturnValue({

                    populate: populatePatient,

                });


            const result =
                await medicalRecordService.updateMedicalRecord(

                    "record123",

                    updateData

                );


            expect(updateData.vitalSigns.bmi)
                .toBe(24.69);


            expect(
                MedicalRecord.findByIdAndUpdate
            ).toHaveBeenCalledWith(

                "record123",

                updateData,

                {

                    new: true,

                    runValidators: true,

                }

            );


            expect(result)
                .toEqual(updatedRecord);

        });


        it("should throw 404 when the medical record does not exist", async () => {

            MedicalRecord.findById
                .mockResolvedValue(null);


            await expect(

                medicalRecordService.updateMedicalRecord(

                    "missing-record",

                    {}

                )

            ).rejects.toEqual(

                new AppError(
                    "Medical record not found",
                    404
                )

            );

        });

    });


    describe("updateMedicalRecordStatus", () => {

        it("should update a valid medical record status", async () => {

            const record = {

                _id: "record123",

                status: "Open",

                save:
                    jest.fn()
                        .mockResolvedValue(true),

            };


            MedicalRecord.findById
                .mockResolvedValueOnce(record);


            const updatedRecord = {

                _id: "record123",

                status: "Closed",

            };


            const populateDoctor =
                jest.fn()
                    .mockResolvedValue(
                        updatedRecord
                    );


            const populatePatient =
                jest.fn()
                    .mockReturnValue({

                        populate: populateDoctor,

                    });


            MedicalRecord.findById
                .mockReturnValueOnce({

                    populate: populatePatient,

                });


            const result =
                await medicalRecordService.updateMedicalRecordStatus(

                    "record123",

                    "Closed"

                );


            expect(record.status)
                .toBe("Closed");


            expect(record.save)
                .toHaveBeenCalled();


            expect(result)
                .toEqual(updatedRecord);

        });


        it("should reject an invalid status", async () => {

            await expect(

                medicalRecordService.updateMedicalRecordStatus(

                    "record123",

                    "Invalid"

                )

            ).rejects.toEqual(

                new AppError(
                    "Invalid medical record status",
                    400
                )

            );

        });

    });


    describe("deleteMedicalRecord", () => {

        it("should delete an existing medical record", async () => {

            MedicalRecord.findById
                .mockResolvedValue({

                    _id: "record123",

                });


            MedicalRecord.findByIdAndDelete
                .mockResolvedValue(true);


            const result =
                await medicalRecordService.deleteMedicalRecord(
                    "record123"
                );


            expect(
                MedicalRecord.findByIdAndDelete
            ).toHaveBeenCalledWith(
                "record123"
            );


            expect(result)
                .toEqual({

                    message:
                        "Medical record deleted successfully",

                });

        });


        it("should throw 404 when the record does not exist", async () => {

            MedicalRecord.findById
                .mockResolvedValue(null);


            await expect(

                medicalRecordService.deleteMedicalRecord(
                    "missing-record"
                )

            ).rejects.toEqual(

                new AppError(
                    "Medical record not found",
                    404
                )

            );

        });

    });


    describe("getMedicalRecordStatistics", () => {

        it("should return medical record statistics", async () => {

            MedicalRecord.countDocuments
                .mockResolvedValueOnce(10)
                .mockResolvedValueOnce(4)
                .mockResolvedValueOnce(3)
                .mockResolvedValueOnce(2)
                .mockResolvedValueOnce(1);


            const result =
                await medicalRecordService.getMedicalRecordStatistics();


            expect(
                MedicalRecord.countDocuments
            ).toHaveBeenCalledTimes(5);


            expect(result)
                .toEqual({

                    totalRecords: 10,

                    openRecords: 4,

                    closedRecords: 3,

                    followUpRequired: 2,

                    todayRecords: 1,

                });

        });

    });

});