// TimeSlotPicker.js
import React from 'react';
import { formatters } from '../../utils/formatters';

const TimeSlotPicker = ({
  selectedDate,
  availableSlots = [],
  selectedSlot,
  onSlotSelect,
  className = ''
}) => {
  // Group slots by time of day
  const groupedSlots = availableSlots.reduce((acc, slot) => {
    const hour = new Date(slot.startTime).getHours();
    const period = hour < 12 ? 'Morning' : hour < 17 ? 'Afternoon' : 'Evening';
    
    if (!acc[period]) {
      acc[period] = [];
    }
    acc[period].push(slot);
    return acc;
  }, {});

  const isSlotSelected = (slot) => {
    if (!selectedSlot || !slot) return false;
    return slot.startTime === selectedSlot.startTime;
  };

  if (!selectedDate) {
    return (
      <div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>
        <div className="p-6 text-center">
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
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No date selected
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Please select a date to view available time slots
          </p>
        </div>
      </div>
    );
  }

  if (availableSlots.length === 0) {
    return (
      <div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>
        <div className="p-6 text-center">
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
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No available slots
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Please select a different date
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">
          Available Times for {formatters.formatDate(selectedDate)}
        </h3>
      </div>

      <div className="p-4 space-y-6">
        {Object.entries(groupedSlots).map(([period, slots]) => (
          <div key={period}>
            <h4 className="text-sm font-medium text-gray-700 mb-3">{period}</h4>
            <div className="grid grid-cols-3 gap-3">
              {slots.map((slot) => (
                <button
                  key={slot.startTime}
                  onClick={() => onSlotSelect(slot)}
                  className={`
                    px-4 py-2 text-sm font-medium rounded-lg
                    ${isSlotSelected(slot)
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}
                    transition-colors duration-150
                  `}
                >
                  {formatters.formatTime(new Date(slot.startTime))}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="p-4 bg-gray-50 border-t border-gray-200 rounded-b-lg">
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <span className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-red-600 mr-2"></span>
            Selected
          </span>
          <span className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-gray-100 mr-2"></span>
            Available
          </span>
        </div>
      </div>
    </div>
  );
};

export default TimeSlotPicker;