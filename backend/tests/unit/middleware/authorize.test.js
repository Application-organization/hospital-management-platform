const ApiResponse = require("../../../src/utils/ApiResponse");

const authorize = require(
  "../../../src/middleware/authorize"
);

jest.mock("../../../src/utils/ApiResponse");

describe("Authorization Middleware", () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = {};
    res = {};
    next = jest.fn();

    ApiResponse.error.mockImplementation(
      (response, message, statusCode) => ({
        response,
        message,
        statusCode,
      })
    );

    jest.clearAllMocks();
  });

  test("rejects request when user is not authenticated", () => {
    const middleware = authorize("admin");

    middleware(req, res, next);

    expect(ApiResponse.error).toHaveBeenCalledWith(
      res,
      "Authentication required",
      401
    );

    expect(next).not.toHaveBeenCalled();
  });

  test("allows user with an authorized role", () => {
    req.user = {
      id: "user-id",
      role: "admin",
    };

    const middleware = authorize("admin");

    middleware(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);

    expect(ApiResponse.error).not.toHaveBeenCalled();
  });

  test("rejects user with an unauthorized role", () => {
    req.user = {
      id: "user-id",
      role: "doctor",
    };

    const middleware = authorize("admin");

    middleware(req, res, next);

    expect(ApiResponse.error).toHaveBeenCalledWith(
      res,
      "You do not have permission to perform this action",
      403
    );

    expect(next).not.toHaveBeenCalled();
  });

  test("allows multiple authorized roles", () => {
    req.user = {
      id: "user-id",
      role: "doctor",
    };

    const middleware = authorize(
      "admin",
      "doctor",
      "nurse"
    );

    middleware(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);

    expect(ApiResponse.error).not.toHaveBeenCalled();
  });

  test("rejects role not included in allowed roles", () => {
    req.user = {
      id: "user-id",
      role: "patient",
    };

    const middleware = authorize(
      "admin",
      "doctor"
    );

    middleware(req, res, next);

    expect(ApiResponse.error).toHaveBeenCalledWith(
      res,
      "You do not have permission to perform this action",
      403
    );

    expect(next).not.toHaveBeenCalled();
  });
});