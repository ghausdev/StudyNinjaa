// InterviewScheduler.js
import React, { useState, useEffect } from 'react';
import Calendar from '../../components/interviews/Calendar';
import StudentService from '../../services/studentService';
import { formatters } from '../../utils/formatters';

const InterviewScheduler = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [allSessions, setAllSessions] = useState([]);
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [completedSessions, setCompletedSessions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDaySessions, setSelectedDaySessions] = useState([]);
  const [activeTab, setActiveTab] = useState('upcoming');

  // Fetch all sessions data
  useEffect(() => {
    const fetchSessions = async () => {
      setLoading(true);
      try {
        const [allData, upcomingData, completedData] = await Promise.all([
          StudentService.getTutoringSessions(),
          StudentService.getUpcomingTutoringSessions(),
          StudentService.getCompletedTutoringSessions()
        ]);

        setAllSessions(allData.tutoringSessions);
        setUpcomingSessions(upcomingData.tutoringSessions);
        setCompletedSessions(completedData.tutoringSessions);
      } catch (error) {
        console.error('Error fetching sessions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  // Update selected day sessions when date is selected
  useEffect(() => {
    if (selectedDate) {
      const sessionsOnDay = allSessions.filter(session => {
        const sessionDate = new Date(session.startTime).toDateString();
        const selectedDateString = selectedDate.toDateString();
        return sessionDate === selectedDateString;
      });
      setSelectedDaySessions(sessionsOnDay);
    }
  }, [selectedDate, allSessions]);

  // Get available dates from all sessions
  const availableDates = [...new Set(allSessions.map(session => 
    new Date(session.startTime).toDateString()
  ))].map(dateStr => new Date(dateStr));

  const handleGiveRating = (sessionId) => {
    // Implement rating functionality
    console.log('Give rating for session:', sessionId);
  };

  const handleJoinMeeting = (meetingLink) => {
    window.open(meetingLink, '_blank');
  };

  const SessionCard = ({ session }) => {
    const isCompleted = new Date(session.endTime) < new Date();
    const needsRating = isCompleted && !session.rated;

    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-gray-900">{session.purpose}</h3>
            <p className="text-sm text-gray-500">
              {formatters.formatDate(new Date(session.startTime))} {' '}
              {formatters.formatTime(new Date(session.startTime))} - {' '}
              {formatters.formatTime(new Date(session.endTime))}
            </p>
          </div>
          <div className="space-x-2">
            {!isCompleted && session.meetingLink && (
              <button
                onClick={() => handleJoinMeeting(session.meetingLink)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Join Meeting
              </button>
            )}
            {needsRating && (
              <button
                onClick={() => handleGiveRating(session._id)}
                className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
              >
                Give Rating
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Tutoring Sessions</h1>
        <p className="mt-1 text-sm text-gray-500">
          View and manage your tutoring sessions
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Left Column - Calendar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Select Date</h2>
          <Calendar
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
            availableDates={availableDates}
            disabledDates={[]}
          />
        </div>

        {/* Right Column - Sessions for Selected Date */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            {selectedDate 
              ? `Sessions for ${formatters.formatDate(selectedDate)}`
              : 'Select a date to view sessions'}
          </h2>
          {selectedDaySessions.length > 0 ? (
            selectedDaySessions.map(session => (
              <SessionCard key={session._id} session={session} />
            ))
          ) : (
            <p className="text-gray-500">No sessions scheduled for this date</p>
          )}
        </div>
      </div>

      {/* Sessions Toggle Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Toggle Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('all')}
              className={`w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                activeTab === 'all'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              All Sessions
            </button>
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                activeTab === 'upcoming'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Upcoming Sessions
            </button>
          </nav>
        </div>

        {/* Sessions Content */}
        <div className="p-4 sm:p-6">
          {activeTab === 'all' ? (
            <div className="space-y-4">
              {allSessions.length > 0 ? (
                allSessions.map(session => (
                  <SessionCard key={session._id} session={session} />
                ))
              ) : (
                <p className="text-gray-500">No sessions found</p>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {upcomingSessions.length > 0 ? (
                upcomingSessions.map(session => (
                  <SessionCard key={session._id} session={session} />
                ))
              ) : (
                <p className="text-gray-500">No upcoming sessions</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InterviewScheduler;