// mockTransactions.js
export const mockTransactions = [
    {
      id: 'trans_1',
      userId: 'student_1',
      type: 'subscription',
      plan: 'premium',
      amount: 299.99,
      status: 'completed',
      createdAt: '2024-01-15T08:00:00Z',
      paymentMethod: {
        type: 'credit_card',
        last4: '4242'
      }
    },
    {
      id: 'trans_2',
      userId: 'student_2',
      type: 'essay_review',
      essayId: 'essay_2',
      amount: 49.99,
      status: 'completed',
      createdAt: '2024-03-18T09:15:00Z',
      paymentMethod: {
        type: 'paypal',
        email: 'student2@email.com'
      }
    },
    {
      id: 'trans_3',
      userId: 'tutor_1',
      type: 'payout',
      amount: 450.00,
      status: 'processing',
      createdAt: '2024-03-01T00:00:00Z',
      periodStart: '2024-02-01T00:00:00Z',
      periodEnd: '2024-02-29T23:59:59Z',
      details: {
        essaysReviewed: 10,
        interviewsConducted: 5
      }
    },
    // Add more transactions...
  ];
  
  // Export additional mock data helpers
  export const generateMockData = {
    getEssayById: (id) => mockEssays.find(essay => essay.id === id),
    getInterviewById: (id) => mockInterviews.find(interview => interview.id === id),
    getUserById: (id) => {
      const allUsers = [
        ...mockUsers.students,
        ...mockUsers.tutors,
        ...mockUsers.admins
      ];
      return allUsers.find(user => user.id === id);
    },
    getTransactionsByUserId: (userId) => 
      mockTransactions.filter(trans => trans.userId === userId),
    
    getStudentEssays: (studentId) => 
      mockEssays.filter(essay => essay.studentId === studentId),
      
    getTutorInterviews: (tutorId) => 
      mockInterviews.filter(interview => interview.tutorId === tutorId)
  };