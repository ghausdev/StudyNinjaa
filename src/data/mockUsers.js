  // mockUsers.js
  export const mockUsers = {
    students: [
      {
        id: 'student_1',
        firstName: 'Emma',
        lastName: 'Wilson',
        email: 'emma.wilson@email.com',
        targetUniversity: 'Oxford',
        targetCourse: 'Medicine',
        joinedAt: '2024-01-15T08:00:00Z',
        subscription: {
          plan: 'premium',
          validUntil: '2024-12-31T23:59:59Z'
        },
        stats: {
          essaysSubmitted: 3,
          interviewsCompleted: 2
        }
      },
      // Add more students...
    ],
    tutors: [
      {
        id: 'tutor_1',
        firstName: 'David',
        lastName: 'Brown',
        email: 'david.brown@email.com',
        specializations: ['Medicine', 'Biology'],
        university: 'Oxford',
        qualification: 'MD, PhD',
        rating: 4.9,
        availability: [
          {
            day: 'Monday',
            slots: ['09:00-12:00', '14:00-17:00']
          },
          {
            day: 'Wednesday',
            slots: ['10:00-15:00']
          }
        ],
        stats: {
          essaysReviewed: 45,
          interviewsConducted: 30
        }
      },
      // Add more tutors...
    ],
    admins: [
      {
        id: 'admin_1',
        firstName: 'Sarah',
        lastName: 'Johnson',
        email: 'sarah.admin@studyninjaa.com',
        role: 'super_admin',
        permissions: ['manage_users', 'manage_content', 'manage_payments']
      },
      // Add more admins...
    ]
  };
  