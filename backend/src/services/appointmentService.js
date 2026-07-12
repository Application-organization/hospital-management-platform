const Appointment = require("../models/Appointment");
const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");
const AppError = require("../errors/AppError");

class AppointmentService {

  /**
   * Allowed appointment status transitions
   */
  statusTransitions = {

    "Scheduled": [
      "Confirmed",
      "Cancelled"
    ],

    "Confirmed": [
      "Checked-In",
      "Cancelled"
    ],

    "Checked-In": [
      "In Consultation"
    ],

    "In Consultation": [
      "Completed"
    ],

    "Completed": [],

    "Cancelled": []

  };


  /**
   * Convert HH:mm to minutes
   */
  timeToMinutes(time) {

    const [hours, minutes] =
      time.split(":").map(Number);

    return hours * 60 + minutes;
  }



  /**
   * Convert minutes back to HH:mm
   */
  minutesToTime(totalMinutes) {

    const hours =
      Math.floor(totalMinutes / 60);

    const minutes =
      totalMinutes % 60;


    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;

  }



  /**
   * Calculate appointment end time
   */
  calculateEndTime(startTime, duration) {

    const startMinutes =
      this.timeToMinutes(startTime);


    return this.minutesToTime(
      startMinutes + duration
    );

  }



  /**
   * Validate appointment date
   */
  validateAppointmentDate(appointmentDate) {

    const today = new Date();

    today.setHours(0,0,0,0);


    const selectedDate =
      new Date(appointmentDate);

    selectedDate.setHours(0,0,0,0);



    if(selectedDate < today){

      throw new AppError(
        "Appointment date cannot be in the past",
        400
      );

    }

  }



  /**
   * Validate hospital working hours
   */
  validateWorkingHours(startTime, duration){

    const openingTime =
      this.timeToMinutes("08:00");


    const closingTime =
      this.timeToMinutes("17:00");


    const appointmentStart =
      this.timeToMinutes(startTime);


    const appointmentEnd =
      appointmentStart + duration;



    if(appointmentStart < openingTime){

      throw new AppError(
        "Appointment cannot start before hospital opening time (08:00)",
        400
      );

    }



    if(appointmentEnd > closingTime){

      throw new AppError(
        "Appointment cannot extend beyond hospital closing time (17:00)",
        400
      );

    }

  }



  /**
   * Check doctor availability
   */
  async checkDoctorAvailability(
    doctorId,
    appointmentDate,
    appointmentTime,
    duration
  ){

    const newStart =
      this.timeToMinutes(
        appointmentTime
      );


    const newEnd =
      newStart + duration;



    const existingAppointments =
      await Appointment.find({

        doctor: doctorId,

        appointmentDate,

        status:{
          $ne:"Cancelled"
        }

      });



    for(const appointment of existingAppointments){

      const existingStart =
        this.timeToMinutes(
          appointment.appointmentTime
        );


      const existingEnd =
        this.timeToMinutes(
          appointment.endTime
        );


      const overlap =
        newStart < existingEnd &&
        newEnd > existingStart;



      if(overlap){

        throw new AppError(
          "Doctor is not available at this time",
          400
        );

      }

    }

  }



  /**
   * Check patient availability
   */
  async checkPatientAvailability(
    patientId,
    appointmentDate,
    appointmentTime,
    duration
  ){

    const newStart =
      this.timeToMinutes(
        appointmentTime
      );


    const newEnd =
      newStart + duration;



    const existingAppointments =
      await Appointment.find({

        patient: patientId,

        appointmentDate,

        status:{
          $ne:"Cancelled"
        }

      });



    for(const appointment of existingAppointments){


      const existingStart =
        this.timeToMinutes(
          appointment.appointmentTime
        );


      const existingEnd =
        this.timeToMinutes(
          appointment.endTime
        );


      const overlap =
        newStart < existingEnd &&
        newEnd > existingStart;



      if(overlap){

        throw new AppError(
          "Patient already has an appointment at this time",
          400
        );

      }

    }

  }



  /**
   * Create Appointment
   */
  async createAppointment(appointmentData){

    this.validateAppointmentDate(
      appointmentData.appointmentDate
    );


    const patient =
      await Patient.findById(
        appointmentData.patient
      );


    if(!patient || !patient.isActive){

      throw new AppError(
        "Patient not found",
        404
      );

    }



    const doctor =
      await Doctor.findById(
        appointmentData.doctor
      );


    if(!doctor){

      throw new AppError(
        "Doctor not found",
        404
      );

    }



    const duration =
      appointmentData.duration || 30;



    this.validateWorkingHours(
      appointmentData.appointmentTime,
      duration
    );



    await this.checkDoctorAvailability(
      appointmentData.doctor,
      appointmentData.appointmentDate,
      appointmentData.appointmentTime,
      duration
    );



    await this.checkPatientAvailability(
      appointmentData.patient,
      appointmentData.appointmentDate,
      appointmentData.appointmentTime,
      duration
    );



    const endTime =
      this.calculateEndTime(
        appointmentData.appointmentTime,
        duration
      );



    const appointment =
      await Appointment.create({

        ...appointmentData,

        duration,

        endTime

      });



    return await Appointment.findById(
      appointment._id
    )
    .populate("patient")
    .populate("doctor");

  }



  /**
   * Update Appointment Status
   */
  async updateAppointmentStatus(id, newStatus){

    const appointment =
      await Appointment.findById(id);



    if(!appointment){

      throw new AppError(
        "Appointment not found",
        404
      );

    }



    const currentStatus =
      appointment.status;



    const allowedStatuses =
      this.statusTransitions[currentStatus];



    if(
      !allowedStatuses.includes(newStatus)
    ){

      throw new AppError(
        `Invalid appointment status transition from ${currentStatus} to ${newStatus}`,
        400
      );

    }



    appointment.status =
      newStatus;


    await appointment.save();



    return appointment;

  }



  /**
   * Get All Appointments
   */
  async getAllAppointments(){

    return await Appointment.find()

      .populate("patient")

      .populate("doctor")

      .sort({
        appointmentDate:1
      });

  }



  /**
   * Get Appointment By ID
   */
  async getAppointmentById(id){

    const appointment =
      await Appointment.findById(id)

      .populate("patient")

      .populate("doctor");



    if(!appointment){

      throw new AppError(
        "Appointment not found",
        404
      );

    }


    return appointment;

  }



  /**
   * Update Appointment
   */
  async updateAppointment(id, appointmentData){

    const appointment =
      await Appointment.findById(id);



    if(!appointment){

      throw new AppError(
        "Appointment not found",
        404
      );

    }



    const appointmentTime =
      appointmentData.appointmentTime ||
      appointment.appointmentTime;



    const duration =
      appointmentData.duration ||
      appointment.duration;



    this.validateWorkingHours(
      appointmentTime,
      duration
    );



    appointmentData.endTime =
      this.calculateEndTime(
        appointmentTime,
        duration
      );



    return await Appointment.findByIdAndUpdate(
      id,
      appointmentData,
      {
        new:true,
        runValidators:true
      }
    )
    .populate("patient")
    .populate("doctor");

  }



  /**
   * Delete Appointment
   */
  async deleteAppointment(id){

    const appointment =
      await Appointment.findById(id);



    if(!appointment){

      throw new AppError(
        "Appointment not found",
        404
      );

    }



    await appointment.deleteOne();


    return appointment;

  }

}


module.exports = new AppointmentService();