// ActivityFeed.js
import React from 'react';
import { formatters } from '../../utils/formatters';

const ActivityFeed = ({
  activities = [],
  loading = false,
  maxItems = 5,
  showViewAll = true,
  onViewAll
}) => {
  // Activity type icons
  const activityIcons = {
    essay_submitted: (
      <div className="p-2 rounded-full bg-blue-50 text-blue-600">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
    ),
    feedback_received: (
      <div className="p-2 rounded-full bg-green-50 text-green-600">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      </div>
    ),
    interview_scheduled: (
      <div className="p-2 rounded-full bg-purple-50 text-purple-600">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    ),
    payment_processed: (
      <div className="p-2 rounded-full bg-yellow-50 text-yellow-600">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
    )
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="h-5 bg-gray-200 rounded w-1/3 animate-pulse"></div>
        </div>
        <div className="divide-y divide-gray-200">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="p-4 flex items-center space-x-4 animate-pulse">
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
      </div>

      {/* Activity List */}
      <div className="divide-y divide-gray-200">
        {activities.slice(0, maxItems).map((activity) => (
          <div key={activity.id} className="p-4 hover:bg-gray-50 transition-colors duration-150">
            <div className="flex items-start space-x-4">
              {/* Activity Icon */}
              {activityIcons[activity.type]}

              {/* Activity Content */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  {activity.title}
                </p>
                <p className="text-sm text-gray-500 truncate">
                  {activity.description}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {formatters.formatDateTime(activity.timestamp)}
                </p>
              </div>

              {/* Optional Action Button */}
              {activity.actionLabel && (
                <button
                  onClick={() => activity.onAction?.()}
                  className="text-sm font-medium text-red-600 hover:text-red-700"
                >
                  {activity.actionLabel}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      {showViewAll && activities.length > maxItems && (
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={onViewAll}
            className="text-sm font-medium text-red-600 hover:text-red-700"
          >
            View all activity
          </button>
        </div>
      )}
    </div>
  );
};

export default ActivityFeed;