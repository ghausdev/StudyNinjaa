
  
  // config.js - App-wide configuration settings
  export const CONFIG = {
    // App Details
    APP_NAME: 'StudyNINJAA',
    APP_VERSION: '1.0.0',
    
    // API Configuration (for future use)
    API_TIMEOUT: 30000,
    
    // File Upload Configurations
    UPLOAD: {
      MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
      ALLOWED_FILE_TYPES: ['.pdf', '.doc', '.docx'],
      MAX_FILES: 1
    },
  
    // UI Configuration
    UI: {
      THEME: {
        PRIMARY_COLOR: '#E63946',
        SECONDARY_COLOR: '#FFFFFF',
        ACCENT_COLOR: '#A8DADC',
        BACKGROUND_COLOR: '#F0F0F0',
        TEXT_COLOR: '#000000'
      },
      BREAKPOINTS: {
        SM: '640px',
        MD: '768px',
        LG: '1024px',
        XL: '1280px'
      }
    },
  
    // Interview Settings
    INTERVIEW: {
      MIN_DURATION: 30, // minutes
      MAX_DURATION: 60, // minutes
      BUFFER_TIME: 15 // minutes between interviews
    }
  };
  
 