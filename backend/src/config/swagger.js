const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Hospital Management Platform API",
      version: "1.0.0",
      description:
        "A production-ready Hospital Management REST API built with Node.js, Express.js, MongoDB, JWT Authentication, Role-Based Access Control, and Swagger documentation.",
      contact: {
        name: "Nwusulor John Ifenna (Agape) ",
        email: "agapeifechukwuemmanuel@gmail.com",
      },
      license: {
        name: "MIT License",
      },
    },

    servers: [
      {
        url: "http://localhost:5000/api/v1",
        description: "Local Development Server",
      },
    ],

    tags: [
      {
        name: "Authentication",
        description: "User Authentication APIs",
      },
      {
        name: "Patients",
        description: "Patient Management APIs",
      },
      {
        name: "Doctors",
        description: "Doctor Management APIs",
      },
      {
        name: "Appointments",
        description: "Appointment Management APIs",
      },
      {
        name: "Users",
        description: "User Profile & Dashboard APIs",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Enter JWT token in the format: Bearer <your_token>",
        },
      },
    },

    security: [
      {
        bearerAuth: [],
      },
    ],

    externalDocs: {
      description: "Hospital Management Platform Documentation",
      url: "https://github.com/nwusulor-john-ifechukwu/hospital-management-platform",
    },
  },

  apis: [
    "./src/routes/*.js",
    "./src/controllers/*.js",
  ],
};

module.exports = swaggerJsdoc(options);