import React from 'react';
import { Link } from 'react-router-dom';
import { formatters } from '../../utils/formatters';
import { helpers } from '../../utils/helpers';

const EssayCard = ({
    essay,
    onViewPdf,
    showActions = true
}) => {
    const statusColors = {
        Pending: 'bg-yellow-100 text-yellow-800',
        'In Progress': 'bg-blue-100 text-blue-800',
        Completed: 'bg-green-100 text-green-800',
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
                    <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            statusColors[essay.status]
                        }`}
                    >
                        {helpers.capitalizeWords(essay.status)}
                    </span>
                </div>

                {/* Submission Details */}
                <div className="mb-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Submitted</p>
                      <p className="font-medium text-gray-900">
                           {formatters.formatDateTime(essay.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                {showActions && (
                    <div className="flex items-center justify-end space-x-3 mt-4">

                        <Link
                            to={`/student/essay/${essay._id}`}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                        >
                            View Details
                            <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                       
                    </div>
                )}
            </div>
        </div>
    );
};

export default EssayCard;