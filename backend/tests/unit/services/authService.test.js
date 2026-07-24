const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../../src/models/User");
const ApiError = require("../../../src/utils/ApiError");
const env = require("../../../src/config/env");

const {
  registerUser,
  loginUser,
} = require("../../../src/services/authService");

jest.mock("bcryptjs");
jest.mock("jsonwebtoken");
jest.mock("../../../src/models/User");

describe("Authentication Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("registerUser", () => {
    test("registers a new user successfully", async () => {
      User.findOne.mockResolvedValue(null);

      bcrypt.hash.mockResolvedValue("hashed-password");

      User.create.mockResolvedValue({
        _id: "user-id",
        firstName: "John",
        lastName: "Doe",
        email: "john@hospital.com",
        password: "hashed-password",
        role: "user",
      });

      const result = await registerUser({
        firstName: "John",
        lastName: "Doe",
        email: "john@hospital.com",
        password: "Password123!",
        role: "user",
      });

      expect(User.findOne).toHaveBeenCalledWith({
        email: "john@hospital.com",
      });

      expect(bcrypt.hash).toHaveBeenCalledWith(
        "Password123!",
        10
      );

      expect(User.create).toHaveBeenCalledWith({
        firstName: "John",
        lastName: "Doe",
        email: "john@hospital.com",
        password: "hashed-password",
        role: "user",
      });

      expect(result).toEqual({
        message: "User registered successfully",
        data: {
          id: "user-id",
          firstName: "John",
          lastName: "Doe",
          email: "john@hospital.com",
          role: "user",
        },
      });
    });

    test("rejects registration when email already exists", async () => {
      User.findOne.mockResolvedValue({
        _id: "existing-user",
        email: "john@hospital.com",
      });

      await expect(
        registerUser({
          firstName: "John",
          lastName: "Doe",
          email: "john@hospital.com",
          password: "Password123!",
          role: "user",
        })
      ).rejects.toThrow("Email already exists");

      expect(bcrypt.hash).not.toHaveBeenCalled();
      expect(User.create).not.toHaveBeenCalled();
    });
  });

  describe("loginUser", () => {
    test("logs in a user successfully with valid credentials", async () => {
      const user = {
        _id: "user-id",
        firstName: "John",
        lastName: "Doe",
        email: "john@hospital.com",
        password: "hashed-password",
        role: "user",
      };

      User.findOne.mockResolvedValue(user);

      bcrypt.compare.mockResolvedValue(true);

      jwt.sign.mockReturnValue("mock-jwt-token");

      const result = await loginUser({
        email: "john@hospital.com",
        password: "Password123!",
      });

      expect(User.findOne).toHaveBeenCalledWith({
        email: "john@hospital.com",
      });

      expect(bcrypt.compare).toHaveBeenCalledWith(
        "Password123!",
        "hashed-password"
      );

      expect(jwt.sign).toHaveBeenCalledWith(
        {
          id: "user-id",
          role: "user",
        },
        env.jwt.secret,
        {
          expiresIn: env.jwt.expiresIn,
        }
      );

      expect(result).toEqual({
        message: "Login successful",
        data: {
          user: {
            id: "user-id",
            firstName: "John",
            lastName: "Doe",
            email: "john@hospital.com",
            role: "user",
          },
          token: "mock-jwt-token",
        },
      });
    });

    test("rejects login when user does not exist", async () => {
      User.findOne.mockResolvedValue(null);

      await expect(
        loginUser({
          email: "unknown@hospital.com",
          password: "Password123!",
        })
      ).rejects.toThrow("Invalid email or password");

      expect(bcrypt.compare).not.toHaveBeenCalled();
      expect(jwt.sign).not.toHaveBeenCalled();
    });

    test("rejects login when password is incorrect", async () => {
      User.findOne.mockResolvedValue({
        _id: "user-id",
        email: "john@hospital.com",
        password: "hashed-password",
        role: "user",
      });

      bcrypt.compare.mockResolvedValue(false);

      await expect(
        loginUser({
          email: "john@hospital.com",
          password: "WrongPassword!",
        })
      ).rejects.toThrow("Invalid email or password");

      expect(jwt.sign).not.toHaveBeenCalled();
    });
  });
});