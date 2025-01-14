// ReviewStatus.js
import React from 'react';
import { formatters } from '../../utils/formatters';

const ReviewStatus = ({ essay, className = '' }) => {
  const steps = [
    {
      id: 'submitted',
      name: 'Submitted',
      description: 'Essay submitted for review',
      status: 'complete', // complete, current, upcoming
      date: essay.submittedAt
    },
    {
      id: 'in_review',
      name: 'Under Review',
      description: 'Being reviewed by tutor',
      status: essay.status === 'pending' ? 'upcoming' : 
             essay.status === 'in_review' ? 'current' : 'complete',
      date: essay.reviewStartedAt
    },
    {
      id: 'completed',
      name: 'Review Complete',
      description: 'Feedback ready for viewing',
      status: essay.status === 'reviewed' ? 'complete' : 'upcoming',
      date: essay.reviewedAt
    }
  ];

  // Define status colors and icons
  const statusStyles = {
    complete: {
      background: 'bg-green-500',
      text: 'text-green-700',
      border: 'border-green-500',
      icon: (
        <svg className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      )
    },
    current: {
      background: 'bg-blue-500',
      text: 'text-blue-700',
      border: 'border-blue-500',
      icon: (
        <svg className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
        </svg>
      )
    },
    upcoming: {
      background: 'bg-gray-200',
      text: 'text-gray-500',
      border: 'border-gray-200',
      icon: null
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Review Status</h3>
      </div>

      <div className="p-4">
        <div className="space-y-8">
          {steps.map((step, stepIdx) => (
            <div key={step.id} className="relative">
              {/* Connect steps with line */}
              {stepIdx !== steps.length - 1 && (
                <div 
                  className={`absolute top-5 left-5 -ml-px mt-0.5 h-full w-0.5 ${
                    step.status === 'complete' ? 'bg-green-500' : 'bg-gray-200'
                  }`} 
                  aria-hidden="true"
                />
              )}

              <div className="relative flex items-start group">
                {/* Status circle */}
                <span className="flex items-center h-9">
                  <span className={`relative z-10 w-8 h-8 flex items-center justify-center rounded-full ${
                    statusStyles[step.status].background
                  } ring-4 ring-white`}>
                    {statusStyles[step.status].icon}
                  </span>
                </span>

                {/* Step content */}
                <div className="ml-4 min-w-0 flex-1">
                  <div className="text-sm font-medium text-gray-900">
                    {step.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {step.description}
                  </div>
                  {step.date && (
                    <div className={`mt-1 text-sm ${statusStyles[step.status].text}`}>
                      {formatters.formatDateTime(step.date)}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Information */}
      {essay.estimatedCompletionTime && essay.status !== 'reviewed' && (
        <div className="px-4 py-3 bg-gray-50 text-sm border-t border-gray-200 rounded-b-lg">
          <div className="flex items-center text-gray-700">
            <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>
              Estimated completion: {formatters.formatDateTime(essay.estimatedCompletionTime)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewStatus;