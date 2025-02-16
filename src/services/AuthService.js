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
      const data = new FormData();

      // Profile Picture (mandatory) - Add this first and check it exists
      if (!formData.profilePicture) {
        throw new Error('Profile picture is required');
      }
      data.append('profilePicture', formData.profilePicture);

      // Basic information
      data.append('university', formData.university);
      data.append('course', formData.course);
      data.append('aLevels', JSON.stringify(formData.aLevels));
      data.append('aLevelsCompletionDate', formData.aLevelsCompletionDate);
      data.append('universityStartDate', formData.universityStartDate);
      data.append('expectedGraduationDate', formData.expectedGraduationDate);
      data.append('dateOfBirth', formData.dateOfBirth);
      data.append('subjects', JSON.stringify(formData.subjects));

      // University Documents
      if (formData.universityDocuments && formData.universityDocuments.length > 0) {
        formData.universityDocuments.forEach((doc) => {
          data.append('universityDocuments', doc);
        });
      }

      // Education Documents
      if (formData.universityDocument) {
        data.append('universityDocument', formData.universityDocument);
      }

      if (formData.aLevelsCertificate) {
        data.append('aLevelsCertificate', formData.aLevelsCertificate);
      }

      // GCSE Certificates for relevant subjects
      if (formData.gcseDocuments && formData.gcseDocuments.length > 0) {
        formData.gcseDocuments.forEach((doc) => {
          data.append('gcseDocuments', doc);
        });
      }

      // Right to Work
      data.append('rightToWork', formData.rightToWork.hasRight);
      data.append('eligibility', formData.rightToWork.nationality);
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

      // DBS Check
      data.append('hasDBS', formData.dbsCheck.hasDBS);
      data.append('appliedForDBS', formData.dbsCheck.startApplication);
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

      const response = await api.post('/tutor/update-info', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error) {
      // Improve error handling
      if (error.message === 'Profile picture is required') {
        throw { message: 'Profile picture is required' };
      }
      throw error.response?.data || error;
    }
  },

  // Add this new method
  checkProfiles: async () => {
    try {
      const response = await api.get('/auth/checkProfiles');
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

export default AuthService;