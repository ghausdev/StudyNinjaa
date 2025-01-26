// InterviewManagement.js
import React, { useState, useEffect } from 'react';
import InterviewCard from '../../components/interviews/InterviewCard';
import Badge from '../../components/common/Badge';
import { formatters } from '../../utils/formatters';
import TutorService from '../../services/tutorService';

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
  const [sessions, setSessions] = useState({
    pending: [],
    inProgress: [],
    completed: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      setLoading(true);
      try {
        // Fetch all three types of sessions
        const [pendingRes, inProgressRes, completedRes] = await Promise.all([
          TutorService.getPendingTutoringSessions(),
          TutorService.getInProgressTutoringSessions(),
          TutorService.getCompletedTutoringSessions()
        ]);

        setSessions({
          pending: pendingRes.sessions || [],
          inProgress: inProgressRes.sessions || [],
          completed: completedRes.sessions || []
        });
      } catch (error) {
        console.error('Error fetching sessions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  const isSessionInProgress = (session) => {
    const now = new Date();
    const startTime = new Date(session.startTime);
    const endTime = new Date(session.endTime);
    return now >= startTime && now <= endTime;
  };

  const handleJoinInterview = (interviewId) => {
    const interview = sessions.inProgress.find(i => i._id === interviewId);
    if (interview?.meetingLink) {
      window.open(interview.meetingLink, '_blank');
    }
  };

  const handleMarkComplete = async (interviewId) => {
    console.log('Mark interview complete:', interviewId);
  };

  const handleCancelInterview = async (interviewId) => {
    console.log('Cancel interview:', interviewId);
  };

  const getFilteredSessions = () => {
    let filteredSessions = {
      pending: [...sessions.pending],
      inProgress: [...sessions.inProgress],
      completed: [...sessions.completed]
    };

    // Apply search filter if query exists
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filteredSessions = {
        pending: filteredSessions.pending.filter(session => 
          session.purpose.toLowerCase().includes(query)
        ),
        inProgress: filteredSessions.inProgress.filter(session => 
          session.purpose.toLowerCase().includes(query)
        ),
        completed: filteredSessions.completed.filter(session => 
          session.purpose.toLowerCase().includes(query)
        )
      };
    }

    // Apply status filter
    switch (statusFilter) {
      case 'ongoing':
        return {
          pending: [],
          inProgress: filteredSessions.inProgress,
          completed: []
        };
      case 'upcoming':
        return {
          pending: filteredSessions.pending,
          inProgress: [],
          completed: []
        };
      case 'completed':
        return {
          pending: [],
          inProgress: [],
          completed: filteredSessions.completed
        };
      case 'all':
      default:
        return {
          pending: filteredSessions.pending,
          inProgress: filteredSessions.inProgress,
          completed: filteredSessions.completed
        };
    }
  };

  const filteredSessions = getFilteredSessions();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Tutoring Management</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage your tutoring sessions
            </p>
          </div>
          {/* Filters */}
          <div className="flex items-center space-x-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            >
              <option value="all">All Sessions</option>
              <option value="ongoing">Ongoing Sessions</option>
              <option value="upcoming">Upcoming Sessions</option>
              <option value="completed">Completed Sessions</option>
            </select>
            <input
              type="text"
              placeholder="Search by purpose..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ongoing Sessions - Always show if there are any */}
        {filteredSessions.inProgress.length > 0 && (
          <div className="lg:col-span-2">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Ongoing Sessions</h2>
            <div className="space-y-4">
              {filteredSessions.inProgress.map((session) => (
                <div key={session._id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{session.purpose}</h3>
                      <p className="text-sm text-gray-500">
                        {formatters.formatDateTime(new Date(session.startTime))} - {formatters.formatTime(new Date(session.endTime))}
                      </p>
                    </div>
                    {session.meetingLink && (
                      <button
                        onClick={() => window.open(session.meetingLink, '_blank')}
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                      >
                        Join Meeting
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upcoming Sessions */}
        {filteredSessions.pending.length > 0 && (
          <div className="lg:col-span-2">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Upcoming Sessions</h2>
            <div className="space-y-4">
              {filteredSessions.pending.map((session) => (
                <div key={session._id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{session.purpose}</h3>
                      <p className="text-sm text-gray-500">
                        {formatters.formatDateTime(new Date(session.startTime))} - {formatters.formatTime(new Date(session.endTime))}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Past Sessions */}
        {filteredSessions.completed.length > 0 && (
          <div className="lg:col-span-2">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Past Sessions</h2>
            <div className="space-y-4">
              {filteredSessions.completed.map((session) => (
                <div key={session._id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{session.purpose}</h3>
                      <p className="text-sm text-gray-500">
                        {formatters.formatDateTime(new Date(session.startTime))} - {formatters.formatTime(new Date(session.endTime))}
                      </p>
                    </div>
                    <Badge variant="success">Completed</Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Results Message */}
        {!filteredSessions.inProgress.length && 
         !filteredSessions.pending.length && 
         !filteredSessions.completed.length && (
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
              <p className="text-gray-500">
                {searchQuery 
                  ? "No sessions found matching your search" 
                  : "No sessions found for the selected filter"}
              </p>
            </div>
          </div>
        )}
      </div>

      {loading && (
        <div className="lg:col-span-2 text-center">
          <p>Loading sessions...</p>
        </div>
      )}
    </div>
  );
};

export default InterviewManagement;