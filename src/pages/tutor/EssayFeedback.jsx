// EssayFeedback.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import EssayCard from '../../components/essays/EssayCard';
import Badge from '../../components/common/Badge';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { formatters } from '../../utils/formatters';
// Mock Data Imports
import { mockUsers } from '../../data/mockUsers';
import { mockEssays} from '../../data/mockEssays';
import { mockInterviews } from '../../data/mockInterviews';

const EssayFeedback = () => {
  const [selectedEssay, setSelectedEssay] = useState(null);
  const [feedback, setFeedback] = useState({
    overallScore: 0,
    criteriaScores: [
      { name: 'Content', score: 0, comment: '' },
      { name: 'Structure', score: 0, comment: '' },
      { name: 'Language', score: 0, comment: '' },
      { name: 'Argumentation', score: 0, comment: '' }
    ],
    comments: [],
    overallComment: '',
    suggestedImprovements: ['']
  });
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock tutor data
  const tutor = mockUsers.tutors[0];

  // Get assigned essays
  const assignedEssays = mockEssays.filter(essay => 
    essay.tutorId === tutor.id &&
    (statusFilter === 'all' || essay.status === statusFilter) &&
    (searchQuery === '' || essay.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  console.log(assignedEssays);

  const handleStartReview = (essay) => {
    setSelectedEssay(essay);
    // Reset feedback form
    setFeedback({
      overallScore: 0,
      criteriaScores: [
        { name: 'Content', score: 0, comment: '' },
        { name: 'Structure', score: 0, comment: '' },
        { name: 'Language', score: 0, comment: '' },
        { name: 'Argumentation', score: 0, comment: '' }
      ],
      comments: [],
      overallComment: '',
      suggestedImprovements: ['']
    });
  };

  const handleCriteriaChange = (index, field, value) => {
    setFeedback(prev => ({
      ...prev,
      criteriaScores: prev.criteriaScores.map((criteria, i) =>
        i === index ? { ...criteria, [field]: value } : criteria
      )
    }));
  };

  const handleAddComment = () => {
    setFeedback(prev => ({
      ...prev,
      comments: [...prev.comments, { paragraph: '', text: '' }]
    }));
  };

  const handleCommentChange = (index, field, value) => {
    setFeedback(prev => ({
      ...prev,
      comments: prev.comments.map((comment, i) =>
        i === index ? { ...comment, [field]: value } : comment
      )
    }));
  };

  const handleAddImprovement = () => {
    setFeedback(prev => ({
      ...prev,
      suggestedImprovements: [...prev.suggestedImprovements, '']
    }));
  };

  const handleImprovementChange = (index, value) => {
    setFeedback(prev => ({
      ...prev,
      suggestedImprovements: prev.suggestedImprovements.map((improvement, i) =>
        i === index ? value : improvement
      )
    }));
  };

  const handleSubmitFeedback = async () => {
    setLoading(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Feedback submitted:', feedback);
      setSelectedEssay(null);
    } catch (error) {
      console.error('Failed to submit feedback:', error);
    } finally {
      setLoading(false);
    }
  };

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
              <option value="pending">Pending Review</option>
              <option value="in_review">In Progress</option>
              <option value="reviewed">Completed</option>
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Essays List */}
        <div className="lg:col-span-1 space-y-4">
          {assignedEssays.length > 0 ? (
            assignedEssays.map((essay) => (
              <div
                key={essay.id}
                className={`bg-white rounded-lg shadow-sm border transition-colors cursor-pointer
                  ${selectedEssay?.id === essay.id ? 'border-red-500' : 'border-gray-200 hover:border-gray-300'}`}
                onClick={() => handleStartReview(essay)}
              >
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{essay.title}</h3>
                      <p className="mt-1 text-sm text-gray-500">{essay.subject}</p>
                    </div>
                    <Badge
                      variant={
                        essay.status === 'pending' ? 'warning' :
                        essay.status === 'in_review' ? 'info' :
                        'success'
                      }
                    >
                      {formatters.formatEssayStatus(essay.status)}
                    </Badge>
                  </div>
                  <div className="mt-4 text-sm text-gray-500">
                    <p>Word Count: {essay.wordCount}</p>
                    <p>Submitted: {formatters.formatDateTime(essay.submittedAt)}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
              <p className="text-gray-500">No essays found</p>
            </div>
          )}
        </div>

        {/* Feedback Form */}
        {selectedEssay ? (
          <div className="lg:col-span-2 space-y-6">
            {/* Essay Content */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">{selectedEssay.title}</h2>
              {/* Essay content would be displayed here */}
              <div className="prose max-w-none">
                <p className="text-gray-600">Essay content would be displayed here...</p>
              </div>
            </div>

            {/* Feedback Form */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
              {/* Overall Score */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Overall Score (0-10)
                </label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  value={feedback.overallScore}
                  onChange={(e) => setFeedback(prev => ({ ...prev, overallScore: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                />
              </div>

              {/* Criteria Scores */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-4">Criteria Evaluation</h3>
                <div className="space-y-4">
                  {feedback.criteriaScores.map((criteria, index) => (
                    <div key={criteria.name}>
                      <div className="flex items-center justify-between">
                        <label className="text-sm text-gray-600">{criteria.name}</label>
                        <input
                          type="number"
                          min="0"
                          max="10"
                          value={criteria.score}
                          onChange={(e) => handleCriteriaChange(index, 'score', e.target.value)}
                          className="w-20 rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                        />
                      </div>
                      <textarea
                        value={criteria.comment}
                        onChange={(e) => handleCriteriaChange(index, 'comment', e.target.value)}
                        placeholder={`Comments on ${criteria.name.toLowerCase()}...`}
                        rows={2}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Specific Comments */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-700">Specific Comments</h3>
                  <button
                    type="button"
                    onClick={handleAddComment}
                    className="text-sm font-medium text-red-600 hover:text-red-500"
                  >
                    Add Comment
                  </button>
                </div>
                <div className="space-y-4">
                  {feedback.comments.map((comment, index) => (
                    <div key={index} className="grid grid-cols-4 gap-4">
                      <div className="col-span-1">
                        <input
                          type="number"
                          placeholder="¶"
                          value={comment.paragraph}
                          onChange={(e) => handleCommentChange(index, 'paragraph', e.target.value)}
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                        />
                      </div>
                      <div className="col-span-3">
                        <textarea
                          value={comment.text}
                          onChange={(e) => handleCommentChange(index, 'text', e.target.value)}
                          placeholder="Your comment..."
                          rows={2}
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Overall Comment */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Overall Comment
                </label>
                <textarea
                  value={feedback.overallComment}
                  onChange={(e) => setFeedback(prev => ({ ...prev, overallComment: e.target.value }))}
                  rows={4}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  placeholder="Provide overall feedback..."
                />
              </div>

              {/* Suggested Improvements */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-700">Suggested Improvements</h3>
                  <button
                    type="button"
                    onClick={handleAddImprovement}
                    className="text-sm font-medium text-red-600 hover:text-red-500"
                  >
                    Add Improvement
                  </button>
                </div>
                <div className="space-y-2">
                  {feedback.suggestedImprovements.map((improvement, index) => (
                    <div key={index}>
                      <textarea
                        value={improvement}
                        onChange={(e) => handleImprovementChange(index, e.target.value)}
                        rows={2}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                        placeholder="Suggest an improvement..."
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setSelectedEssay(null)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmitFeedback}
                  disabled={loading}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <LoadingSpinner size="sm" color="white" className="mr-2" />
                      Submitting...
                    </div>
                  ) : (
                    'Submit Feedback'
                  )}
                </button>
              </div>
            </div>
          </div>
        ) : (
            <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
              <div className="space-y-4">
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
                <h3 className="text-lg font-medium text-gray-900">
                  Select an essay to review
                </h3>
                <p className="text-sm text-gray-500">
                  Choose an essay from the list to start providing feedback
                </p>
              </div>
            </div>
          </div>

        )}

        </div>

        </div>
    );
}

export default EssayFeedback;