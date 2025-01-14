// EssayCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import { formatters } from '../../utils/formatters';

const EssayCard = ({
  essay,
  onView,
  onDelete,
  showActions = true
}) => {
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    in_review: 'bg-blue-100 text-blue-800',
    reviewed: 'bg-green-100 text-green-800',
    revision_requested: 'bg-red-100 text-red-800'
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
      <div className="p-6">
        {/* Header with Status */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              {essay.title}
            </h3>
            <div className="flex items-center text-sm text-gray-500">
              <span className="mr-2">{essay.subject}</span>
              <span className="mx-2">•</span>
              <span>{essay.wordCount} words</span>
            </div>
          </div>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[essay.status]}`}>
            {formatters.formatEssayStatus(essay.status)}
          </span>
        </div>

        {/* Submission Details */}
        <div className="mb-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Submitted</p>
              <p className="font-medium text-gray-900">
                {formatters.formatDateTime(essay.submittedAt)}
              </p>
            </div>
            {essay.reviewedAt && (
              <div>
                <p className="text-gray-500">Reviewed</p>
                <p className="font-medium text-gray-900">
                  {formatters.formatDateTime(essay.reviewedAt)}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Feedback Summary (if reviewed) */}
        {essay.feedback && (
          <div className="mb-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Overall Score</span>
              <span className="text-lg font-bold text-gray-900">{essay.feedback.overallScore}/10</span>
            </div>
            {essay.feedback.suggestedImprovements && (
              <div className="mt-2">
                <p className="text-sm font-medium text-gray-700 mb-1">Key Improvements:</p>
                <ul className="text-sm text-gray-600 list-disc list-inside">
                  {essay.feedback.suggestedImprovements.slice(0, 2).map((improvement, index) => (
                    <li key={index} className="truncate">{improvement}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        {showActions && (
          <div className="flex items-center justify-end space-x-3 mt-4">
            {onDelete && (
              <button
                onClick={() => onDelete(essay.id)}
                className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50"
              >
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete
              </button>
            )}
            <button
              onClick={() => onView(essay.id)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
            >
              {essay.status === 'reviewed' ? 'View Feedback' : 'View Details'}
              <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EssayCard;