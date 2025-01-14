



// FeedbackView.js
import React, { useState } from 'react';
import { formatters } from '../../utils/formatters';

const FeedbackView = ({ feedback, onRequestRevision }) => {
  const [activeSection, setActiveSection] = useState('overview');

  const scoreColors = {
    high: 'text-green-600 bg-green-50 border-green-200',
    medium: 'text-yellow-600 bg-yellow-50 border-yellow-200',
    low: 'text-red-600 bg-red-50 border-red-200'
  };

  const getScoreColor = (score) => {
    if (score >= 8) return scoreColors.high;
    if (score >= 6) return scoreColors.medium;
    return scoreColors.low;
  };

  const sections = [
    { id: 'overview', name: 'Overview' },
    { id: 'comments', name: 'Detailed Comments' },
    { id: 'improvements', name: 'Improvements' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header with Overall Score */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Essay Feedback</h3>
          <div className={`px-4 py-2 rounded-full border ${getScoreColor(feedback.overallScore)}`}>
            <span className="text-lg font-semibold">
              {feedback.overallScore}/10
            </span>
          </div>
        </div>

        {/* Tutor Info */}
        {feedback.tutor && (
          <div className="mt-4 flex items-center">
            <div className="flex-shrink-0">
              {feedback.tutor.avatar ? (
                <img
                  src={feedback.tutor.avatar}
                  alt={feedback.tutor.name}
                  className="h-10 w-10 rounded-full"
                />
              ) : (
                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500 font-medium">
                    {feedback.tutor.name.charAt(0)}
                  </span>
                </div>
              )}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{feedback.tutor.name}</p>
              <p className="text-xs text-gray-500">
                Reviewed on {formatters.formatDateTime(feedback.reviewedAt)}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`
                py-4 px-6 text-sm font-medium border-b-2 
                ${activeSection === section.id
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
              `}
            >
              {section.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Content Sections */}
      <div className="p-6">
        {/* Overview Section */}
        {activeSection === 'overview' && (
          <div className="space-y-6">
            {/* Criteria Scores */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {feedback.criteriaScores?.map((criteria) => (
                <div
                  key={criteria.name}
                  className="p-4 rounded-lg border border-gray-200"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      {criteria.name}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-sm ${getScoreColor(criteria.score)}`}>
                      {criteria.score}/10
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{criteria.comment}</p>
                </div>
              ))}
            </div>

            {/* Overall Comment */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Overall Feedback
              </h4>
              <p className="text-gray-600 whitespace-pre-line">
                {feedback.overallComment}
              </p>
            </div>
          </div>
        )}

        {/* Detailed Comments Section */}
        {activeSection === 'comments' && (
          <div className="space-y-4">
            {feedback.comments?.map((comment) => (
              <div
                key={comment.id}
                className="flex items-start p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex-shrink-0 mr-4">
                  <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-gray-100">
                    <span className="text-sm font-medium text-gray-800">
                      ¶{comment.paragraph}
                    </span>
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-gray-600">{comment.text}</p>
                  {comment.suggestion && (
                    <p className="mt-2 text-sm text-green-600">
                      Suggestion: {comment.suggestion}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Improvements Section */}
        {activeSection === 'improvements' && (
          <div className="space-y-4">
            {feedback.suggestedImprovements?.map((improvement, index) => (
              <div
                key={index}
                className="flex items-start p-4 bg-green-50 rounded-lg"
              >
                <div className="flex-shrink-0 mr-4">
                  <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-green-800">{improvement}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-lg">
        <div className="flex justify-end space-x-4">
          {onRequestRevision && (
            <button
              onClick={onRequestRevision}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Request Revision
            </button>
          )}
          <button className="px-4 py-2 bg-red-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-red-700">
            Download Feedback
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackView;