// routes.js - Define all route paths
export const ROUTES = {
    // Public Routes
    HOME: '/',
    ABOUT: '/about',
    CONTACT: '/contact',
    PRICING: '/pricing',
    FAQ: '/faq',
    TERMS: '/terms',
    PRIVACY: '/privacy',
  
    // Auth Routes
    LOGIN: '/login',
    REGISTER: '/register',
    FORGOT_PASSWORD: '/forgot-password',
  
    // Student Routes
    STUDENT: {
      DASHBOARD: '/student/dashboard',
      ESSAY_UPLOAD: '/student/essay-upload',
      ESSAYS: '/student/essays',
      INTERVIEWS: '/student/interviews',
      PROFILE: '/student/profile',
      TUTOR_LIST: '/student/tutor-list'
    },
  
    // Tutor Routes
    TUTOR: {
      DASHBOARD: '/tutor/dashboard',
      ESSAY_FEEDBACK: '/tutor/essay-feedback',
      INTERVIEWS: '/tutor/interviews',
      PROFILE: '/tutor/profile',
      ESSAY_POOL: '/tutor/essay-pool',
      CHAT: '/tutor/chat/:essayId'
    },
  
    // Admin Routes
    ADMIN: {
      DASHBOARD: '/admin/dashboard',
      USERS: '/admin/users',
      TRANSACTIONS: '/admin/transactions',
      CONTENT: '/admin/content'
    }
  };