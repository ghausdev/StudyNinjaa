// formatters.js - Functions for formatting data
export const formatters = {
  // Date formatters
  formatDate: (date) => {
    if (!date) return "-";

    try {
      const dateObj = new Date(date);
      if (isNaN(dateObj.getTime())) return "-";

      return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }).format(dateObj);
    } catch (error) {
      return "-";
    }
  },

  formatDateTime: (date) => {
    if (!date) return "-";

    try {
      const dateObj = new Date(date);
      if (isNaN(dateObj.getTime())) return "-";

      return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(dateObj);
    } catch (error) {
      return "-";
    }
  },

  formatTime: (date) => {
    return new Intl.DateTimeFormat("en-US", {
      timeStyle: "short",
    }).format(date);
  },

  // Currency formatter
  formatCurrency: (amount) => {
    if (typeof amount !== "number") return "-";

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  },

  // File size formatter
  formatFileSize: (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  },

  // Duration formatter (for interviews)
  formatDuration: (minutes) => {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
  },

  // Essay status formatter
  formatEssayStatus: (status) => {
    const statusMap = {
      pending: "Pending Review",
      in_review: "Under Review",
      reviewed: "Review Complete",
      revision_requested: "Revision Requested",
    };
    return statusMap[status] || status;
  },

  // Name formatter
  formatName: (firstName, lastName) => {
    return `${firstName} ${lastName}`.trim();
  },

  // Phone number formatter
  formatPhone: (phone) => {
    const cleaned = ("" + phone).replace(/\D/g, "");
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return "(" + match[1] + ") " + match[2] + "-" + match[3];
    }
    return phone;
  },
};
