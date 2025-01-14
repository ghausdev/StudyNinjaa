// components/essays/NewEssayCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import Badge from '../common/Badge';
import { formatters } from '../../utils/formatters';
import { helpers } from '../../utils/helpers';


const EssayCard = ({ essay, onView, onDelete, onAccept, isPoolCard = false }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900">{essay.title}</h3>
            <p className="mt-1 text-sm text-gray-500">{essay.subject}</p>
              {isPoolCard && (
                    <p className="mt-1 text-sm text-gray-500">
                      {helpers.capitalizeWords(essay.qualification)}
                    </p>
                  )}
          </div>
            {!isPoolCard &&
           <Badge
                  variant={
                      essay.status === 'pending' ? 'warning' :
                      essay.status === 'in_review' ? 'info' :
                      'success'
                  }
                >
               {formatters.formatEssayStatus(essay.status)}
              </Badge>
            }

          
        </div>

        <div className="mt-4 text-sm text-gray-500">
          <p>Word Count: {essay.wordCount}</p>
            <p>Submitted: {formatters.formatDateTime(essay.submittedAt)}</p>
              {/* {isPoolCard && <p>Posted: {formatters.formatDateTime(essay.postedAt)}</p>} */}
        </div>


        {isPoolCard ? (
         <div className="mt-4 flex justify-end">
              <button
                  onClick={onAccept}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
              Accept
              </button>
             </div>
        ) : (
        <div className="mt-4 flex justify-end space-x-2">
            <button
              onClick={onView}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              View
            </button>
          <button
            onClick={onDelete}
             className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
          Delete
        </button>
        </div>

        )}
      </div>
    </div>
  );
};

export default EssayCard;