const jwt = require("jsonwebtoken");

const User = require("../../../src/models/User");
const ApiResponse = require("../../../src/utils/ApiResponse");
const env = require("../../../src/config/env");

const authenticate = require(
  "../../../src/middleware/authMiddleware"
);

jest.mock("jsonwebtoken");
jest.mock("../../../src/models/User");
jest.mock("../../../src/utils/ApiResponse");

describe("Authentication Middleware", () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = {
      headers: {},
    };

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

  test("rejects request when authorization header is missing", async () => {
    await authenticate(req, res, next);

    expect(ApiResponse.error).toHaveBeenCalledWith(
      res,
      "Authentication token is missing",
      401
    );

    expect(next).not.toHaveBeenCalled();
  });

  test("rejects request when authorization header is malformed", async () => {
    req.headers.authorization = "Basic some-token";

    await authenticate(req, res, next);

    expect(ApiResponse.error).toHaveBeenCalledWith(
      res,
      "Authentication token is missing",
      401
    );

    expect(next).not.toHaveBeenCalled();
  });

  test("rejects request when JWT is invalid", async () => {
    req.headers.authorization = "Bearer invalid-token";

    jwt.verify.mockImplementation(() => {
      throw new Error("Invalid token");
    });

    await authenticate(req, res, next);

    expect(jwt.verify).toHaveBeenCalledWith(
      "invalid-token",
      env.jwt.secret
    );

    expect(ApiResponse.error).toHaveBeenCalledWith(
      res,
      "Invalid or expired authentication token",
      401
    );

    expect(next).not.toHaveBeenCalled();
  });

  test("rejects request when JWT is expired", async () => {
    req.headers.authorization = "Bearer expired-token";

    jwt.verify.mockImplementation(() => {
      throw new Error("TokenExpiredError");
    });

    await authenticate(req, res, next);

    expect(ApiResponse.error).toHaveBeenCalledWith(
      res,
      "Invalid or expired authentication token",
      401
    );

    expect(next).not.toHaveBeenCalled();
  });

  test("rejects request when authenticated user no longer exists", async () => {
    req.headers.authorization = "Bearer valid-token";

    jwt.verify.mockReturnValue({
      id: "deleted-user-id",
    });

    User.findById.mockReturnValue({
      select: jest.fn().mockResolvedValue(null),
    });

    await authenticate(req, res, next);

    expect(User.findById).toHaveBeenCalledWith(
      "deleted-user-id"
    );

    expect(ApiResponse.error).toHaveBeenCalledWith(
      res,
      "User no longer exists",
      401
    );

    expect(next).not.toHaveBeenCalled();
  });

  test("authenticates valid user successfully", async () => {
    const user = {
      _id: "user-id",
      firstName: "John",
      lastName: "Doe",
      email: "john@hospital.com",
      role: "admin",
    };

    req.headers.authorization = "Bearer valid-token";

    jwt.verify.mockReturnValue({
      id: "user-id",
    });

    User.findById.mockReturnValue({
      select: jest.fn().mockResolvedValue(user),
    });

    await authenticate(req, res, next);

    expect(jwt.verify).toHaveBeenCalledWith(
      "valid-token",
      env.jwt.secret
    );

    expect(User.findById).toHaveBeenCalledWith(
      "user-id"
    );

    expect(req.user).toEqual(user);

    expect(next).toHaveBeenCalledTimes(1);
  });
});