class UserService {
  /**
   * Get authenticated user's profile
   */
  async getProfile(user) {
    return user;
  }

  /**
   * Get Admin Dashboard
   */
  async getAdminDashboard(user) {
    return {
      user,
      statistics: {
        totalPatients: 0,
        totalDoctors: 0,
        totalAppointments: 0,
      },
    };
  }
}

module.exports = new UserService();