// tutorService.js
import api from './server'; // Assuming you have axios instance set up


const TutorService = {
  /**
   * @description Updates or creates a tutor profile.
   * @param {object} data - Tutor data.
   * @param {number} data.yearsOfExperience - Years of experience.
   * @param {string} data.university - University name.
   * @param {string} data.motivation - Motivation statement.
    * @param {string} data.StudyLevel - study Level
   * @param {array} data.subjects - Array of subjects with name and levels.
   *   @example  [{name: 'Math', levels: ['GCSE', 'A-Level']}]
   * @param {boolean} data.hasDBS - Whether the tutor has DBS check.
   * @param {string} data.fullNameDBS - Full name as on DBS certificate.
   * @param {string} data.certificateNumber - DBS certificate number.
   * @param {File} data.profilePicture - Profile picture file (optional).
   * @param {File} data.certificateFile - DBS certificate file (optional).
   * @param {array<File>} data.universityDocuments - Array of university documents (optional).
   * @returns {Promise<object>} - Returns a promise containing the message and the tutor object.
   * @throws {Error} - If there is an error during the update.
   */
  requestForTutor: async (data) => {
      const formData = new FormData();
      for (const key in data) {
          if (key === 'subjects') {
              formData.append(key, JSON.stringify(data[key]));
          } else if (data[key] instanceof File) {
            formData.append(key, data[key]);
          }else if (Array.isArray(data[key])) {
            data[key].forEach((file, index) => {
              formData.append(`${key}`, file); // keep the key name, but append each file to it
             });
         } else if (data[key] != null) {
            formData.append(key, data[key]);
          }
      }
    try {
      const response = await api.post('/tutor/update-info', formData, {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
      });
        return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

    /**
     * @description Fetches essays that are available for marking
     * @returns {Promise<object>} - Returns a promise containing the message and an array of essays.
     * @throws {Error} - If there is an error during the fetch.
     */
    getAvailableEssays: async () => {
        try {
            const response = await api.get('/tutor/getAvailableEssays');
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
    /**
     * @description Gets the tutor profile of the logged in tutor.
     * @returns {Promise<object>} - Returns a promise containing the message and tutor object
     *  
}
     * @throws {Error} - If there is an error during the fetch.
     */
    getTutorProfile: async () => {
        try {
            const response = await api.get('/tutor/getProfile');
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
    /**
     * @description Updates the tutor's profile
     * @param {object} data - Profile data
     * @param {string} data.university - University name
     * @param {string} data.qualification - Qualification
     * @param {string} data.bio - Bio text
     * @param {File} data.profilePicture - Profile picture file
     * @param {array} data.specializations - Array of specializations
     * @param {array} data.availability - Array of availability slots
     * @returns {Promise<object>} - Returns updated tutor profile
     * @throws {Error} - If there is an error during update
     */
    updateProfile: async (data) => {
        const formData = new FormData();
        for (const key in data) {
            if (data[key] instanceof File) {
                formData.append(key, data[key]);
            } else if (Array.isArray(data[key])) {
                formData.append(key, JSON.stringify(data[key]));
            } else if (data[key] != null) {
                formData.append(key, data[key]);
            }
        }
        try {
            const response = await api.post('/tutor/updateProfile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
    /**
     * @description Marks an essay
     * @param {object} data - Essay marking data
     * @param {string} data.essayID - ID of the essay
     * @param {number} data.score - Score given to the essay
     * @param {string} data.feedback - Feedback text
     * @param {File} [data.modelAnswerFile] - Model answer file (optional)
     * @returns {Promise<object>} - Returns a promise containing the message and updated essay
     * @throws {Error} - If there is an error during marking
     */
    markEssay: async (data) => {
        const formData = new FormData();
        formData.append('essayID', data.essayID);
        formData.append('score', data.score);
        formData.append('feedback', data.feedback);
        if (data.modelAnswerFile) {
            formData.append('modelAnswerFile', data.modelAnswerFile);
        }
        
        try {
            const response = await api.post('/tutor/markEssay', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },


  /**
   * @description Gets an essay for marking
   * @param {string} essayID - ID of the essay.
   * @returns {Promise<object>} - Returns a promise containing the message and essay object.
   * @throws {Error} - If there is an error during the fetch.
   */
    getEssay: async (essayID) => {
        try {
            const response = await api.post('/tutor/getEssay', { essayID });
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

     /**
     * @description Fetches all essays of the tutor
     * @returns {Promise<object>} - Returns a promise containing the message and the array of essays
     * @throws {Error} - If there is an error during the fetch.
     */
    getAllEssays: async () => {
        try {
            const response = await api.get('/tutor/getAllEssays');
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    /**
     * @description Fetches completed essays of the tutor
     * @returns {Promise<object>} - Returns a promise containing the message and the array of essays
     * @throws {Error} - If there is an error during the fetch.
     */
    getCompletedEssays: async () => {
        try {
            const response = await api.get('/tutor/getCompletedEssays');
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

   /**
   * @description Fetches tutor profiles for tutoring
    * @returns {Promise<object>} - Returns a promise containing the message and array of tutor profile objects
   * @throws {Error} - If there is an error during the fetch.
   */
  getTutorProfilesforTutoring: async () => {
      try {
          const response = await api.get('/tutor/getTutorProfilesforTutoring');
          return response.data;
      } catch (error) {
          throw error.response.data;
      }
  },

  /**
   * @description Updates a tutor's tutoring profile or create it if it doesnt exits
   * @param {object} data - Tutoring profile data.
   * @param {string} data.subject - Subject for tutoring.
   * @param {number} data.hourlyRate - Hourly rate for tutoring.
   * @param {object} data.availability - Availability schedule.
   *   @example  {monday: ['10:00-12:00'], tuesday: [], ...}
   * @param {string} data.description - Tutoring description.
   * @param {number} data.duration - Duration of tutoring sessions (in minutes).
   * @returns {Promise<object>} - Returns a promise containing the message and the tutoring profile object
   * @throws {Error} - If there is an error during the update.
   */
  updateTutoringProfile: async (data) => {
      try {
          const response = await api.post('/tutor/updateTutoringProfile', data);
          return response.data;
      } catch (error) {
          throw error.response.data;
      }
  },
  /**
   * @description Gets the tutoring profile of the logged in tutor.
   * @returns {Promise<object>} - Returns a promise containing the message, tutor profile and tutoring profile.
   * @throws {Error} - If there is an error during the fetch.
   */
  getTutoringProfile: async () => {
    try {
      const response = await api.get('/tutor/getTutoringProfile');
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
   /**
   * @description Gets the tutor dashboard data.
   * @returns {Promise<object>} - Returns a promise containing the data for the dashboard.
   *   @example {essaysReviewed: 0, interviewsConducted: 0, rating: 0, earnings: '$0.00'}
   * @throws {Error} - If there is an error during the fetch.
   */
  getDashboard: async () => {
    try {
      const response = await api.get('/tutor/getDashboard');
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  /**
    * @description Fetches pending tutoring sessions for the tutor
    * @returns {Promise<object>} - Returns a promise containing the message and array of pending tutoring sessions
    * @throws {Error} - If there is an error during the fetch.
    */
    getPendingTutoringSessions: async () => {
        try {
            const response = await api.get('/tutor/getPendingTutoringSessions');
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

  /**
    * @description Fetches completed tutoring sessions for the tutor
    * @returns {Promise<object>} - Returns a promise containing the message and array of completed tutoring sessions
    * @throws {Error} - If there is an error during the fetch.
    */
  getCompletedTutoringSessions: async () => {
      try {
          const response = await api.get('/tutor/getCompletedTutoringSessions');
          return response.data;
      } catch (error) {
          throw error.response.data;
      }
  },

  /**
   * @description Fetches in progress tutoring sessions for the tutor
   * @returns {Promise<object>} - Returns a promise containing the message and array of ongoing tutoring sessions.
   * @throws {Error} - If there is an error during the fetch.
   */
    getInProgressTutoringSessions: async () => {
        try {
            const response = await api.get('/tutor/getInProgressTutoringSessions');
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

  updateTutorProfile: async (data) => {
    const formData = new FormData();
    for (const key in data) {
        if (key === 'subjects') {
            formData.append(key, JSON.stringify(data[key]));
        } else if (data[key] instanceof File) {
            formData.append(key, data[key]);
        } else if (data[key] != null) {
            formData.append(key, data[key]);
        }
    }
    try {
        const response = await api.patch('/tutor/updateTutorProfile', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
},

/**
 * @description Fetches all chat contacts for the tutor
 * @returns {Promise<object>} - Returns a promise containing the students array
 * @throws {Error} - If there is an error during the fetch
 */
getAllChatContacts: async () => {
    try {
        const response = await api.get('/tutor/getAllContactsForTutor');
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
},

/**
 * @description Fetches messages between tutor and student
 * @param {string} studentId - ID of the student
 * @returns {Promise<object>} - Returns a promise containing the messages array
 * @throws {Error} - If there is an error during the fetch
 */
getMessages: async (studentId) => {
    try {
        const response = await api.get(`/tutor/getMessagesForTutor/${studentId}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
},

/**
 * @description Accepts an essay for marking
 * @param {string} essayID - ID of the essay.
 * @returns {Promise<object>} - Returns a promise containing the message and essay object.
 * @throws {Error} - If there is an error during the acceptance.
 */
acceptEssay: async (essayID) => {
    try {
        const response = await api.post('/tutor/getEssay', { essayID });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
},
};

export default TutorService;