// formatters.js - Functions for formatting data
export const formatters = {
    // Date formatters
    formatDate: (date) => {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    },
  
    formatDateTime: (date) => {
      return new Date(date).toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    },
  
    formatTime: (date) => {
      return new Date(date).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      });
    },
  
    // Currency formatter
    formatCurrency: (amount) => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'GBP'
      }).format(amount);
    },
  
    // File size formatter
    formatFileSize: (bytes) => {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    },
  
    // Duration formatter (for interviews)
    formatDuration: (minutes) => {
      if (minutes < 60) return `${minutes} min`;
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return remainingMinutes 
        ? `${hours}h ${remainingMinutes}m` 
        : `${hours}h`;
    },
  
    // Essay status formatter
    formatEssayStatus: (status) => {
      const statusMap = {
        'pending': 'Pending Review',
        'in_review': 'Under Review',
        'reviewed': 'Review Complete',
        'revision_requested': 'Revision Requested'
      };
      return statusMap[status] || status;
    },
  
    // Name formatter
    formatName: (firstName, lastName) => {
      return `${firstName} ${lastName}`.trim();
    },
  
    // Phone number formatter
    formatPhone: (phone) => {
      const cleaned = ('' + phone).replace(/\D/g, '');
      const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
      if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3];
      }
      return phone;
    }
  };
  
  