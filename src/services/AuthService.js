import api from './server';

const AuthService = {
  // Register a new user
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', {
        name: `${userData.firstName} ${userData.lastName}`,
        email: userData.email,
        password: userData.password,
        role: userData.role,
        phone: userData.phone,
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  // Verify email with code
  verifyEmail: async (email, code) => {
    try {
      const response = await api.post('/auth/verifyEmail', {
        email,
        emailVerificationCode: code,
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  // Resend email verification code
  resendVerificationCode: async (email) => {
    try {
      const response = await api.post('/auth/resendCode', { email });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  // Login (Step 1: Validate email and password, send 2FA code)
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  // Verify 2FA code (Step 2: Complete login)
  verify2FA: async (userId, code) => {
    try {
      const response = await api.post('/auth/verify2FA', {
        userId,
        twoFAToken: code,
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  resend2FACode: async (email) => {
    try {
      const response = await api.post('/auth/resend2FA', { email });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  // Request password reset
  requestPasswordReset: async (email) => {
    console.log(email);
    try {
      const response = await api.post('/auth/requestPasswordReset', { email });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  // Reset password
  resetPassword: async (token, newPassword) => {
    try {
      const response = await api.post('/auth/resetPassword', {
        resetToken: token,
        newPassword,
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },


};

export default AuthService;