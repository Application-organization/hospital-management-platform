jest.mock("../../../src/models/Patient", () => ({
  findOne: jest.fn(),
  create: jest.fn(),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  countDocuments: jest.fn(),
}));

jest.mock("../../../src/utils/apiFeatures", () => {
  return jest.fn().mockImplementation(() => ({
    filter: jest.fn().mockReturnThis(),
    search: jest.fn().mockReturnThis(),
    sort: jest.fn().mockReturnThis(),
    paginate: jest.fn().mockReturnThis(),
    query: Promise.resolve([]),
    filterQuery: {},
  }));
});

const Patient = require("../../../src/models/Patient");
const patientService = require("../../../src/services/patientService");

describe("Patient Service", () => {
 beforeEach(() => {
  jest.resetAllMocks();
});

  describe("createPatient", () => {
    test("creates a new patient successfully", async () => {
      const patientData = {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
      };

      const createdPatient = {
        _id: "patient-id",
        ...patientData,
      };

      Patient.findOne.mockResolvedValue(null);
      Patient.create.mockResolvedValue(createdPatient);

      const result =
        await patientService.createPatient(patientData);

      expect(Patient.findOne).toHaveBeenCalledWith({
        email: patientData.email,
      });

      expect(Patient.create).toHaveBeenCalledWith(patientData);
      expect(result).toEqual(createdPatient);
    });

    test("rejects duplicate patient email", async () => {
      const patientData = {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
      };

      Patient.findOne.mockResolvedValue({
        _id: "existing-patient-id",
        email: patientData.email,
      });

      await expect(
        patientService.createPatient(patientData)
      ).rejects.toMatchObject({
        statusCode: 409,
        message: "Patient with this email already exists",
      });

      expect(Patient.create).not.toHaveBeenCalled();
    });
  });

  describe("getPatientById", () => {
    test("returns an active patient successfully", async () => {
      const patient = {
        _id: "patient-id",
        firstName: "John",
        isActive: true,
      };

      Patient.findById.mockResolvedValue(patient);

      const result =
        await patientService.getPatientById("patient-id");

      expect(Patient.findById).toHaveBeenCalledWith(
        "patient-id"
      );

      expect(result).toEqual(patient);
    });

    test("throws 404 when patient does not exist", async () => {
      Patient.findById.mockResolvedValue(null);

      await expect(
        patientService.getPatientById("patient-id")
      ).rejects.toMatchObject({
        statusCode: 404,
        message: "Patient not found",
      });
    });

    test("throws 404 when patient is inactive", async () => {
      Patient.findById.mockResolvedValue({
        _id: "patient-id",
        isActive: false,
      });

      await expect(
        patientService.getPatientById("patient-id")
      ).rejects.toMatchObject({
        statusCode: 404,
        message: "Patient not found",
      });
    });
  });

  describe("updatePatient", () => {
    test("updates an active patient successfully", async () => {
      const existingPatient = {
        _id: "patient-id",
        email: "old@example.com",
        isActive: true,
      };

      const updatedPatient = {
        _id: "patient-id",
        email: "new@example.com",
        isActive: true,
      };

      Patient.findById.mockResolvedValue(existingPatient);
      Patient.findByIdAndUpdate.mockResolvedValue(
        updatedPatient
      );

      const result =
        await patientService.updatePatient(
          "patient-id",
          {
            email: "new@example.com",
          }
        );

      expect(Patient.findByIdAndUpdate).toHaveBeenCalledWith(
        "patient-id",
        {
          email: "new@example.com",
        },
        {
          new: true,
          runValidators: true,
        }
      );

      expect(result).toEqual(updatedPatient);
    });

    test("rejects duplicate email during update", async () => {
      Patient.findById.mockResolvedValue({
        _id: "patient-id",
        email: "old@example.com",
        isActive: true,
      });

      Patient.findOne.mockResolvedValue({
        _id: "another-patient-id",
        email: "new@example.com",
      });

      await expect(
        patientService.updatePatient(
          "patient-id",
          {
            email: "new@example.com",
          }
        )
      ).rejects.toMatchObject({
        statusCode: 409,
        message: "Patient with this email already exists",
      });

      expect(
        Patient.findByIdAndUpdate
      ).not.toHaveBeenCalled();
    });

    test("throws 404 when updating a non-existent patient", async () => {
      Patient.findById.mockResolvedValue(null);

      await expect(
        patientService.updatePatient(
          "patient-id",
          {
            firstName: "Updated",
          }
        )
      ).rejects.toMatchObject({
        statusCode: 404,
        message: "Patient not found",
      });
    });
  });

  describe("deletePatient", () => {
    test("soft deletes an active patient", async () => {
      const patient = {
        _id: "patient-id",
        isActive: true,
        save: jest.fn().mockResolvedValue(true),
      };

      Patient.findById.mockResolvedValue(patient);

      const result =
        await patientService.deletePatient("patient-id");

      expect(patient.isActive).toBe(false);
      expect(patient.save).toHaveBeenCalled();
      expect(result).toEqual(patient);
    });

    test("throws 404 when deleting a non-existent patient", async () => {
      Patient.findById.mockResolvedValue(null);

      await expect(
        patientService.deletePatient("patient-id")
      ).rejects.toMatchObject({
        statusCode: 404,
        message: "Patient not found",
      });
    });
  });
});