// NotificationPanel.js
import React, { useState } from 'react';
import { formatters } from '../../utils/formatters';

const NotificationPanel = ({
  notifications = [],
  onMarkAsRead,
  onMarkAllAsRead,
  onNotificationClick,
  loading = false
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const notificationIcons = {
    essay: (
      <div className="p-2 rounded-full bg-blue-50 text-blue-600">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
    ),
    interview: (
      <div className="p-2 rounded-full bg-purple-50 text-purple-600">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      </div>
    ),
    feedback: (
      <div className="p-2 rounded-full bg-green-50 text-green-600">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
      </div>
    ),
    payment: (
      <div className="p-2 rounded-full bg-yellow-50 text-yellow-600">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
    )
  };

  const unreadCount = notifications.filter(notif => !notif.read).length;

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse"></div>
        </div>
        <div className="divide-y divide-gray-200">
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="p-4 flex space-x-4 animate-pulse">
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
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
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center">
          <h3 className="text-lg font-medium text-gray-900">Notifications</h3>
          {unreadCount > 0 && (
            <span className="ml-2 px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-600">
              {unreadCount} new
            </span>
          )}
        </div>
        {unreadCount > 0 && (
          <button
            onClick={onMarkAllAsRead}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Mark all as read
          </button>
        )}
      </div>

      {/* Notifications List */}
      <div className="divide-y divide-gray-200">
        {(isExpanded ? notifications : notifications.slice(0, 5)).map((notification) => (
          <div
            key={notification.id}
            className={`p-4 ${notification.read ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-50 transition-colors duration-150 cursor-pointer`}
            onClick={() => onNotificationClick?.(notification)}
          >
            <div className="flex items-start space-x-4">
              {/* Icon */}
              {notificationIcons[notification.type]}

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className={`text-sm ${notification.read ? 'text-gray-900' : 'font-medium text-gray-900'}`}>
                  {notification.message}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {formatters.formatDateTime(notification.timestamp)}
                </p>
              </div>

              {/* Mark as read button */}
              {!notification.read && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onMarkAsRead?.(notification.id);
                  }}
                  className="text-xs text-gray-500 hover:text-gray-700"
                >
                  Mark as read
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Show More/Less Button */}
      {notifications.length > 5 && (
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm font-medium text-red-600 hover:text-red-700"
          >
            {isExpanded ? 'Show less' : `Show ${notifications.length - 5} more`}
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationPanel;