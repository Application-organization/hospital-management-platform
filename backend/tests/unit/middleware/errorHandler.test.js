const ApiResponse = require(
  "../../../src/utils/ApiResponse"
);

const {
  notFoundHandler,
  errorHandler,
} = require(
  "../../../src/middleware/errorHandler"
);

jest.mock("../../../src/utils/ApiResponse");

describe("Error Handling Middleware", () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = {
      originalUrl: "/api/v1/unknown",
    };

    res = {};
    next = jest.fn();

    jest.clearAllMocks();

    ApiResponse.error.mockImplementation(
      (
        response,
        message,
        statusCode
      ) => ({
        response,
        message,
        statusCode,
      })
    );

    jest.spyOn(console, "error").mockImplementation(
      () => {}
    );
  });

  afterEach(() => {
    console.error.mockRestore();
  });

  describe("notFoundHandler", () => {
    test("returns 404 for an unknown route", () => {
      notFoundHandler(req, res, next);

      expect(
        ApiResponse.error
      ).toHaveBeenCalledWith(
        res,
        "Route /api/v1/unknown not found",
        404
      );
    });

    test("does not call next for an unknown route", () => {
      notFoundHandler(req, res, next);

      expect(next).not.toHaveBeenCalled();
    });
  });

  describe("errorHandler", () => {
    test("returns the error status code when provided", () => {
      const error = new Error(
        "Something went wrong"
      );

      error.statusCode = 400;

      errorHandler(
        error,
        req,
        res,
        next
      );

      expect(console.error).toHaveBeenCalledWith(
        error
      );

      expect(
        ApiResponse.error
      ).toHaveBeenCalledWith(
        res,
        "Something went wrong",
        400
      );
    });

    test("defaults to 500 when no status code is provided", () => {
      const error = new Error(
        "Unexpected server error"
      );

      errorHandler(
        error,
        req,
        res,
        next
      );

      expect(
        ApiResponse.error
      ).toHaveBeenCalledWith(
        res,
        "Unexpected server error",
        500
      );
    });

    test("uses default message when error has no message", () => {
      const error = {
        statusCode: 500,
      };

      errorHandler(
        error,
        req,
        res,
        next
      );

      expect(
        ApiResponse.error
      ).toHaveBeenCalledWith(
        res,
        "Internal Server Error",
        500
      );
    });

    test("does not call next after handling the error", () => {
      const error = new Error(
        "Handled error"
      );

      errorHandler(
        error,
        req,
        res,
        next
      );

      expect(next).not.toHaveBeenCalled();
    });
  });
});