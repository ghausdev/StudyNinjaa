// ProfileHeader.js
import React from 'react';
import { helpers } from '../../utils/helpers';

const ProfileHeader = ({
  user,
  stats,
  showEdit = true,
  onEdit
}) => {
  const getInitials = (name) => {
    return helpers.getInitials(name);
  };

  const getSubscriptionBadgeColor = (plan) => {
    const colors = {
      basic: 'bg-gray-100 text-gray-800',
      premium: 'bg-yellow-100 text-yellow-800',
      pro: 'bg-purple-100 text-purple-800'
    };
    return colors[plan] || colors.basic;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="px-4 py-5 sm:px-6">
        {/* Profile Header with Avatar */}
        <div className="flex items-center space-x-5">
          {/* Avatar */}
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={`${user.firstName} ${user.lastName}`}
              className="h-20 w-20 rounded-full object-cover"
            />
          ) : (
            <div className="h-20 w-20 rounded-full bg-red-100 flex items-center justify-center">
              <span className="text-2xl font-medium text-red-700">
                {getInitials(`${user.firstName} ${user.lastName}`)}
              </span>
            </div>
          )}

          {/* Basic Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 truncate">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              {showEdit && (
                <button
                  onClick={onEdit}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  Edit Profile
                </button>
              )}
            </div>

            {/* Tags/Badges */}
            <div className="mt-2 flex flex-wrap gap-2">
              {user.subscription && (
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSubscriptionBadgeColor(user.subscription.plan)}`}>
                  {user.subscription.plan.charAt(0).toUpperCase() + user.subscription.plan.slice(1)} Plan
                </span>
              )}
              {user.targetUniversity && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Target: {user.targetUniversity}
                </span>
              )}
              {user.targetCourse && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {user.targetCourse}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        {stats && (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-5 border-t border-gray-200">
            {stats.map((stat) => (
              <div key={stat.name} className="px-4 py-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                <p className="mt-1 text-xl font-semibold text-gray-900">{stat.value}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;