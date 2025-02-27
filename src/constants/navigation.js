// navigation.js - Navigation structure for different user types

import { ROUTES } from './routes';
export const NAVIGATION = {
   // Public Navigation
   PUBLIC: [
     { name: 'Home', path: ROUTES.HOME },
     { name: 'Contact', path: ROUTES.CONTACT },

     { name: 'Terms', path: ROUTES.TERMS },
     { name: 'FAQ', path: ROUTES.FAQ }
   ],

   // Student Navigation
   STUDENT: {
     PRIMARY: [
       {
         name: 'Dashboard',
         path: ROUTES.STUDENT.DASHBOARD,
         icon: 'dashboard' // These will be used with your icon library
       },
       {
         name: 'Essays',
         path: ROUTES.STUDENT.ESSAYS,
         icon: 'document'
       },
       {
         name: 'Upload Essay',
         path: ROUTES.STUDENT.ESSAY_UPLOAD,
         icon: 'upload'
       },
       {
         name: 'Tutoring Sessions',
         path: ROUTES.STUDENT.INTERVIEWS,
         icon: 'calendar'
       },
       {
        name: 'Tutor List',
        path: ROUTES.STUDENT.TUTOR_LIST,
        icon: 'user'
      },
      {
        name: 'Chats',
        path: ROUTES.STUDENT.CHATS,
        icon: 'user'
      }
     ],
     SECONDARY: [
       {
         name: 'Profile',
         path: ROUTES.STUDENT.PROFILE,
         icon: 'user'
       },
       
     ]
   },

   // Tutor Navigation
   TUTOR: {
     PRIMARY: [
       {
         name: 'Dashboard',
         path: ROUTES.TUTOR.DASHBOARD,
         icon: 'dashboard'
       },
       {
         name: 'Essay Pool',
         path: ROUTES.TUTOR.ESSAY_POOL,
         icon: 'edit'
       },
      {
        name: 'Essay Feedback',
        path: ROUTES.TUTOR.ESSAY_FEEDBACK,
        icon: 'edit'
      },
      {
        name: 'Tutoring Profile',
        path: ROUTES.TUTOR.TUTORING_PROFILE,
        icon: 'calendar'
      },
      {
        name: 'Tutoring',
        path: ROUTES.TUTOR.INTERVIEWS,
        icon: 'calendar'
      },
      {
        name: 'Chats',
        path: ROUTES.TUTOR.CHATS,
        icon: 'user'
      }
    ],
    SECONDARY: [
      {
        name: 'Profile',
        path: ROUTES.TUTOR.PROFILE,
        icon: 'user'
      }
    ]
  },

  // Admin Navigation
  ADMIN: {
    PRIMARY: [
      {
        name: 'Dashboard',
        path: ROUTES.ADMIN.DASHBOARD,
        icon: 'dashboard'
      },
      {
        name: 'Tutor Management',
        path: ROUTES.ADMIN.USERS,
        icon: 'user'
      },
      // {
      //   name: 'Transactions',
      //   path: ROUTES.ADMIN.TRANSACTIONS,
      //   icon: 'edit'
      // },
  
    ]
  }
};