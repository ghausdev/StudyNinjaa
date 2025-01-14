// Dashboard.js
import React from 'react';
import StatCard from '../../components/dashboard/StatCard';
import QuickActions from '../../components/dashboard/QuickActions';
import NotificationPanel from '../../components/dashboard/NotificationPanel';
import { formatters } from '../../utils/formatters';

// Mock Data Imports
import { mockUsers } from '../../data/mockUsers';
import { mockEssays} from '../../data/mockEssays';
import { mockInterviews } from '../../data/mockInterviews';

const Dashboard = () => {
  // Mock student data
  const student = mockUsers.students[0];
  
  // Get active essays and interviews
  const activeEssays = mockEssays.filter(essay => essay.studentId === student.id);
  const upcomingInterviews = mockInterviews.filter(
    interview => interview.studentId === student.id && interview.status === 'scheduled'
  );

  // Calculate stats
  const stats = [
    {
      title: 'Essays Submitted',
      value: student.stats.essaysSubmitted.toString(),
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      change: '+2',
      changeType: 'increase',
      changeTimespan: 'vs. last month'
    },
    {
      title: 'Interviews Completed',
      value: student.stats.interviewsCompleted.toString(),
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
      change: '+1',
      changeType: 'increase',
      changeTimespan: 'vs. last month'
    },
    {
      title: 'Average Percentage',
      value: '98.5 %',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      change: '+0.3',
      changeType: 'increase',
      changeTimespan: 'vs. last month'
    },
  
  ];

  // Recent activities for notifications
  const notifications = [
    {
      id: 1,
      type: 'essay',
      message: 'Your essay "Why Oxford University?" has been reviewed',
      timestamp: new Date('2024-03-17T14:20:00Z'),
      read: false,
      action: {
        label: 'View Feedback',
        onClick: (id) => console.log('View feedback for notification:', id)
      }
    },
    {
      id: 2,
      type: 'interview',
      message: 'Upcoming interview scheduled for tomorrow',
      timestamp: new Date('2024-03-24T14:00:00Z'),
      read: false,
      action: {
        label: 'View Details',
        onClick: (id) => console.log('View interview details:', id)
      }
    },
    // Add more notifications as needed
  ];

  const handleMarkAsRead = (notificationId) => {
    console.log('Mark as read:', notificationId);
  };

  const handleMarkAllAsRead = () => {
    console.log('Mark all as read');
  };

  return (
    <div className="space-y-6">
      {/* Welcome Message */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {student.firstName}!
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Here's what's happening with your applications
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
      <QuickActions userRole="student" />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notifications Panel */}
        <NotificationPanel
          notifications={notifications}
          onMarkAsRead={handleMarkAsRead}
          onMarkAllAsRead={handleMarkAllAsRead}
        />

        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Recent Activities</h2>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              {activeEssays.slice(0, 3).map((essay) => (
                <div
                  key={essay.id}
                  className="flex items-center justify-between py-3 border-b border-gray-200 last:border-0"
                >
                  <div>
                    <p className="font-medium text-gray-900">{essay.title}</p>
                    <p className="text-sm text-gray-500">
                      {formatters.formatEssayStatus(essay.status)}
                    </p>
                  </div>
                  <span className="text-sm text-gray-500">
                    {formatters.formatDateTime(essay.submittedAt)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Interviews */}
      {upcomingInterviews.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Upcoming Interviews</h2>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              {upcomingInterviews.map((interview) => (
                <div
                  key={interview.id}
                  className="flex items-center justify-between py-3 border-b border-gray-200 last:border-0"
                >
                  <div>
                    <p className="font-medium text-gray-900">{interview.subject} Interview</p>
                    <p className="text-sm text-gray-500">{interview.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {formatters.formatDateTime(interview.datetime)}
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatters.formatDuration(interview.duration)} duration
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;