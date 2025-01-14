// Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import StatCard from '../../components/dashboard/StatCard';
import QuickActions from '../../components/dashboard/QuickActions';
import NotificationPanel from '../../components/dashboard/NotificationPanel';
import EssayCard from '../../components/essays/EssayCard';
import InterviewCard from '../../components/interviews/InterviewCard';
import { formatters } from '../../utils/formatters';

// Import mock data
// Mock Data Imports
import { mockUsers } from '../../data/mockUsers';
import { mockEssays} from '../../data/mockEssays';
import { mockInterviews } from '../../data/mockInterviews';

const Dashboard = () => {
  // Mock tutor data
  const tutor = mockUsers.tutors[0];

  // Get pending essays and upcoming interviews
  const pendingEssays = mockEssays.filter(
    essay => essay.tutorId === tutor.id && essay.status === 'pending'
  );

  const upcomingInterviews = mockInterviews.filter(
    interview => 
      interview.tutorId === tutor.id && 
      interview.status === 'scheduled' &&
      new Date(interview.datetime) > new Date()
  );

  // Calculate stats
  const stats = [
    {
      title: 'Essays Reviewed',
      value: tutor.stats.essaysReviewed.toString(),
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      change: '+5',
      changeType: 'increase',
      changeTimespan: 'vs. last month'
    },
    {
      title: 'Interviews Conducted',
      value: tutor.stats.interviewsConducted.toString(),
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
      change: '+2',
      changeType: 'increase',
      changeTimespan: 'vs. last month'
    },
    {
      title: 'Rating',
      value: tutor.rating.toString(),
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ),
      change: '+0.2',
      changeType: 'increase',
      changeTimespan: 'vs. last month'
    },
    {
      title: 'Earnings',
      value: formatters.formatCurrency(450),
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      change: '+$50',
      changeType: 'increase',
      changeTimespan: 'this month'
    }
  ];

  // Recent notifications
  const notifications = [
    {
      id: 1,
      type: 'essay',
      message: 'New essay assigned for review: "Why Oxford University?"',
      timestamp: new Date('2024-03-17T14:20:00Z'),
      read: false
    },
    {
      id: 2,
      type: 'interview',
      message: 'Interview scheduled for tomorrow at 2 PM',
      timestamp: new Date('2024-03-24T14:00:00Z'),
      read: false
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Message */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {tutor.firstName}!
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              You have {pendingEssays.length} essays pending review and {upcomingInterviews.length} upcoming interviews
            </p>
          </div>
          <div className="text-sm text-gray-500">
            {formatters.formatDate(new Date())}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Quick Actions */}
      <QuickActions userRole="tutor" />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Reviews */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">Pending Reviews</h2>
              <Link 
                to="/tutor/essay-feedback"
                className="text-sm font-medium text-red-600 hover:text-red-500"
              >
                View all
              </Link>
            </div>
          </div>
          <div className="p-4">
            {pendingEssays.length > 0 ? (
              <div className="space-y-4">
                {pendingEssays.slice(0, 3).map((essay) => (
                  <EssayCard
                    key={essay.id}
                    essay={essay}
                    showActions={false}
                  />
                ))}
              </div>
            ) : (
              <p className="text-center text-sm text-gray-500 py-4">
                No pending essays to review
              </p>
            )}
          </div>
        </div>

        {/* Notifications */}
        <NotificationPanel
          notifications={notifications}
          onMarkAsRead={(id) => console.log('Mark as read:', id)}
          onMarkAllAsRead={() => console.log('Mark all as read')}
          onNotificationClick={(notification) => console.log('Clicked:', notification)}
        />
      </div>

      {/* Upcoming Interviews */}
      {upcomingInterviews.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">Upcoming Interviews</h2>
              <Link 
                to="/tutor/interviews"
                className="text-sm font-medium text-red-600 hover:text-red-500"
              >
                View all
              </Link>
            </div>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              {upcomingInterviews.map((interview) => (
                <InterviewCard
                  key={interview.id}
                  interview={interview}
                  onJoin={(id) => console.log('Join interview:', id)}
                  showActions={true}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Availability Schedule */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Your Schedule</h2>
        </div>
        <div className="p-4">
          <div className="space-y-4">
            {tutor.availability.map((slot, index) => (
              <div 
                key={index}
                className="flex items-center justify-between py-3 border-b border-gray-200 last:border-0"
              >
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-900">{slot.day}</span>
                </div>
                <div className="text-sm text-gray-500">
                  {slot.slots.join(', ')}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;