  // mockInterviews.js
  export const mockInterviews = [
    {
      id: 'interview_1',
      studentId: 'student_1',
      tutorId: 'tutor_1',
      subject: 'Medicine',
      type: 'MMI',
      status: 'scheduled',
      datetime: '2024-03-25T14:00:00Z',
      duration: 45, // minutes
      questions: [
        'Ethical scenario discussion',
        'Research experience',
        'Motivation for medicine'
      ],
      notes: 'Student requested focus on ethical scenarios',
      zoomLink: 'https://zoom.us/j/mocklink1'
    },
    {
      id: 'interview_2',
      studentId: 'student_2',
      tutorId: 'tutor_2',
      subject: 'Computer Science',
      type: 'Technical',
      status: 'completed',
      datetime: '2024-03-20T10:00:00Z',
      duration: 60,
      feedback: {
        technicalScore: 8,
        communicationScore: 9,
        notes: 'Excellent problem-solving skills, could improve system design explanations'
      }
    },
    // Add more interviews...
  ];
  