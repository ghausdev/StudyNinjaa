// ActivityLog.js
import React, { useState } from 'react';
import { formatters } from '../../utils/formatters';
import { helpers } from '../../utils/helpers';

const ActivityLog = ({
  activities = [],
  loading = false,
  onLoadMore,
  hasMore = false
}) => {
  const [filter, setFilter] = useState('all'); // all, essays, interviews, etc.

  const activityIcons = {
    essay_submission: (
      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
        <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
    ),
    interview_scheduled: (
      <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
        <svg className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    ),
    feedback_received: (
      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
        <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      </div>
    ),
    achievement_unlocked: (
      <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center">
        <svg className="h-5 w-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      </div>
    )
  };

  const filters = [
    { id: 'all', name: 'All Activities' },
    { id: 'essays', name: 'Essays' },
    { id: 'interviews', name: 'Interviews' },
    { id: 'achievements', name: 'Achievements' }
  ];

  const filteredActivities = activities.filter(activity => {
    if (filter === 'all') return true;
    if (filter === 'essays') return activity.type.includes('essay');
    if (filter === 'interviews') return activity.type.includes('interview');
    if (filter === 'achievements') return activity.type.includes('achievement');
    return true;
  });

  // Group activities by date
  const groupedActivities = filteredActivities.reduce((groups, activity) => {
    const date = new Date(activity.timestamp).toDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(activity);
    return groups;
  }, {});

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((n) => (
          <div key={n} className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center space-x-4">
                <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {filters.map((filterOption) => (
          <button
            key={filterOption.id}
            onClick={() => setFilter(filterOption.id)}
            className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors
              ${filter === filterOption.id
                ? 'bg-red-100 text-red-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            {filterOption.name}
          </button>
        ))}
      </div>

      {/* Activities List */}
      <div className="space-y-8">
        {Object.entries(groupedActivities).map(([date, dateActivities]) => (
          <div key={date}>
            <h3 className="text-sm font-medium text-gray-500 mb-4">
              {helpers.isToday(new Date(date)) ? 'Today' : formatters.formatDate(new Date(date))}
            </h3>
            <div className="space-y-4">
              {dateActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-start space-x-4">
                    {/* Activity Icon */}
                    {activityIcons[activity.type]}

                    {/* Activity Content */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.title}
                      </p>
                      {activity.description && (
                        <p className="mt-0.5 text-sm text-gray-500">
                          {activity.description}
                        </p>
                      )}
                      <p className="mt-2 text-xs text-gray-400">
                        {formatters.formatTime(new Date(activity.timestamp))}
                      </p>
                    </div>

                    {/* Optional Action Button */}
                    {activity.action && (
                      <button
                        onClick={() => activity.action.onClick(activity.id)}
                        className="text-sm font-medium text-red-600 hover:text-red-700"
                      >
                        {activity.action.label}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="text-center">
          <button
            onClick={onLoadMore}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Load More
          </button>
        </div>
      )}


              {/* Complete the empty state section */}
{filteredActivities.length === 0 && (
  <div className="text-center py-12">
    <svg
      className="mx-auto h-12 w-12 text-gray-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
      />
    </svg>
    <h3 className="mt-2 text-sm font-medium text-gray-900">No activities found</h3>
    <p className="mt-1 text-sm text-gray-500">
      {filter === 'all'
        ? 'No recent activities to display'
        : `No ${filter} activities found`}
    </p>
  </div>
 

)}

    </div>
  );
}

export default ActivityLog;