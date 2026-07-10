const jwt = require("jsonwebtoken");

const User = require("../models/User");
const ApiResponse = require("../utils/ApiResponse");
const env = require("../config/env");

const authenticate = async (req, res, next) => {
  try {
    // Get Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return ApiResponse.error(
        res,
        "Authentication token is missing",
        401
      );
    }

    // Extract token
    const token = authHeader.split(" ")[1];

    // Verify JWT
    const decoded = jwt.verify(token, env.jwt.secret);

    // Find user
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return ApiResponse.error(
        res,
        "User no longer exists",
        401
      );
    }

    // Attach user to request
    req.user = user;

    next();
  } catch (error) {
    return ApiResponse.error(
      res,
      "Invalid or expired authentication token",
      401
    );
  }
};

module.exports = authenticate;