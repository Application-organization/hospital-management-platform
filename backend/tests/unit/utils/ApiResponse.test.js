const ApiResponse = require("../../../src/utils/ApiResponse");

describe("ApiResponse", () => {
  let res;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  describe("success()", () => {
    test("returns a successful response with default values", () => {
      ApiResponse.success(
        res,
        "Request successful"
      );

      expect(res.status).toHaveBeenCalledWith(200);

      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: "Request successful",
        data: null,
      });
    });

    test("returns a successful response with custom data", () => {
      const data = {
        id: "123",
        name: "John Doe",
      };

      ApiResponse.success(
        res,
        "User retrieved successfully",
        data
      );

      expect(res.status).toHaveBeenCalledWith(200);

      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: "User retrieved successfully",
        data,
      });
    });

    test("returns a successful response with a custom status code", () => {
      ApiResponse.success(
        res,
        "Resource created successfully",
        {
          id: "123",
        },
        201
      );

      expect(res.status).toHaveBeenCalledWith(201);

      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: "Resource created successfully",
        data: {
          id: "123",
        },
      });
    });

    test("returns the response object from res.json()", () => {
      const responseObject = {
        success: true,
        message: "Success",
        data: null,
      };

      res.json.mockReturnValue(responseObject);

      const result = ApiResponse.success(
        res,
        "Success"
      );

      expect(result).toEqual(responseObject);
    });
  });

  describe("error()", () => {
    test("returns an error response with default status code", () => {
      ApiResponse.error(
        res,
        "Something went wrong"
      );

      expect(res.status).toHaveBeenCalledWith(500);

      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Something went wrong",
      });
    });

    test("returns an error response with a custom status code", () => {
      ApiResponse.error(
        res,
        "Unauthorized",
        401
      );

      expect(res.status).toHaveBeenCalledWith(401);

      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Unauthorized",
      });
    });

    test("includes data when error data is provided", () => {
      const errors = [
        {
          field: "email",
          message: "Invalid email",
        },
      ];

      ApiResponse.error(
        res,
        "Validation failed",
        400,
        errors
      );

      expect(res.status).toHaveBeenCalledWith(400);

      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Validation failed",
        data: errors,
      });
    });

    test("returns the response object from res.json()", () => {
      const responseObject = {
        success: false,
        message: "Error",
      };

      res.json.mockReturnValue(responseObject);

      const result = ApiResponse.error(
        res,
        "Error"
      );

      expect(result).toEqual(responseObject);
    });
  });
});