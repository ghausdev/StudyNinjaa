
// StatCard.js
import React from 'react';

const StatCard = ({
  title,
  value,
  icon,
  change,
  changeType = 'neutral', // 'increase', 'decrease', or 'neutral'
  changeTimespan = 'vs. last month',
  loading = false
}) => {
  const getChangeColor = () => {
    switch (changeType) {
      case 'increase':
        return 'text-green-600 bg-green-50';
      case 'decrease':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getChangeIcon = () => {
    if (changeType === 'increase') {
      return (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      );
    }
    if (changeType === 'decrease') {
      return (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
        </svg>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="h-8 bg-gray-200 rounded w-2/3 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      {/* Title and Icon */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        {icon && (
          <span className="p-2 rounded-full bg-gray-50">
            {icon}
          </span>
        )}
      </div>

      {/* Value */}
      <div className="mb-4">
        <div className="text-2xl font-bold text-gray-900">
          {value}
        </div>
      </div>

      {/* Change Indicator */}
      {change && (
        <div className="flex items-center text-sm">
          <span className={`inline-flex items-center px-2 py-1 rounded-full ${getChangeColor()}`}>
            {getChangeIcon()}
            <span className="ml-1 font-medium">{change}</span>
          </span>
          <span className="ml-2 text-gray-500">{changeTimespan}</span>
        </div>
      )}
    </div>
  );
};

export default StatCard;