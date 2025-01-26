// EssayFeedback.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EssayCard from '../../components/essays/EssayCard';
import Badge from '../../components/common/Badge';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { formatters } from '../../utils/formatters';
// Mock Data Imports
import { mockUsers } from '../../data/mockUsers';
import { mockEssays} from '../../data/mockEssays';
import { mockInterviews } from '../../data/mockInterviews';
import tutorService from '../../services/tutorService';

const EssayFeedback = () => {
  const [essays, setEssays] = useState([]);
  const [selectedEssay, setSelectedEssay] = useState(null);
  const [feedback, setFeedback] = useState({
    score: 0,
    feedback: '',
    modelAnswerFile: null
  });
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock tutor data
  const tutor = mockUsers.tutors[0];

  // Fetch essays on component mount
  useEffect(() => {
    const fetchEssays = async () => {
      try {
        const response = await tutorService.getAllEssays();
        setEssays(response.essays);
      } catch (error) {
        console.error('Failed to fetch essays:', error);
      }
    };
    fetchEssays();
  }, []);

  const handleStartReview = (essay) => {
    setSelectedEssay(essay);
    if (essay.status !== 'Completed') {
      setFeedback({
        score: 0,
        feedback: '',
        modelAnswerFile: null
      });
    }
  };

  const handleSubmitFeedback = async () => {
    setLoading(true);
    try {
      const data = {
        essayID: selectedEssay._id,
        score: feedback.score,
        feedback: feedback.feedback,
        modelAnswerFile: feedback.modelAnswerFile
      };

      await tutorService.markEssay(data);
      // Remove marked essay from list
      setEssays(prev => prev.filter(essay => essay._id !== selectedEssay._id));
      setSelectedEssay(null);
    } catch (error) {
      console.error('Failed to submit feedback:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter essays based on search and status
  const filteredEssays = essays?.filter(essay => 
    (statusFilter === 'all' || essay.status === statusFilter) &&
    (searchQuery === '' || essay.title.toLowerCase().includes(searchQuery.toLowerCase()))
  ) || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Essay Reviews</h1>
            <p className="mt-1 text-sm text-gray-500">
              Review and provide feedback on assigned essays
            </p>
          </div>
          {/* Status Filter */}
          <div className="flex items-center space-x-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            >
              <option value="all">All Essays</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <input
              type="text"
              placeholder="Search essays..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Essays List */}
        <div className="lg:col-span-8 space-y-4">
          {loading ? (
            <LoadingSpinner />
          ) : filteredEssays.length === 0 ? (
            <div className="text-center py-8 bg-white rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-500">No essays found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredEssays.map((essay) => (
                <div
                  key={essay._id}
                  className={`bg-white rounded-lg shadow-sm border transition-colors cursor-pointer h-full
                    ${selectedEssay?._id === essay._id ? 'border-red-500' : 'border-gray-200 hover:border-gray-300'}`}
                  onClick={() => handleStartReview(essay)}
                >
                  <div className="p-4 h-full flex flex-col">
                    <div className="flex items-start justify-between mb-auto">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 line-clamp-2">{essay.title}</h3>
                        <p className="mt-1 text-sm text-gray-500">{essay.subject}</p>
                      </div>
                      <Badge 
                        variant={essay.status === 'Completed' ? 'success' : 'info'}
                      >
                        {essay.status}
                      </Badge>
                    </div>
                    <div className="mt-4 text-sm text-gray-500">
                      <p>Word Count: {essay.wordCount}</p>
                      <p>Academic Level: {essay.academicLevel}</p>
                      <p>Request Type: {essay.studentRequest}</p>
                      <p>Submitted: {new Date(essay.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Essay Details and Feedback Form */}
        {selectedEssay && (
          <div className="lg:col-span-4 space-y-6">
            {/* Essay Details */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">{selectedEssay.title}</h2>
              <div className="space-y-4">
                {/* Essay File */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Essay File</h3>
                  <a 
                    href={selectedEssay.fileUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-red-600 hover:text-red-500 block mt-1"
                  >
                    View Essay PDF
                  </a>
                </div>

                {/* Marking Scheme if available */}
                {selectedEssay.markingScheme && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">Marking Scheme</h3>
                    <a 
                      href={selectedEssay.markingScheme} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-red-600 hover:text-red-500 block mt-1"
                    >
                      View Marking Scheme
                    </a>
                  </div>
                )}

                {/* Show Model Answer for completed essays if available */}
                {selectedEssay.status === 'Completed' && selectedEssay.modelURL && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">Model Answer</h3>
                    <a 
                      href={selectedEssay.modelURL} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-red-600 hover:text-red-500 block mt-1"
                    >
                      View Model Answer
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Feedback Section */}
            {selectedEssay.status === 'Completed' ? (
              // View-only feedback for completed essays
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Score</h3>
                  <p className="mt-1">{selectedEssay.score}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Feedback</h3>
                  <p className="mt-1 whitespace-pre-wrap">{selectedEssay.feedback}</p>
                </div>
              </div>
            ) : (
              // Editable feedback form for in-progress essays
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Score</label>
                  <input
                    type="number"
                    value={feedback.score}
                    onChange={(e) => setFeedback(prev => ({ ...prev, score: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Feedback</label>
                  <textarea
                    value={feedback.feedback}
                    onChange={(e) => setFeedback(prev => ({ ...prev, feedback: e.target.value }))}
                    rows={6}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  />
                </div>

                {selectedEssay.studentRequest === 'Feedback and Model Answer' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Model Answer File</label>
                    <input
                      type="file"
                      onChange={(e) => setFeedback(prev => ({ ...prev, modelAnswerFile: e.target.files[0] }))}
                      className="mt-1 block w-full"
                    />
                  </div>
                )}

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setSelectedEssay(null)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmitFeedback}
                    disabled={loading}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 disabled:opacity-50"
                  >
                    {loading ? 'Submitting...' : 'Submit Feedback'}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EssayFeedback;