// studentService.js
import api from './server'; // Assuming you have axios instance set up

const StudentService = {

    /**
     * @description Updates the student's profile or creates one if it doesn't exist.
     * @param {object} data - Student profile data
     * @param {string} data.major - The student's major.
     * @param {string} data.university - The student's university.
     * @param {string} data.bio - The student's bio.
        * @param {date} data.dateOfBirth - The student's Date of birth.
     * @param {File} data.profilePicture - The student's profile picture file.
     * @returns {Promise<object>} - Returns a promise containing the message and updated or new student object.
     * @throws {Error} - If there is an error during the update.
     */
    updateProfile: async (data) => {
        const formData = new FormData();
        
        // Handle file separately
        if (data.profilePicture) {
            formData.append('files', data.profilePicture); // Changed to 'files' to match backend
        }
        
        // Append other fields
        if (data.major) formData.append('major', data.major);
        if (data.university) formData.append('university', data.university);
        if (data.bio) formData.append('bio', data.bio);
        if (data.dateOfBirth) formData.append('dateOfBirth', data.dateOfBirth);

        try {
            const response = await api.post('/student/updateProfile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

   
    uploadEssay: async (formData) => {
        try {
            const response = await api.post('/student/uploadEssay', formData, {
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
      * @description Retrieves the student's profile.
      * @returns {Promise<object>} - Returns a promise containing the message and student profile object.
      * @throws {Error} - If there is an error during the retrieval.
      */
    getProfile: async () => {
        try {
            const response = await api.get('/student/profile');
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
    /**
     * @description Fetches all the essays of the student
     * @returns {Promise<object>} - Returns a promise containing the message and an array of essays.
     * @throws {Error} - If there is an error during the fetch.
     */
    getAllEssays: async () => {
        try {
            const response = await api.get('/student/essays');
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    /**
     * @description Fetches pending essays of the student
     * @returns {Promise<object>} - Returns a promise containing the message and an array of pending essays
     * @throws {Error} - If there is an error during the fetch.
     */
    getPendingEssays: async () => {
        try {
            const response = await api.get('/student/essays/pending');
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    /**
     * @description Fetches in progress essays of the student
     * @returns {Promise<object>} - Returns a promise containing the message and an array of in progress essays.
     * @throws {Error} - If there is an error during the fetch.
     */
    getInProgressEssays: async () => {
        try {
            const response = await api.get('/student/essays/in-progress');
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

      /**
     * @description Fetches completed essays of the student
     * @returns {Promise<object>} - Returns a promise containing the message and an array of completed essays.
     * @throws {Error} - If there is an error during the fetch.
     */
    getCompletedEssays: async () => {
        try {
            const response = await api.get('/student/essays/completed');
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

   /**
   * @description Books a tutoring session
   * @param {object} data - Session booking data
   * @param {string} data.tutorId - ID of the tutor
   * @param {string} data.purpose - Purpose of the session
   * @param {string} data.startTime - Start time of the session in ISO format
   * @param {string} data.endTime - End time of the session in ISO format
   * @returns {Promise<object>} - Returns a promise containing the new tutoring session
   * @throws {Error} - If there is an error during booking
   */
    bookTutoringSession: async (data) => {
        try {
            const response = await api.post('/student/createTutoringSession', {
                tutorId: data.tutorId,
                purpose: data.purpose,
                startTime: data.startTime, // Already in ISO format with Z
                endTime: data.endTime     // Already in ISO format with Z
            });
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    /**
     * @description Gets the student dashboard data
     * @returns {Promise<object>} - Returns a promise containing the dashboard data
        * @example {essaysSubmitted: 0, interviewsCompleted: 0, averagePercentage: '0 %'}
     * @throws {Error} - If there is an error during the fetch.
     */
    getStudentDashboard: async () => {
        try {
            const response = await api.get('/student/getDashboard');
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

       /**
     * @description Gets the pending ratings
     * @returns {Promise<object>} - Returns a promise containing the pending essay and tutoring session to be rated.
     * @throws {Error} - If there is an error during the fetch.
     */
    getPendingRating: async () => {
        try {
            const response = await api.get('/student/getPendingRating');
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

      /**
       * @description Gives rating for an essay or tutoring session
       * @param {object} data - rating data
        * @param {string} data.type - Type of rating, either essay or tutoring
        * @param {number} data.ratings - The rating given from 1 to 5.
        * @param {string} data.feedback - Feedback for the essay or tutoring session
        * @param {string} data.essayId - ID of the essay when type is essay
        * @param {string} data.tutoringId - ID of the tutoring session when the type is tutoring
       * @returns {Promise<object>} - Returns a promise containing the message and the new rating object
       * @throws {Error} - If there is an error during the update
       */
    giveRating: async (data) => {
        try {
            const response = await api.post('/student/giveRating', data);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    /**
     * @description Fetches a specific essay by its ID
     * @param {string} essayId - The ID of the essay to fetch
     * @returns {Promise<object>} - Returns a promise containing the essay object
     * @throws {Error} - If there is an error during the fetch or if unauthorized
     */
    getEssayById: async (essayId) => {
        try {
            const response = await api.get(`/student/essay/${essayId}`);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    /**
     * @description Fetches all available tutors
     * @returns {Promise<object>} - Returns a promise containing the tutors array
     * @throws {Error} - If there is an error during the fetch
     */
    getAllTutors: async () => {
        try {
            const response = await api.get('/tutor/getTutorProfilesforTutoring');
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    /**
     * @description Fetches all tutoring sessions for the student
     * @returns {Promise<object>} - Returns a promise containing all tutoring sessions
     * @throws {Error} - If there is an error during the fetch
     */
    getTutoringSessions: async () => {
        try {
            const response = await api.get('/student/getTutoringSessions');
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    /**
     * @description Fetches upcoming tutoring sessions for the student
     * @returns {Promise<object>} - Returns a promise containing upcoming tutoring sessions
     * @throws {Error} - If there is an error during the fetch
     */
    getUpcomingTutoringSessions: async () => {
        try {
            const response = await api.get('/student/getUpcomingTutoringSessions');
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    /**
     * @description Fetches completed tutoring sessions for the student
     * @returns {Promise<object>} - Returns a promise containing completed tutoring sessions
     * @throws {Error} - If there is an error during the fetch
     */
    getCompletedTutoringSessions: async () => {
        try {
            const response = await api.get('/student/getCompletedTutoringSessions');
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
};

export default StudentService;