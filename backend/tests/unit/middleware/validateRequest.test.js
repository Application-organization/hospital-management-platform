const {
  validationResult,
} = require("express-validator");

const ApiResponse = require(
  "../../../src/utils/ApiResponse"
);

const validateRequest = require(
  "../../../src/middleware/validateRequest"
);

jest.mock("express-validator");
jest.mock("../../../src/utils/ApiResponse");

describe("Request Validation Middleware", () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = {};
    res = {};
    next = jest.fn();

    jest.clearAllMocks();

    ApiResponse.error.mockImplementation(
      (
        response,
        message,
        statusCode,
        errors
      ) => ({
        response,
        message,
        statusCode,
        errors,
      })
    );
  });

  test("calls next when request validation succeeds", () => {
    validationResult.mockReturnValue({
      isEmpty: () => true,
    });

    validateRequest(req, res, next);

    expect(validationResult).toHaveBeenCalledWith(
      req
    );

    expect(next).toHaveBeenCalledTimes(1);

    expect(ApiResponse.error).not.toHaveBeenCalled();
  });

  test("returns 400 when validation errors exist", () => {
    const validationErrors = [
      {
        path: "email",
        msg: "Please provide a valid email address",
      },
      {
        path: "password",
        msg: "Password must be at least 8 characters",
      },
    ];

    validationResult.mockReturnValue({
      isEmpty: () => false,
      array: () => validationErrors,
    });

    validateRequest(req, res, next);

    expect(ApiResponse.error).toHaveBeenCalledWith(
      res,
      "Validation failed",
      400,
      [
        {
          field: "email",
          message:
            "Please provide a valid email address",
        },
        {
          field: "password",
          message:
            "Password must be at least 8 characters",
        },
      ]
    );

    expect(next).not.toHaveBeenCalled();
  });

  test("does not continue when validation errors exist", () => {
    validationResult.mockReturnValue({
      isEmpty: () => false,
      array: () => [
        {
          path: "email",
          msg: "Invalid email",
        },
      ],
    });

    validateRequest(req, res, next);

    expect(next).not.toHaveBeenCalled();
  });

  test("maps express-validator errors to field and message", () => {
    validationResult.mockReturnValue({
      isEmpty: () => false,
      array: () => [
        {
          type: "field",
          value: "",
          msg: "Email is required",
          path: "email",
          location: "body",
        },
      ],
    });

    validateRequest(req, res, next);

    const responseErrors =
      ApiResponse.error.mock.calls[0][3];

    expect(responseErrors).toEqual([
      {
        field: "email",
        message: "Email is required",
      },
    ]);
  });
});