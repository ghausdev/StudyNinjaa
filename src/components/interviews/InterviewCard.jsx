// InterviewCard.js
import React from 'react';
import { formatters } from '../../utils/formatters';

const InterviewCard = ({
  interview,
  onJoin,
  onCancel,
  onReschedule,
  onViewFeedback,
  showActions = true
}) => {
  // Status styling configurations
  const statusColors = {
    scheduled: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
    'in-progress': 'bg-yellow-100 text-yellow-800'
  };

  // Calculate if interview is joinable (within 5 minutes of start time)
  const isJoinable = () => {
    const now = new Date();
    const interviewTime = new Date(interview.datetime);
    const diff = (interviewTime - now) / (1000 * 60); // difference in minutes
    return diff <= 5 && diff >= -60; // joinable 5 minutes before and up to 60 minutes after start
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6">
        {/* Header with Status */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[interview.status]}`}>
              {interview.status.charAt(0).toUpperCase() + interview.status.slice(1)}
            </span>
          </div>
          <div className="text-sm text-gray-500">
            {formatters.formatDuration(interview.duration)} Interview
          </div>
        </div>

        {/* Interview Details */}
        <div className="space-y-4">
          {/* Subject and Type */}
          <div>
            <h3 className="text-lg font-medium text-gray-900">{interview.subject}</h3>
            <p className="text-sm text-gray-500">{interview.type} Interview</p>
          </div>

          {/* Date and Time */}
          <div className="flex items-center text-sm">
            <svg className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="font-medium">{formatters.formatDateTime(interview.datetime)}</span>
          </div>

          {/* Tutor Info (if available) */}
          {interview.tutorId && (
            <div className="flex items-center text-sm">
              <svg className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>with <span className="font-medium">{interview.tutorName}</span></span>
            </div>
          )}

          {/* Additional Notes */}
          {interview.notes && (
            <div className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
              <p className="font-medium text-gray-900 mb-1">Notes:</p>
              <p>{interview.notes}</p>
            </div>
          )}

          {/* Questions/Topics (if available) */}
          {interview.questions && interview.questions.length > 0 && (
            <div className="text-sm">
              <p className="font-medium text-gray-900 mb-2">Topics to be covered:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                {interview.questions.map((question, index) => (
                  <li key={index}>{question}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {showActions && (
          <div className="mt-6 flex flex-col sm:flex-row sm:justify-end space-y-3 sm:space-y-0 sm:space-x-3">
            {interview.status === 'scheduled' && (
              <>
                <button
                  onClick={() => onCancel(interview.id)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Cancel
                </button>
                <button
                  onClick={() => onReschedule(interview.id)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Reschedule
                </button>
                {isJoinable() && interview.zoomLink && (
                  <button
                    onClick={() => onJoin(interview.id)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Join Interview
                    <svg className="ml-2 -mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                )}
              </>
            )}
            {interview.status === 'completed' && interview.feedback && (
              <button
                onClick={() => onViewFeedback(interview.id)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                View Feedback
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewCard;