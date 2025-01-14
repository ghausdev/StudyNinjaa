import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockEssays } from '../../data/mockEssays';

const QUALIFICATION_LEVELS = [
  { value: 'all', label: 'All Levels' },
  { value: 'gcse', label: 'GCSE' },
  { value: 'alevel', label: 'A-Level' },
  { value: 'masters', label: 'Masters' },
  { value: 'phd', label: 'PhD' }
];

const SUBJECTS = {
  gcse: ['English Literature', 'Mathematics', 'Science', 'History'],
  alevel: ['English Literature', 'Mathematics', 'Physics', 'Chemistry', 'History'],
  masters: ['Literature', 'Engineering', 'Business', 'Computer Science'],
  phd: ['Research Topics', 'Thesis Review']
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

  useEffect(() => {
    const fetchEssays = async () => {
      try {
        // Filter out essays without qualifications or with tutorIds
        const availableEssays = mockEssays.filter(essay => 
          essay.qualification && !essay.tutorId
        );
        setEssays(availableEssays);
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
      // Mock API call
      await fetch(`/api/essays/${essayId}/accept`, { method: 'POST' });
      navigate(`/tutor/chat/${essayId}`);
    } catch (error) {
      console.error('Failed to accept essay:', error);
    }
  };

  const filteredEssays = essays.filter(essay => {
    const matchesQualification = filters.qualification === 'all' || 
      essay.qualification === filters.qualification;
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
            <div key={essay.id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
              <div className="p-6">
                {/* Essay Header */}
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 line-clamp-2">
                      {essay.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {essay.subject}
                    </p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    {getQualificationDisplay(essay.qualification)}
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
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    Posted {new Date(essay.submittedAt).toLocaleDateString()}
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-6">
                  <button
                    onClick={() => handleAcceptEssay(essay.id)}
                    className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Accept Essay
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