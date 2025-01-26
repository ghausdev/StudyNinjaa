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

  // Submit tutor onboarding information
  submitTutorOnboarding: async (formData) => {
    try {
      // Create a new FormData instance to handle file uploads
      const data = new FormData();

      // Add basic information
      data.append('yearsOfExperience', formData.yearsOfExperience);
      data.append('university', formData.university);
      data.append('motivation', formData.motivation);
      data.append('subjects', JSON.stringify(formData.subjects));
      data.append('StudyLevel', formData.StudyLevel);
      data.append('rightToWork', formData.rightToWork.hasRight);
      data.append('eligibility', formData.rightToWork.nationality);
      data.append('hasDBS', formData.dbsCheck.hasDBS);
      data.append('appliedForDBS', formData.dbsCheck.startApplication);

      // Handle Right to Work documents based on nationality
      if (formData.rightToWork.nationality === 'british-irish') {
        if (formData.rightToWork.documentType === 'passport') {
          data.append('passportURL', formData.rightToWork.documentFile);
        } else {
          data.append('UkBornOrAdoptedCertificate', formData.rightToWork.documentFile);
        }
        if (formData.rightToWork.niNumber) {
          data.append('NINumber', formData.rightToWork.niNumber);
        }
      } else if (formData.rightToWork.nationality === 'eu-eea') {
        data.append('passportURL', formData.rightToWork.documentFile);
        data.append('shareCode', formData.rightToWork.shareCode);
        data.append('DOB', formData.rightToWork.dateOfBirth);
      } else if (formData.rightToWork.nationality === 'other') {
        if (formData.rightToWork.documentType === 'brp') {
          data.append('biometricResidencePermit', formData.rightToWork.documentFile);
        } else {
          data.append('validVisa', formData.rightToWork.documentFile);
        }
      }

      // Handle DBS Check information
      if (formData.dbsCheck.hasDBS) {
        data.append('fullNameDBS', formData.dbsCheck.fullNameDBS);
        data.append('certificateNumber', formData.dbsCheck.certificateNumber);
        if (formData.dbsCheck.certificateFile) {
          data.append('certificateFile', formData.dbsCheck.certificateFile);
        }
      } else if (formData.dbsCheck.startApplication) {
        data.append('dbsApplicationDetails', JSON.stringify({
          fullName: formData.dbsCheck.applicationDetails.fullName,
          phone: formData.dbsCheck.applicationDetails.phoneNumber,
          email: formData.dbsCheck.applicationDetails.email
        }));
      }

      // Handle university documents if present
      if (formData.universityDocuments && formData.universityDocuments.length > 0) {
        formData.universityDocuments.forEach((doc, index) => {
          data.append('universityDocuments', doc);
        });
      }

      // Handle profile picture if present
      if (formData.profilePicture) {
        data.append('profilePicture', formData.profilePicture);
      }

      const response = await api.post('/tutor/update-info', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

export default AuthService;