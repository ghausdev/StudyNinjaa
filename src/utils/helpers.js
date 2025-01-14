// helpers.js - Utility helper functions
export const helpers = {
  // Capitalize first letter of each word
  capitalizeWords: (str) => {
      if (!str) return ''; // Handle null or undefined
      return str.replace(/\w\S*/g, (txt) => {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
  },

  // Truncate text with ellipsis
  truncateText: (text, maxLength) => {
      if (text.length <= maxLength) return text;
      return text.substr(0, maxLength) + '...';
  },

  // Generate initials from name
  getInitials: (name) => {
      return name
          .split(' ')
          .map(word => word[0])
          .join('')
          .toUpperCase();
  },

  // Validate email format
  isValidEmail: (email) => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
  },

  // Check file type
  isAllowedFileType: (filename, allowedTypes) => {
      const extension = filename.toLowerCase().split('.').pop();
      return allowedTypes.includes('.' + extension);
  },

  // Generate random ID
  generateId: (prefix = '') => {
      return `${prefix}${Math.random().toString(36).substr(2, 9)}`;
  },

  // Deep clone object
  deepClone: (obj) => {
      return JSON.parse(JSON.stringify(obj));
  },

  // Debounce function
  debounce: (func, wait) => {
      let timeout;
      return function executedFunction(...args) {
          const later = () => {
              clearTimeout(timeout);
              func(...args);
          };
          clearTimeout(timeout);
          timeout = setTimeout(later, wait);
      };
  },

  // Sort array of objects by key
  sortByKey: (array, key, ascending = true) => {
      return [...array].sort((a, b) => {
          if (ascending) {
              return a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0;
          }
          return a[key] > b[key] ? -1 : a[key] < b[key] ? 1 : 0;
      });
  },

  // Group array of objects by key
  groupByKey: (array, key) => {
      return array.reduce((acc, item) => {
          (acc[item[key]] = acc[item[key]] || []).push(item);
          return acc;
      }, {});
  },

  // Calculate time difference in minutes
  getTimeDifference: (start, end) => {
      return Math.round((new Date(end) - new Date(start)) / (1000 * 60));
  },

  // Check if date is today
  isToday: (date) => {
      const today = new Date();
      const checkDate = new Date(date);
      return (
          checkDate.getDate() === today.getDate() &&
          checkDate.getMonth() === today.getMonth() &&
          checkDate.getFullYear() === today.getFullYear()
      );
  },

  formatFileSize: (bytes) => {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  },

  // Enhanced file type validation
  isAllowedFileType: (filename, allowedTypes) => {
      if (!filename) return false;
      const extension = filename.toLowerCase().split('.').pop();
      // Handle cases where allowedTypes might have dots or not
      const normalizedAllowedTypes = allowedTypes.map(type =>
          type.startsWith('.') ? type.substring(1) : type
      );
      return normalizedAllowedTypes.includes(extension);
  },

  // Validate file
  validateFile: (file, config) => {
      const errors = [];

      // Check if file exists
      if (!file) {
          errors.push('No file selected');
          return errors;
      }

      // Check file size
      if (file.size > config.UPLOAD.MAX_FILE_SIZE) {
          errors.push(`File size must be less than ${helpers.formatFileSize(config.UPLOAD.MAX_FILE_SIZE)}`);
      }

      // Check file type
      if (!helpers.isAllowedFileType(file.name, config.UPLOAD.ALLOWED_FILE_TYPES)) {
          errors.push(`Allowed file types: ${config.UPLOAD.ALLOWED_FILE_TYPES.join(', ')}`);
      }

      return errors;
  },

  // Get file extension
  getFileExtension: (filename) => {
      return filename.toLowerCase().split('.').pop();
  },

  // Generate unique filename
  generateUniqueFilename: (originalFilename) => {
      const extension = helpers.getFileExtension(originalFilename);
      const timestamp = new Date().getTime();
      const random = Math.random().toString(36).substring(2, 8);
      return `${timestamp}-${random}.${extension}`;
  }
};