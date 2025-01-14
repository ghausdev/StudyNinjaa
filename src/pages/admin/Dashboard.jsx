// Dashboard.js 
import React from 'react';
import { Link } from 'react-router-dom';
import StatCard from '../../components/dashboard/StatCard';
import NotificationPanel from '../../components/dashboard/NotificationPanel';
import { formatters } from '../../utils/formatters';
import { helpers } from '../../utils/helpers';
import { mockUsers } from '../../data/mockUsers';
import { mockEssays} from '../../data/mockEssays';
import { mockInterviews } from '../../data/mockInterviews';
import { mockTransactions } from '../../data/mockTransactions';

const Dashboard = () => {
  // Calculate platform statistics
  const stats = [
    {
      title: 'Total Users',
      value: mockUsers.students.length + mockUsers.tutors.length,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      change: '+12',
      changeType: 'increase',
      changeTimespan: 'vs. last month'
    },
    {
      title: 'Monthly Revenue',
      value: formatters.formatCurrency(15750),
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      change: '+8.5%',
      changeType: 'increase',
      changeTimespan: 'vs. last month'
    },
    {
      title: 'Active Essays',
      value: mockEssays.filter(essay => essay.status !== 'reviewed').length.toString(),
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      change: '-2',
      changeType: 'decrease',
      changeTimespan: 'vs. yesterday'
    },
    
  ];

  // Get recent activities
  const recentActivities = [
    ...mockUsers.students.slice(-5).map(student => ({
      type: 'user',
      action: 'signup',
      user: student,
      date: new Date('2024-03-20T10:00:00Z')
    })),
    ...mockEssays.slice(-5).map(essay => ({
      type: 'essay',
      action: 'submitted',
      essay,
      date: new Date(essay.submittedAt)
    }))
  ].sort((a, b) => b.date - a.date);

  // Get recent transactions
  const recentTransactions = mockTransactions
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="mt-1 text-sm text-gray-500">
              Platform overview and management
            </p>
          </div>
          <div className="flex space-x-3">
            <Link
              to="/admin/users"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Manage Users
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">Recent Activities</h2>
              <Link
                to="/admin/users"
                className="text-sm font-medium text-red-600 hover:text-red-500"
              >
                View all
              </Link>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {recentActivities.map((activity, index) => (
              <div key={index} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className={`w-2 h-2 rounded-full ${
                      activity.type === 'user' ? 'bg-green-500' : 'bg-blue-500'
                    }`} />
                    <span className="ml-3 text-sm text-gray-900">
                      {activity.type === 'user' ? (
                        <>
                          New user signup: {activity.user.firstName} {activity.user.lastName}
                        </>
                      ) : (
                        <>
                          New essay submitted: {activity.essay.title}
                        </>
                      )}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {formatters.formatDateTime(activity.date)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">Recent Transactions</h2>
              <Link
                to="/admin/transactions"
                className="text-sm font-medium text-red-600 hover:text-red-500"
              >
                View all
              </Link>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {transaction.type === 'subscription' ? 'Premium Subscription' : 'Essay Review'}
                    </p>
                    <p className="text-sm text-gray-500">
                      Transaction ID: {transaction.id}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {formatters.formatCurrency(transaction.amount)}
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatters.formatDateTime(transaction.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Distribution */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">User Distribution</h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Students</span>
                <span className="font-medium text-gray-900">{mockUsers.students.length}</span>
              </div>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full" 
                  style={{ width: `${(mockUsers.students.length / (mockUsers.students.length + mockUsers.tutors.length)) * 100}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Tutors</span>
                <span className="font-medium text-gray-900">{mockUsers.tutors.length}</span>
              </div>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full" 
                  style={{ width: `${(mockUsers.tutors.length / (mockUsers.students.length + mockUsers.tutors.length)) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Essay Status */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Essay Status</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">
                {mockEssays.filter(e => e.status === 'pending').length}
              </div>
              <div className="text-sm text-gray-500">Pending</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">
                {mockEssays.filter(e => e.status === 'reviewed').length}
              </div>
              <div className="text-sm text-gray-500">Completed</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-4">
            <Link
              to="/admin/users"
              className="block w-full text-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
            >
              Manage Users
            </Link>
            <Link
              to="/admin/transactions"
              className="block w-full text-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              View Transactions
            </Link>
            <Link
              to="/admin/content"
              className="block w-full text-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Manage Content
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;