// InterviewManagement.js
import React, { useState } from 'react';
import InterviewCard from '../../components/interviews/InterviewCard';
import Badge from '../../components/common/Badge';
import { formatters } from '../../utils/formatters';
// Mock Data Imports
import { mockUsers } from '../../data/mockUsers';
import { mockEssays} from '../../data/mockEssays';
import { mockInterviews } from '../../data/mockInterviews';

const InterviewManagement = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditingAvailability, setIsEditingAvailability] = useState(false);
  const [availability, setAvailability] = useState({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: []
  });

  // Mock tutor data
  const tutor = mockUsers.tutors[0];

  // Get tutor's interviews
  const interviews = mockInterviews.filter(interview => {
    const matchesStatus = statusFilter === 'all' || interview.status === statusFilter;
    const matchesSearch = searchQuery === '' || 
      interview.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return interview.tutorId === tutor.id && matchesStatus && matchesSearch;
  });

  // Group interviews by status
  const upcomingInterviews = interviews.filter(
    interview => new Date(interview.datetime) > new Date() && interview.status === 'scheduled'
  );
  const completedInterviews = interviews.filter(
    interview => interview.status === 'completed'
  );
  const cancelledInterviews = interviews.filter(
    interview => interview.status === 'cancelled'
  );

  // Time slots for availability
  const timeSlots = [
    '09:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-13:00',
    '14:00-15:00', '15:00-16:00', '16:00-17:00', '17:00-18:00'
  ];

  const handleJoinInterview = (interviewId) => {
    const interview = interviews.find(i => i.id === interviewId);
    if (interview?.zoomLink) {
      window.open(interview.zoomLink, '_blank');
    }
  };

  const handleMarkComplete = async (interviewId) => {
    console.log('Mark interview complete:', interviewId);
  };

  const handleCancelInterview = async (interviewId) => {
    console.log('Cancel interview:', interviewId);
  };

  const handleToggleTimeSlot = (day, timeSlot) => {
    setAvailability(prev => ({
      ...prev,
      [day]: prev[day].includes(timeSlot)
        ? prev[day].filter(slot => slot !== timeSlot)
        : [...prev[day], timeSlot]
    }));
  };

  const handleSaveAvailability = async () => {
    console.log('Save availability:', availability);
    setIsEditingAvailability(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Tutoring Management</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage your availability
            </p>
          </div>
          {/* Filters */}
          <div className="flex items-center space-x-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            >
              <option value="all">All Tutorings</option>
              <option value="scheduled">Upcoming</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <input
              type="text"
              placeholder="Search interviews..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Interviews */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Upcoming Sessions</h2>
            {upcomingInterviews.length > 0 ? (
              <div className="space-y-4">
                {upcomingInterviews.map((interview) => (
                  <InterviewCard
                    key={interview.id}
                    interview={interview}
                    onJoin={() => handleJoinInterview(interview.id)}
                    onCancel={() => handleCancelInterview(interview.id)}
                    showActions={true}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <p className="text-gray-500">No upcoming Sessions</p>
              </div>
            )}
          </div>

          {/* Past Interviews */}
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Past Sessions</h2>
            {completedInterviews.length > 0 ? (
              <div className="space-y-4">
                {completedInterviews.map((interview) => (
                  <div
                    key={interview.id}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {interview.subject} Sessions
                        </h3>
                        <p className="text-sm text-gray-500">
                          {formatters.formatDateTime(interview.datetime)}
                        </p>
                      </div>
                      <Badge variant="success">Completed</Badge>
                    </div>
                    {interview.feedback && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-700">Feedback</h4>
                        <div className="mt-2 grid grid-cols-2 gap-4">
                          <div>
                            <span className="text-sm text-gray-500">Technical Score:</span>
                            <span className="ml-2 text-sm font-medium text-gray-900">
                              {interview.feedback.technicalScore}/10
                            </span>
                          </div>
                          <div>
                            <span className="text-sm text-gray-500">Communication Score:</span>
                            <span className="ml-2 text-sm font-medium text-gray-900">
                              {interview.feedback.communicationScore}/10
                            </span>
                          </div>
                        </div>
                        <p className="mt-2 text-sm text-gray-600">
                          {interview.feedback.notes}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <p className="text-gray-500">No completed Sessions</p>
              </div>
            )}
          </div>
        </div>

        {/* Availability Management */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">Availability</h2>
                <button
                  onClick={() => setIsEditingAvailability(!isEditingAvailability)}
                  className="text-sm font-medium text-red-600 hover:text-red-500"
                >
                  {isEditingAvailability ? 'Cancel' : 'Edit'}
                </button>
              </div>
            </div>
            <div className="p-4">
              {isEditingAvailability ? (
                <div className="space-y-6">
                  {Object.keys(availability).map((day) => (
                    <div key={day}>
                      <h3 className="text-sm font-medium text-gray-900 mb-2">{day}</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {timeSlots.map((slot) => (
                          <button
                            key={slot}
                            onClick={() => handleToggleTimeSlot(day, slot)}
                            className={`px-3 py-2 text-sm rounded-md border ${
                              availability[day].includes(slot)
                                ? 'bg-red-50 border-red-500 text-red-700'
                                : 'border-gray-300 hover:border-gray-400'
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={handleSaveAvailability}
                    className="w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Save Availability
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {Object.entries(availability).map(([day, slots]) => (
                    <div key={day} className="py-2 border-b border-gray-200 last:border-0">
                      <h3 className="text-sm font-medium text-gray-900 mb-1">{day}</h3>
                      {slots.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {slots.map((slot) => (
                            <span
                              key={slot}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                            >
                              {slot}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500">Not available</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewManagement;