// QuickActions.js
import React from 'react';
import { Link } from 'react-router-dom';

const QuickActions = ({ userRole = 'student' }) => {
  const actionsByRole = {
    student: [
      {
        name: 'Upload Essay',
        description: 'Submit a new essay for review',
        icon: (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
        ),
        path: '/student/essay-upload',
        color: 'bg-blue-500 hover:bg-blue-600'
      },
      {
        name: 'Schedule Interview',
        description: 'Book a mock interview session',
        icon: (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        ),
        path: '/student/interviews',
        color: 'bg-purple-500 hover:bg-purple-600'
      },
      {
        name: 'View Feedback',
        description: 'Check your recent essay reviews',
        icon: (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        ),
        path: '/student/essays',
        color: 'bg-green-500 hover:bg-green-600'
      },
      {
        name: 'Get Help',
        description: 'Access support resources',
        icon: (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
        path: '/help',
        color: 'bg-yellow-500 hover:bg-yellow-600'
      }
    ],
    tutor: [
      {
        name: 'Review Essays',
        description: 'Check pending essay reviews',
        icon: (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        ),
        path: '/tutor/essay-feedback',
        color: 'bg-red-500 hover:bg-red-600'
      }
      // Add more tutor actions as needed
    ]
  };

  const actions = actionsByRole[userRole] || [];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {actions.map((action) => (
            <Link
              key={action.name}
              to={action.path}
              className="group relative bg-white rounded-lg p-6 border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200"
            >
              <div className={`inline-flex p-3 rounded-lg ${action.color} text-white mb-4 transition-colors duration-200`}>
                {action.icon}
              </div>
              <h4 className="text-base font-medium text-gray-900 mb-1">
                {action.name}
              </h4>
              <p className="text-sm text-gray-500">
                {action.description}
              </p>
              {/* Hover arrow indicator */}
              <span className="absolute top-4 right-4 text-gray-400 transform translate-x-0 transition-transform duration-200 group-hover:translate-x-1">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickActions;