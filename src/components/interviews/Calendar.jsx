// Calendar.js
import React, { useState } from 'react';

const Calendar = ({
  selectedDate,
  onDateSelect,
  availableDates = [],
  disabledDates = [],
  className = ''
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Calendar helper functions
  const getMonthDays = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const days = [];
    const startPadding = firstDay.getDay();
    
    // Add padding for start of month
    for (let i = 0; i < startPadding; i++) {
      days.push(null);
    }
    
    // Add actual days
    for (let day = 1; day <= lastDay.getDate(); day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const isDateAvailable = (date) => {
    if (!date) return false;
    return availableDates.some(d => 
      d.getDate() === date.getDate() &&
      d.getMonth() === date.getMonth() &&
      d.getFullYear() === date.getFullYear()
    );
  };

  const isDateDisabled = (date) => {
    if (!date) return true;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Check if date is in past
    if (date < today) return true;
    
    // Check if date is in disabled list
    return disabledDates.some(d =>
      d.getDate() === date.getDate() &&
      d.getMonth() === date.getMonth() &&
      d.getFullYear() === date.getFullYear()
    );
  };

  const isDateSelected = (date) => {
    if (!date || !selectedDate) return false;
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  const getDayClasses = (date) => {
    if (!date) return 'bg-white';
    
    let classes = 'hover:bg-gray-100 cursor-pointer';
    
    if (isDateSelected(date)) {
      classes = 'bg-red-600 text-white hover:bg-red-700';
    } else if (isDateDisabled(date)) {
      classes = 'bg-gray-100 text-gray-400 cursor-not-allowed';
    } else if (isDateAvailable(date)) {
      classes = 'bg-white text-gray-900 hover:bg-gray-100';
    }
    
    return classes;
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const days = getMonthDays(currentMonth);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>
      {/* Calendar Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <button
            onClick={prevMonth}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <h2 className="text-lg font-semibold text-gray-900">
            {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </h2>
          
          <button
            onClick={nextMonth}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="p-4">
        {/* Weekday Headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map(day => (
            <div
              key={day}
              className="text-center text-sm font-medium text-gray-500 p-2"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((date, index) => (
            <div
              key={index}
              onClick={() => date && !isDateDisabled(date) && onDateSelect(date)}
              className={`
                aspect-square p-2 text-center rounded-lg 
                ${getDayClasses(date)}
              `}
            >
              {date && (
                <>
                  <span className="text-sm">{date.getDate()}</span>
                  {isDateAvailable(date) && !isDateSelected(date) && (
                    <div className="mt-1 h-1 w-1 rounded-full bg-red-500 mx-auto" />
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;