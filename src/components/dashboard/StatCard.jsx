
// StatCard.js
import React from 'react';

const StatCard = ({
  title,
  value,
  icon,
  loading = false
}) => {
 



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

      
    </div>
  );
};

export default StatCard;