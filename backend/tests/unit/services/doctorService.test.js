const doctorService = require("../../../src/services/doctorService");
const Doctor = require("../../../src/models/Doctor");

jest.mock("../../../src/models/Doctor");

describe("Doctor Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createDoctor", () => {
    const doctorData = {
      name: "Dr. John Smith",
      email: "john.smith@hospital.com",
      phone: "08012345678",
      department: "Cardiology",
      specialization: "Cardiologist",
      experience: 8,
      licenseNumber: "MED-2026-100",
      status: "Active",
    };

    test("creates a doctor successfully", async () => {
      Doctor.findOne
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce(null);

      Doctor.create.mockResolvedValue(doctorData);

      const result = await doctorService.createDoctor(doctorData);

      expect(Doctor.findOne).toHaveBeenCalledTimes(2);
      expect(Doctor.create).toHaveBeenCalledWith(doctorData);
      expect(result).toEqual(doctorData);
    });

    test("rejects duplicate email", async () => {
      Doctor.findOne.mockResolvedValueOnce({
        email: doctorData.email,
      });

      await expect(
        doctorService.createDoctor(doctorData)
      ).rejects.toThrow(
        "Doctor with this email already exists"
      );

      expect(Doctor.create).not.toHaveBeenCalled();
    });

    test("rejects duplicate license number", async () => {
      Doctor.findOne
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce({
          licenseNumber: doctorData.licenseNumber,
        });

      await expect(
        doctorService.createDoctor(doctorData)
      ).rejects.toThrow(
        "License number already exists"
      );

      expect(Doctor.create).not.toHaveBeenCalled();
    });
  });

  describe("getDoctorById", () => {
    test("returns doctor successfully", async () => {
      const doctor = {
        _id: "doctor-id",
        name: "Dr. John Smith",
      };

      Doctor.findById.mockResolvedValue(doctor);

      const result = await doctorService.getDoctorById(
        "doctor-id"
      );

      expect(Doctor.findById).toHaveBeenCalledWith(
        "doctor-id"
      );

      expect(result).toEqual(doctor);
    });

    test("throws error when doctor is not found", async () => {
      Doctor.findById.mockResolvedValue(null);

      await expect(
        doctorService.getDoctorById("invalid-id")
      ).rejects.toThrow("Doctor not found");
    });
  });

  describe("updateDoctor", () => {
    test("updates a doctor successfully", async () => {
      const existingDoctor = {
        _id: "doctor-id",
        email: "old@hospital.com",
        licenseNumber: "MED-OLD",
      };

      const updateData = {
        name: "Dr. Updated Name",
      };

      const updatedDoctor = {
        ...existingDoctor,
        ...updateData,
      };

      Doctor.findById.mockResolvedValue(existingDoctor);

      Doctor.findByIdAndUpdate.mockResolvedValue(
        updatedDoctor
      );

      const result = await doctorService.updateDoctor(
        "doctor-id",
        updateData
      );

      expect(Doctor.findById).toHaveBeenCalledWith(
        "doctor-id"
      );

      expect(Doctor.findByIdAndUpdate).toHaveBeenCalledWith(
        "doctor-id",
        updateData,
        {
          new: true,
          runValidators: true,
        }
      );

      expect(result).toEqual(updatedDoctor);
    });

    test("throws error when doctor is not found", async () => {
      Doctor.findById.mockResolvedValue(null);

      await expect(
        doctorService.updateDoctor(
          "invalid-id",
          { name: "Updated Name" }
        )
      ).rejects.toThrow("Doctor not found");

      expect(
        Doctor.findByIdAndUpdate
      ).not.toHaveBeenCalled();
    });

    test("rejects duplicate email during update", async () => {
      const existingDoctor = {
        email: "old@hospital.com",
        licenseNumber: "MED-OLD",
      };

      Doctor.findById.mockResolvedValue(existingDoctor);

      Doctor.findOne.mockResolvedValue({
        email: "new@hospital.com",
      });

      await expect(
        doctorService.updateDoctor(
          "doctor-id",
          {
            email: "new@hospital.com",
          }
        )
      ).rejects.toThrow(
        "Doctor with this email already exists"
      );

      expect(
        Doctor.findByIdAndUpdate
      ).not.toHaveBeenCalled();
    });

   test("rejects duplicate license number during update", async () => {
  const existingDoctor = {
    email: "doctor@hospital.com",
    licenseNumber: "MED-OLD",
  };

  Doctor.findById.mockResolvedValue(existingDoctor);

  Doctor.findOne.mockResolvedValue({
    licenseNumber: "MED-NEW",
  });

  await expect(
    doctorService.updateDoctor(
      "doctor-id",
      {
        licenseNumber: "MED-NEW",
      }
    )
  ).rejects.toThrow(
    "License number already exists"
  );

  expect(
    Doctor.findByIdAndUpdate
  ).not.toHaveBeenCalled();
});

  describe("deleteDoctor", () => {
    test("deletes a doctor successfully", async () => {
      const doctor = {
        _id: "doctor-id",
        name: "Dr. John Smith",
        deleteOne: jest.fn().mockResolvedValue(),
      };

      Doctor.findById.mockResolvedValue(doctor);

      const result = await doctorService.deleteDoctor(
        "doctor-id"
      );

      expect(Doctor.findById).toHaveBeenCalledWith(
        "doctor-id"
      );

      expect(doctor.deleteOne).toHaveBeenCalled();

      expect(result).toEqual(doctor);
    });

    test("throws error when doctor is not found", async () => {
      Doctor.findById.mockResolvedValue(null);

      await expect(
        doctorService.deleteDoctor("invalid-id")
      ).rejects.toThrow("Doctor not found");
    });
  });
});
});