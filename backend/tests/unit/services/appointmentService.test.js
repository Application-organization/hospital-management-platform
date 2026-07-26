const appointmentService =
  require("../../../src/services/appointmentService");

const Appointment =
  require("../../../src/models/Appointment");

const Patient =
  require("../../../src/models/Patient");

const Doctor =
  require("../../../src/models/Doctor");

describe("AppointmentService", () => {

  describe("timeToMinutes", () => {

    test("should convert HH:mm time to minutes", () => {

      expect(
        appointmentService.timeToMinutes("08:30")
      ).toBe(510);

      expect(
        appointmentService.timeToMinutes("17:00")
      ).toBe(1020);

    });

  });


  describe("minutesToTime", () => {

    test("should convert minutes to HH:mm time", () => {

      expect(
        appointmentService.minutesToTime(510)
      ).toBe("08:30");

      expect(
        appointmentService.minutesToTime(1020)
      ).toBe("17:00");

    });

  });


  describe("calculateEndTime", () => {

    test("should calculate appointment end time", () => {

      expect(
        appointmentService.calculateEndTime(
          "08:30",
          30
        )
      ).toBe("09:00");

      expect(
        appointmentService.calculateEndTime(
          "16:00",
          60
        )
      ).toBe("17:00");

    });

  });


  describe("validateAppointmentDate", () => {

    test("should allow today's date", () => {

      const today = new Date();

      expect(() => {

        appointmentService.validateAppointmentDate(
          today
        );

      }).not.toThrow();

    });


    test("should allow a future appointment date", () => {

      const futureDate = new Date();

      futureDate.setDate(
        futureDate.getDate() + 1
      );

      expect(() => {

        appointmentService.validateAppointmentDate(
          futureDate
        );

      }).not.toThrow();

    });


    test("should reject an appointment date in the past", () => {

      const pastDate = new Date();

      pastDate.setDate(
        pastDate.getDate() - 1
      );

      expect(() => {

        appointmentService.validateAppointmentDate(
          pastDate
        );

      }).toThrow(
        "Appointment date cannot be in the past"
      );

    });

  });


  describe("validateWorkingHours", () => {

    test("should allow appointment within hospital working hours", () => {

      expect(() => {

        appointmentService.validateWorkingHours(
          "09:00",
          60
        );

      }).not.toThrow();

    });


    test("should reject appointment before hospital opening time", () => {

      expect(() => {

        appointmentService.validateWorkingHours(
          "07:30",
          30
        );

      }).toThrow(
        "Appointment cannot start before hospital opening time (08:00)"
      );

    });


    test("should reject appointment extending beyond hospital closing time", () => {

      expect(() => {

        appointmentService.validateWorkingHours(
          "16:30",
          60
        );

      }).toThrow(
        "Appointment cannot extend beyond hospital closing time (17:00)"
      );

    });


    test("should allow an appointment ending exactly at closing time", () => {

      expect(() => {

        appointmentService.validateWorkingHours(
          "16:00",
          60
        );

      }).not.toThrow();

    });

  });

    describe("checkDoctorAvailability", () => {

    test("should allow an available time slot", async () => {

      Appointment.find = jest.fn().mockResolvedValue([]);

      await expect(
        appointmentService.checkDoctorAvailability(
          "doctor-id",
          "2026-08-01",
          "10:00",
          30
        )
      ).resolves.not.toThrow();

      expect(
        Appointment.find
      ).toHaveBeenCalledWith({

        doctor: "doctor-id",

        appointmentDate: "2026-08-01",

        status: {
          $ne: "Cancelled"
        }

      });

    });


    test("should reject overlapping doctor appointment", async () => {

      Appointment.find = jest.fn().mockResolvedValue([

        {

          appointmentTime: "10:00",

          endTime: "11:00"

        }

      ]);


      await expect(

        appointmentService.checkDoctorAvailability(

          "doctor-id",

          "2026-08-01",

          "10:30",

          30

        )

      ).rejects.toThrow(

        "Doctor is not available at this time"

      );

    });


    test("should allow a non-overlapping doctor appointment", async () => {

      Appointment.find = jest.fn().mockResolvedValue([

        {

          appointmentTime: "10:00",

          endTime: "11:00"

        }

      ]);


      await expect(

        appointmentService.checkDoctorAvailability(

          "doctor-id",

          "2026-08-01",

          "11:00",

          30

        )

      ).resolves.not.toThrow();

    });

  });


  describe("checkPatientAvailability", () => {

    test("should allow an available patient time slot", async () => {

      Appointment.find = jest.fn().mockResolvedValue([]);


      await expect(

        appointmentService.checkPatientAvailability(

          "patient-id",

          "2026-08-01",

          "10:00",

          30

        )

      ).resolves.not.toThrow();


      expect(

        Appointment.find

      ).toHaveBeenCalledWith({

        patient: "patient-id",

        appointmentDate: "2026-08-01",

        status: {

          $ne: "Cancelled"

        }

      });

    });


    test("should reject overlapping patient appointment", async () => {

      Appointment.find = jest.fn().mockResolvedValue([

        {

          appointmentTime: "10:00",

          endTime: "11:00"

        }

      ]);


      await expect(

        appointmentService.checkPatientAvailability(

          "patient-id",

          "2026-08-01",

          "10:30",

          30

        )

      ).rejects.toThrow(

        "Patient already has an appointment at this time"

      );

    });


    test("should allow a non-overlapping patient appointment", async () => {

      Appointment.find = jest.fn().mockResolvedValue([

        {

          appointmentTime: "10:00",

          endTime: "11:00"

        }

      ]);


      await expect(

        appointmentService.checkPatientAvailability(

          "patient-id",

          "2026-08-01",

          "11:00",

          30

        )

      ).resolves.not.toThrow();

    });

  });

    describe("createAppointment", () => {

   test("should create an appointment successfully", async () => {

  const mockPatient = {
    _id: "patient-id",
    isActive: true,
  };

  const mockDoctor = {
    _id: "doctor-id",
  };

  const mockCreatedAppointment = {
    _id: "appointment-id",
  };

  const mockPopulatedAppointment = {
    _id: "appointment-id",
    patient: mockPatient,
    doctor: mockDoctor,
    appointmentTime: "10:00",
    duration: 30,
    endTime: "10:30",
  };

  Patient.findById = jest.fn()
    .mockResolvedValue(mockPatient);

  Doctor.findById = jest.fn()
    .mockResolvedValue(mockDoctor);

  Appointment.find = jest.fn()
    .mockResolvedValue([]);

  Appointment.create = jest.fn()
    .mockResolvedValue(mockCreatedAppointment);

  Appointment.findById = jest.fn()
    .mockReturnValue({

      populate: jest.fn()
        .mockReturnValue({

          populate: jest.fn()
            .mockResolvedValue(
              mockPopulatedAppointment
            ),

        }),

    });


  const result =
    await appointmentService.createAppointment({

      patient: "patient-id",

      doctor: "doctor-id",

      appointmentDate: "2026-08-01",

      appointmentTime: "10:00",

      duration: 30,

    });


  expect(
    Appointment.create
  ).toHaveBeenCalledWith({

    patient: "patient-id",

    doctor: "doctor-id",

    appointmentDate: "2026-08-01",

    appointmentTime: "10:00",

    duration: 30,

    endTime: "10:30",

  });


  expect(result).toEqual(
    mockPopulatedAppointment
  );

});


    test("should reject an appointment for an inactive patient", async () => {

      const Patient =
        require("../../../src/models/Patient");


      Patient.findById = jest.fn()
        .mockResolvedValue({

          _id: "patient-id",

          isActive: false,

        });


      await expect(

        appointmentService.createAppointment({

          patient: "patient-id",

          doctor: "doctor-id",

          appointmentDate: "2026-08-01",

          appointmentTime: "10:00",

          duration: 30,

        })

      ).rejects.toThrow(

        "Patient not found"

      );

    });


    test("should reject an appointment when doctor does not exist", async () => {

      const Patient =
        require("../../../src/models/Patient");


      const Doctor =
        require("../../../src/models/Doctor");


      Patient.findById = jest.fn()
        .mockResolvedValue({

          _id: "patient-id",

          isActive: true,

        });


      Doctor.findById = jest.fn()
        .mockResolvedValue(null);


      await expect(

        appointmentService.createAppointment({

          patient: "patient-id",

          doctor: "doctor-id",

          appointmentDate: "2026-08-01",

          appointmentTime: "10:00",

          duration: 30,

        })

      ).rejects.toThrow(

        "Doctor not found"

      );

    });

  });

  describe("updateAppointmentStatus", () => {

  test("should update appointment status through a valid transition", async () => {

    const mockAppointment = {
      status: "Scheduled",

      save: jest.fn()
        .mockResolvedValue(true),
    };

    Appointment.findById = jest.fn()
      .mockResolvedValue(mockAppointment);

    const result =
      await appointmentService.updateAppointmentStatus(
        "appointment-id",
        "Confirmed"
      );

    expect(
      mockAppointment.status
    ).toBe("Confirmed");

    expect(
      mockAppointment.save
    ).toHaveBeenCalled();

    expect(result).toBe(
      mockAppointment
    );

  });


  test("should reject an invalid appointment status transition", async () => {

    const mockAppointment = {

      status: "Scheduled",

      save: jest.fn(),

    };

    Appointment.findById = jest.fn()
      .mockResolvedValue(mockAppointment);

    await expect(

      appointmentService.updateAppointmentStatus(

        "appointment-id",

        "Completed"

      )

    ).rejects.toThrow(

      "Invalid appointment status transition from Scheduled to Completed"

    );

  });


  test("should throw 404 when appointment does not exist", async () => {

    Appointment.findById = jest.fn()
      .mockResolvedValue(null);

    await expect(

      appointmentService.updateAppointmentStatus(

        "missing-appointment-id",

        "Confirmed"

      )

    ).rejects.toThrow(
      "Appointment not found"
    );

  });

});

describe("getAllAppointments", () => {

  test("should return paginated appointments", async () => {

    Appointment.countDocuments = jest.fn()
      .mockResolvedValue(25);

    Appointment.find = jest.fn()
      .mockReturnValue({

        populate: jest.fn()
          .mockReturnThis(),

        sort: jest.fn()
          .mockReturnThis(),

        skip: jest.fn()
          .mockReturnThis(),

        limit: jest.fn()
          .mockResolvedValue([

            {
              _id: "appointment-1",
              status: "Scheduled",
            },

          ]),

      });


    const result =
      await appointmentService.getAllAppointments({

        page: 2,

        limit: 10,

      });


    expect(
      result.pagination.totalRecords
    ).toBe(25);


    expect(
      result.pagination.totalPages
    ).toBe(3);


    expect(
      result.pagination.currentPage
    ).toBe(2);


    expect(
      result.pagination.pageSize
    ).toBe(10);


    expect(
      result.appointments
    ).toHaveLength(1);

  });


  test("should filter appointments by status, doctor, and patient", async () => {

    Appointment.countDocuments = jest.fn()
      .mockResolvedValue(1);


    Appointment.find = jest.fn()
      .mockReturnValue({

        populate: jest.fn()
          .mockReturnThis(),

        sort: jest.fn()
          .mockReturnThis(),

        skip: jest.fn()
          .mockReturnThis(),

        limit: jest.fn()
          .mockResolvedValue([

            {
              _id: "appointment-1",
              status: "Confirmed",
            },

          ]),

      });


    await appointmentService.getAllAppointments({

      status: "Confirmed",

      doctor: "doctor-id",

      patient: "patient-id",

    });


    expect(
      Appointment.countDocuments
    ).toHaveBeenCalledWith({

      status: "Confirmed",

      doctor: "doctor-id",

      patient: "patient-id",

    });


    expect(
      Appointment.find
    ).toHaveBeenCalledWith({

      status: "Confirmed",

      doctor: "doctor-id",

      patient: "patient-id",

    });

  });

});

test("should search appointments by patient name", async () => {

  Patient.find = jest.fn()
    .mockReturnValue({

      select: jest.fn()
        .mockResolvedValue([

          {
            _id: "patient-1",
          },

          {
            _id: "patient-2",
          },

        ]),

    });


  Appointment.countDocuments = jest.fn()
    .mockResolvedValue(2);


  Appointment.find = jest.fn()
    .mockReturnValue({

      populate: jest.fn()
        .mockReturnThis(),

      sort: jest.fn()
        .mockReturnThis(),

      skip: jest.fn()
        .mockReturnThis(),

      limit: jest.fn()
        .mockResolvedValue([

          {
            _id: "appointment-1",
          },

          {
            _id: "appointment-2",
          },

        ]),

    });


  await appointmentService.getAllAppointments({

    search: "John",

  });


  expect(
    Patient.find
  ).toHaveBeenCalledWith({

    $or: [

      {

        firstName: {

          $regex: "John",

          $options: "i",

        },

      },

      {

        lastName: {

          $regex: "John",

          $options: "i",

        },

      },

    ],

  });


  expect(
    Appointment.find
  ).toHaveBeenCalledWith({

    patient: {

      $in: [

        "patient-1",

        "patient-2",

      ],

    },

  });

});

test("should sort appointments in descending order", async () => {

  Appointment.countDocuments = jest.fn()
    .mockResolvedValue(1);


  const sortMock = jest.fn()
    .mockReturnThis();


  Appointment.find = jest.fn()
    .mockReturnValue({

      populate: jest.fn()
        .mockReturnThis(),

      sort: sortMock,

      skip: jest.fn()
        .mockReturnThis(),

      limit: jest.fn()
        .mockResolvedValue([

          {
            _id: "appointment-1",
          },

        ]),

    });


  await appointmentService.getAllAppointments({

    sortBy: "appointmentDate",

    order: "desc",

  });


  expect(
    sortMock
  ).toHaveBeenCalledWith({

    appointmentDate: -1,

  });

});

});