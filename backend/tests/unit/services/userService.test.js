const userService = require("../../../src/services/userService");

describe("User Service", () => {
  describe("getProfile", () => {
    test("returns the authenticated user profile", async () => {
      const user = {
        _id: "user-id",
        firstName: "John",
        lastName: "Doe",
        email: "john@hospital.com",
        role: "Admin",
      };

      const result = await userService.getProfile(user);

      expect(result).toBe(user);
    });

    test("returns null when no user is provided", async () => {
      const result = await userService.getProfile(null);

      expect(result).toBeNull();
    });
  });

  describe("getAdminDashboard", () => {
    test("returns the user and dashboard statistics", async () => {
      const user = {
        _id: "admin-id",
        firstName: "Admin",
        lastName: "User",
        email: "admin@hospital.com",
        role: "Admin",
      };

      const result =
        await userService.getAdminDashboard(user);

      expect(result).toEqual({
        user,
        statistics: {
          totalPatients: 0,
          totalDoctors: 0,
          totalAppointments: 0,
        },
      });
    });

    test("includes the provided user object in the dashboard response", async () => {
      const user = {
        _id: "doctor-id",
        role: "Doctor",
      };

      const result =
        await userService.getAdminDashboard(user);

      expect(result.user).toBe(user);
    });
  });
});