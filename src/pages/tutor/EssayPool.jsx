import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TutorService from '../../services/tutorService';

const QUALIFICATION_LEVELS = [
  { value: 'all', label: 'All Levels' },
  { value: 'GCSE', label: 'GCSE' },
  { value: 'A-Level', label: 'A-Level' },
  { value: 'Bachelor', label: 'Bachelor' },
  { value: 'Master', label: 'Master' },
  { value: 'PhD', label: 'PhD' }
];

const SUBJECTS = {
  GCSE: ['English Literature', 'Mathematics', 'Science', 'History'],
  'A-Level': ['English Literature', 'Mathematics', 'Physics', 'Chemistry', 'History'],
  Bachelor: ['Literature', 'Engineering', 'Business', 'Computer Science'],
  Master: ['Advanced Engineering', 'Business Administration', 'Literature'],
  PhD: ['Research Topics', 'Thesis Review']
};

const EssayPool = () => {
  const navigate = useNavigate();
  const [essays, setEssays] = useState([]);
  const [filters, setFilters] = useState({
    qualification: 'all',
    subject: 'all',
    searchQuery: ''
  });
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const [acceptedEssayId, setAcceptedEssayId] = useState(null);

  useEffect(() => {
    const fetchEssays = async () => {
      try {
        const response = await TutorService.getAvailableEssays();
        setEssays(response.essays);
      } catch (error) {
        console.error('Failed to fetch essays:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEssays();
  }, []);

  const handleAcceptEssay = async (essayId) => {
    try {
      const response = await TutorService.acceptEssay(essayId);
      setSuccessMessage('Essay accepted successfully!');
      setAcceptedEssayId(essayId);
      
      // Update the essays list to remove the accepted essay
      setEssays(prevEssays => prevEssays.filter(essay => essay._id !== essayId));

      // Clear the success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
        setAcceptedEssayId(null);
      }, 3000);
    } catch (error) {
      console.error('Failed to accept essay:', error);
      // Optionally show error message
      setSuccessMessage('Failed to accept essay. Please try again.');
    }
  };

  const filteredEssays = essays.filter(essay => {
    const matchesQualification = filters.qualification === 'all' || 
      essay.academicLevel === filters.qualification;
    const matchesSubject = filters.subject === 'all' || 
      essay.subject === filters.subject;
    const matchesSearch = essay.title?.toLowerCase()
      .includes(filters.searchQuery.toLowerCase());

    return matchesQualification && matchesSubject && matchesSearch;
  });

  const getQualificationDisplay = (qualification) => {
    if (!qualification) return 'Unknown Level';
    return qualification.toUpperCase();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Add success message display */}
      {successMessage && (
        <div className="mb-4 p-4 rounded-md bg-green-50 border border-green-200">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">
                {successMessage}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Essay Pool</h1>
            <p className="mt-1 text-sm text-gray-500">
              Browse and accept essays for review
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:flex sm:space-x-4">
            <select
              value={filters.qualification}
              onChange={(e) => setFilters(prev => ({ 
                ...prev, 
                qualification: e.target.value,
                subject: 'all'
              }))}
              className="rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            >
              {QUALIFICATION_LEVELS.map(level => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
            
            <select
              value={filters.subject}
              onChange={(e) => setFilters(prev => ({ 
                ...prev, 
                subject: e.target.value 
              }))}
              className="mt-2 sm:mt-0 rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              disabled={filters.qualification === 'all'}
            >
              <option value="all">All Subjects</option>
              {filters.qualification !== 'all' && 
                SUBJECTS[filters.qualification]?.map(subject => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))
              }
            </select>

            <input
              type="text"
              placeholder="Search essays..."
              value={filters.searchQuery}
              onChange={(e) => setFilters(prev => ({ 
                ...prev, 
                searchQuery: e.target.value 
              }))}
              className="mt-2 sm:mt-0 rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            />
          </div>
        </div>
      </div>

      {/* Essays Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading essays...</p>
        </div>
      ) : filteredEssays.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEssays.map(essay => (
            <div key={essay._id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
              <div className="p-6">
                {/* Essay Header */}
                <div className="flex justify-between items-start">
                  <div className="flex-1 min-h-[3rem]">
                    <h3 className="text-lg font-medium text-gray-900 line-clamp-2 h-[3rem]">
                      {essay.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {essay.subject}
                    </p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 ml-2 flex-shrink-0">
                    {essay.academicLevel}
                  </span>
                </div>

                {/* Essay Details */}
                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                      <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                    </svg>
                    {essay.wordCount} words
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                    </svg>
                    £{essay.price.toFixed(2)}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    {essay.studentRequest}
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-6">
                  <button
                    onClick={() => handleAcceptEssay(essay._id)}
                    disabled={essay._id === acceptedEssayId}
                    className={`w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                      ${essay._id === acceptedEssayId 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
                      }`}
                  >
                    {essay._id === acceptedEssayId ? 'Accepted' : 'Accept Essay'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
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
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No essays found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {filters.searchQuery
              ? 'No essays match your search criteria'
              : 'There are currently no essays available for review'}
          </p>
        </div>
      )}
    </div>
  );
};

export default EssayPool;