// InterviewScheduler.js
import React, { useState } from 'react';
import Calendar from '../../components/interviews/Calendar';
import TimeSlotPicker from '../../components/interviews/TimeSlotPicker';
import InterviewCard from '../../components/interviews/InterviewCard';
import { formatters } from '../../utils/formatters';

// Import mock data
import { mockInterviews } from '../../data/mockInterviews';

const InterviewScheduler = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedType, setSelectedType] = useState('');
  const [loading, setLoading] = useState(false);

  // Mock available dates (in real app, fetch from API)
  const availableDates = [
    new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // Day after tomorrow
    new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    new Date(Date.now() + 4 * 24 * 60 * 60 * 1000)
  ];

  // Mock time slots
  const generateTimeSlots = (date) => {
    if (!date) return [];
    return [
      { id: 1, startTime: `${date.toISOString().split('T')[0]}T09:00:00Z`, duration: 45 },
      { id: 2, startTime: `${date.toISOString().split('T')[0]}T10:00:00Z`, duration: 45 },
      { id: 3, startTime: `${date.toISOString().split('T')[0]}T14:00:00Z`, duration: 45 },
      { id: 4, startTime: `${date.toISOString().split('T')[0]}T15:00:00Z`, duration: 45 }
    ];
  };

  // Interview types
  const interviewTypes = [
    { id: 'mmi', name: 'Multiple Mini Interview (MMI)', duration: 45 },
    { id: 'panel', name: 'Panel Interview', duration: 45 },
    { id: 'one-on-one', name: 'One-on-One Interview', duration: 45 }
  ];

  // Get upcoming interviews
  const upcomingInterviews = mockInterviews.filter(
    interview => new Date(interview.datetime) > new Date() && interview.status === 'scheduled'
  );

  // Handle booking submission
  const handleBookInterview = async () => {
    if (!selectedDate || !selectedSlot || !selectedType) return;

    setLoading(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      // Success handling (redirect to interviews list)
      console.log('Interview booked successfully');
    } catch (error) {
      console.error('Failed to book interview');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900">Schedule Interview</h1>
        <p className="mt-1 text-sm text-gray-500">
          Book a mock interview session with our experienced tutors
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Calendar and Time Slots */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Select Date and Time</h2>
            
            {/* Calendar */}
            <Calendar
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
              availableDates={availableDates}
              disabledDates={[]}
            />

            {/* Time Slot Picker */}
            <div className="mt-6">
              <TimeSlotPicker
                selectedDate={selectedDate}
                availableSlots={generateTimeSlots(selectedDate)}
                selectedSlot={selectedSlot}
                onSlotSelect={setSelectedSlot}
              />
            </div>
          </div>
        </div>

        {/* Right Column - Interview Type and Booking */}
        <div className="space-y-6">
          {/* Interview Type Selection */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Interview Type</h2>
            <div className="space-y-4">
              {interviewTypes.map((type) => (
                <div
                  key={type.id}
                  className={`relative rounded-lg border p-4 cursor-pointer transition-colors
                    ${selectedType === type.id
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200 hover:border-gray-300'
                    }
                  `}
                  onClick={() => setSelectedType(type.id)}
                >
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{type.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">{type.duration} minutes</p>
                    </div>
                    <div className="flex items-center">
                      <div
                        className={`h-4 w-4 rounded-full border flex items-center justify-center
                          ${selectedType === type.id
                            ? 'border-red-500 bg-red-500'
                            : 'border-gray-300'
                          }
                        `}
                      >
                        {selectedType === type.id && (
                          <div className="h-2 w-2 rounded-full bg-white" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Booking Summary */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Summary</h2>
            {selectedDate && selectedSlot && selectedType ? (
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Date:</span>
                  <span className="text-gray-900 font-medium">
                    {formatters.formatDate(selectedDate)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Time:</span>
                  <span className="text-gray-900 font-medium">
                    {formatters.formatTime(new Date(selectedSlot.startTime))}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Type:</span>
                  <span className="text-gray-900 font-medium">
                    {interviewTypes.find(t => t.id === selectedType)?.name}
                  </span>
                </div>
                <button
                  onClick={handleBookInterview}
                  disabled={loading}
                  className="mt-6 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Booking Interview...
                    </div>
                  ) : (
                    'Book Interview'
                  )}
                </button>
              </div>
            ) : (
              <p className="text-sm text-gray-500">
                Please select a date, time, and interview type to continue
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Upcoming Interviews */}
      {upcomingInterviews.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-medium text-gray-900">Upcoming Interviews</h2>
          {upcomingInterviews.map((interview) => (
            <InterviewCard
              key={interview.id}
              interview={interview}
              onJoin={(id) => console.log('Join interview:', id)}
              onCancel={(id) => console.log('Cancel interview:', id)}
              onReschedule={(id) => console.log('Reschedule interview:', id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default InterviewScheduler;